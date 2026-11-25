# Preview funnel hooks outside this repository

Apply `supabase/migrations/002_preview_events.sql` before using attribution.

## Environment

- `OPS_ACCESS_KEY` or `NEXT_PUBLIC_OPS_KEY`: shared ops login. Visiting `/preview?key=...` sets an HttpOnly `elevaris_ops` cookie.
- `OPS_SESSION_SECRET`: optional separate signing secret. Falls back to the ops key.
- `STRIPE_WEBHOOK_SECRET`: Stripe endpoint signing secret.
- `ONBOARDING_CALLBACK_SECRET`: shared secret for the onboarding app.

## Stripe

Register a webhook endpoint at `https://elevaris.app/api/stripe/webhook` for `checkout.session.completed`.

Checkout buttons now go through `https://elevaris.app/api/checkout?plan=launch|growth|accelerator&ref=<attribution-id>`, which stores `checkout_started` and forwards `client_reference_id` to the existing Stripe payment link.

Set the Stripe payment-link success URL to:

`https://onboarding.elevaris.app/?ref={CHECKOUT_SESSION_ID}`

The onboarding app should read the Checkout Session, recover `client_reference_id`, and carry that opaque id through onboarding. This repository does not control that Stripe dashboard setting.

## Onboarding completion

When onboarding finishes, the onboarding app should POST:

`https://elevaris.app/api/onboarding/completed`

Headers: `x-onboarding-secret: <ONBOARDING_CALLBACK_SECRET>`

Body: `{ "attributionId": "<opaque id>" }`

That records one `onboarding_completed` event. Payment remains authoritative from the Stripe webhook, not from the browser.

Exclude internal tests by prefixing attribution ids with `test_` or sending `x-elevaris-test: 1` on public event posts.
