import http from 'k6/http';
import { sleep, check } from 'k6';

export let options = {
  vus: 50,            // 50 virtual users
  duration: '1m',     // test duration of 1 minute
  thresholds: {
    http_req_duration: ['p(95)<2000'], // 95% of requests should be < 2s
    http_req_failed: ['rate<0.01'],    // < 1% requests should fail
  },
};

export default function () {
  const res = http.get('https://devxhub.com');

  check(res, {
    'status is 200': (r) => r.status === 200,
    'response time < 2s': (r) => r.timings.duration < 2000,
  });

  sleep(1); // pause 1 second between requests
}
