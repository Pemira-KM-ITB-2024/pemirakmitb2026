// @ts-nocheck
/**
 * Stress test for /api/vote endpoint
 *
 * Prerequisites:
 * 1. Install k6: https://grafana.com/docs/k6/latest/set-up/install-k6/
 * 2. In .env: STRESS_TEST=true and STRESS_TEST_SECRET=your_secret
 *    (vote.ts validates: STRESS_TEST=true && STRESS_TEST_SECRET env var match)
 *
 * Usage:
 *   k6 run stress-test/vote-stress-test.js
 *
 * With overrides:
 *   k6 run -e BASE_URL=https://staging.pemirakmitb.com -e VUS=100 -e DURATION=30s -e STRESS_TEST_SECRET=mysecret stress-test/vote-stress-test.js
 */

import http from "k6/http";
import { check } from "k6";
import { Rate, Trend } from "k6/metrics";

// ─── Configuration ────────────────────────────────────────────────────────────

const BASE_URL = __ENV.BASE_URL || "https://pemirakmitb2026.vercel.app/";
const STRESS_TEST_SECRET = __ENV.STRESS_TEST_SECRET || "";

// 50 test emails — round-robin per VU.
// Override with TEST_EMAILS env var (comma-separated) if needed.
const TEST_EMAILS = __ENV.TEST_EMAILS
  ? __ENV.TEST_EMAILS.split(",")
  : [
      "stress1@test.com","stress2@test.com","stress3@test.com","stress4@test.com","stress5@test.com",
      "stress6@test.com","stress7@test.com","stress8@test.com","stress9@test.com","stress10@test.com",
      "stress11@test.com","stress12@test.com","stress13@test.com","stress14@test.com","stress15@test.com",
      "stress16@test.com","stress17@test.com","stress18@test.com","stress19@test.com","stress20@test.com",
      "stress21@test.com","stress22@test.com","stress23@test.com","stress24@test.com","stress25@test.com",
      "stress26@test.com","stress27@test.com","stress28@test.com","stress29@test.com","stress30@test.com",
      "stress31@test.com","stress32@test.com","stress33@test.com","stress34@test.com","stress35@test.com",
      "stress36@test.com","stress37@test.com","stress38@test.com","stress39@test.com","stress40@test.com",
      "stress41@test.com","stress42@test.com","stress43@test.com","stress44@test.com","stress45@test.com",
      "stress46@test.com","stress47@test.com","stress48@test.com","stress49@test.com","stress50@test.com",
    ];

// ─── Custom Metrics ───────────────────────────────────────────────────────────

const voteSuccess = new Rate("vote_success");
const voteFailed = new Rate("vote_failed");
const voteDuration = new Trend("vote_duration");

// ─── Test Options ────────────────────────────────────────────────────────────
// Each VU fires exactly ONE vote simultaneously, then the test ends.
export const options = {
  scenarios: {
    smoke: {
      executor: "per-vu-iterations",
      vus: TEST_EMAILS.length,
      iterations: 1,
      maxDuration: "30s",
    },
  },
  thresholds: {
    http_req_duration: ["p(95)<1000"],
  },
};

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function () {
  // Round-robin email per VU (k6 __VU is 1-indexed)
  const email = TEST_EMAILS[(__VU - 1) % TEST_EMAILS.length];

  const payload = JSON.stringify({
    email,
    rankingsK3M: [1, 2, 3],
    rankingsMWAWM: [1, 2],
  });

  const params = {
    headers: {
      "Content-Type": "application/json",
      "x-stressed-test": STRESS_TEST_SECRET,
    },
  };

  const url = `${BASE_URL}/api/vote`;
  const res = http.post(url, payload, params);

  voteDuration.add(res.timings.duration);

  const isSuccess = res.status === 200;
  const isAlreadyVoted = res.status === 400 && res.json()?.error === "User has already voted";
  const isVotingNotStarted = res.status === 403 && res.json()?.error?.includes("not started");
  const isVotingEnded = res.status === 403 && res.json()?.error?.includes("ended");
  const isUnauthorized = res.status === 401;

  check(res, {
    "received response": (r) => r.status !== 0,
    "not a 5xx error": (r) => r.status < 500,
  });

  if (isSuccess) {
    voteSuccess.add(1);
  } else if (isAlreadyVoted || isVotingNotStarted || isVotingEnded || isUnauthorized) {
    // These are expected conditions during stress test
    voteFailed.add(1);
  } else {
    voteFailed.add(1);
  }
}

// ─── Summary ─────────────────────────────────────────────────────────────────

export function handleSummary(data) {
  const { metrics } = data;
  const successRate = ((metrics.vote_success?.values?.rate || 0) * 100).toFixed(1);
  const failRate = ((metrics.vote_failed?.values?.rate || 0) * 100).toFixed(1);
  const p95 = (metrics.http_req_duration?.values?.["p(95)"] || 0).toFixed(1);
  const avg = (metrics.http_req_duration?.values?.avg || 0).toFixed(1);
  const total = metrics.http_reqs?.values?.count || 0;
  const vusMax = data.metrics.http_reqs?.values?.vus_max || TEST_EMAILS.length;

  console.log(`
╔══════════════════════════════════════╗
║       STRESS TEST SUMMARY             ║
╠══════════════════════════════════════╣
║  VUs:       ${String(vusMax).padEnd(22)}║
║  Duration:  ${String((data.state.lastRunDuration / 1000).toFixed(1) + "s").padEnd(22)}║
║  Total:     ${String(total).padEnd(22)}║
╠══════════════════════════════════════╣
║  Success:   ${successRate}%          ║
║  Failed:    ${failRate}%             ║
║  p95:       ${p95} ms                ║
║  Avg:       ${avg} ms                ║
╚══════════════════════════════════════╝
`);
}
