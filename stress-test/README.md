# Stress Test

## Prerequisites

Install k6: https://grafana.com/docs/k6/latest/set-up/install-k6/

## Quick Start

```bash
# Run with defaults (50 VUs, 60s, localhost:3000)
k6 run stress-test/vote-stress-test.mjs

# Override options
k6 run -e BASE_URL=https://staging.pemirakmitb.com -e VUS=100 -e DURATION=30s -e STRESS_TEST_SECRET=mysecret stress-test/vote-stress-test.mjs
```

## Configuration

| Environment Variable | Default | Description |
|---------------------|---------|-------------|
| `BASE_URL` | `http://localhost:3000` | Target base URL |
| `VUS` | `50` | Number of concurrent virtual users |
| `DURATION` | `"60s"` | Test duration |
| `SESSION_COOKIE` | _(none)_ | Pre-obtained next-auth session token (for replay mode) |
| `CSRF_TOKEN` | _(none)_ | Pre-obtained CSRF token |

## Test Accounts

Edit `TEST_ACCOUNTS` in `vote-stress-test.js` to add valid test emails that exist in your database with `hasVoted = false`.

## Notes

- The script goes through the full auth + vote flow per request to get fresh CSRF tokens
- If no test accounts are configured (`USE_REPLAY_MODE = true`), it attempts replay with provided `SESSION_COOKIE`
- The script tracks: success rate, auth failures, CSRF failures, response time (avg + p95)
