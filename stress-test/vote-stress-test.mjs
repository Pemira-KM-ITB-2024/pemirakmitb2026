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
import { check, sleep } from "k6";
import { Rate, Trend } from "k6/metrics";

// ─── Configuration ────────────────────────────────────────────────────────────

const BASE_URL = __ENV.BASE_URL || "http://localhost:3000";
const VUS = __ENV.VUS ? parseInt(__ENV.VUS) : 50;
const DURATION = __ENV.DURATION || "60s";
const STRESS_TEST_SECRET = __ENV.STRESS_TEST_SECRET || "";
const TEST_EMAIL = __ENV.TEST_EMAIL || "0000001@mahasiswa.itb.ac.id";

// ─── Custom Metrics ───────────────────────────────────────────────────────────

const voteSuccess = new Rate("vote_success");
const voteFailed = new Rate("vote_failed");
const voteDuration = new Trend("vote_duration");

// ─── Test Options ────────────────────────────────────────────────────────────

export const options = {
  vus: VUS,
  duration: DURATION,
  thresholds: {
    http_req_duration: ["p(95)<1000"],
    vote_success: ["rate>0.5"],
  },
};

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function () {
  const payload = JSON.stringify({
    email: TEST_EMAIL,
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

  sleep(Math.random() * 1 + 0.2);
}

// ─── Summary ─────────────────────────────────────────────────────────────────

export function handleSummary(data) {
  const { metrics } = data;
  const successRate = ((metrics.vote_success?.values?.rate || 0) * 100).toFixed(1);
  const failRate = ((metrics.vote_failed?.values?.rate || 0) * 100).toFixed(1);
  const p95 = (metrics.http_req_duration?.values?.["p(95)"] || 0).toFixed(1);
  const avg = (metrics.http_req_duration?.values?.avg || 0).toFixed(1);
  const total = metrics.http_reqs?.values?.count || 0;

  console.log(`
╔══════════════════════════════════════╗
║       STRESS TEST SUMMARY             ║
╠══════════════════════════════════════╣
║  VUs:       ${String(VUS).padEnd(22)}║
║  Duration:  ${String(DURATION).padEnd(22)}║
║  Total:     ${String(total).padEnd(22)}║
╠══════════════════════════════════════╣
║  Success:   ${successRate}%          ║
║  Failed:    ${failRate}%             ║
║  p95:       ${p95} ms                ║
║  Avg:       ${avg} ms                ║
╚══════════════════════════════════════╝
`);
}
