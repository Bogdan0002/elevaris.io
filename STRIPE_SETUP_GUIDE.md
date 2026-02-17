# Stripe Checkout Setup Guide

## Overview
This guide will help you set up Stripe checkout links for your pricing tiers and configure the redirect to your onboarding site.

## Step 1: Create Stripe Products & Prices

1. Log in to your [Stripe Dashboard](https://dashboard.stripe.com/)
2. Go to **Products** → **Add Product**
3. Create three subscription products:

### Launch Tier - $99/month
- **Name**: Elevaris Launch
- **Pricing**: $99 USD recurring monthly
- **Description**: Professional website and CRM for small businesses

### Growth Tier - $149/month  
- **Name**: Elevaris Growth
- **Pricing**: $149 USD recurring monthly
- **Description**: Automated lead capture and follow-up system

### Accelerator Tier - $299/month
- **Name**: Elevaris Accelerator
- **Pricing**: $299 USD recurring monthly
- **Description**: Advanced automation and scaling tools

## Step 2: Create Payment Links

For each product:

1. Click on the product in Stripe
2. Click **Create payment link**
3. Configure:
   - **Collect customer addresses**: Optional
   - **Collect phone numbers**: Yes (recommended)
   - **After payment**: Redirect to URL
   - **Success URL**: `https://onboarding.elevaris.app`
   - **Cancel URL**: Your pricing page URL (e.g., `https://elevaris.app/car-detailing#pricing`)

4. **Save** and copy the payment link

## Step 3: Update Your Configuration

Open `lib/constants/pricing.ts` and replace the placeholder URLs:

```typescript
export const STRIPE_CHECKOUT_URLS = {
  launch: "https://buy.stripe.com/YOUR_ACTUAL_LAUNCH_LINK",
  growth: "https://buy.stripe.com/YOUR_ACTUAL_GROWTH_LINK",
  accelerator: "https://buy.stripe.com/YOUR_ACTUAL_ACCELERATOR_LINK",
}
```

**Example** (replace with your actual links):
```typescript
export const STRIPE_CHECKOUT_URLS = {
  launch: "https://buy.stripe.com/test_123abc456def789",
  growth: "https://buy.stripe.com/test_456def789ghi012",
  accelerator: "https://buy.stripe.com/test_789ghi012jkl345",
}
```

## Step 4: Update Industry Pages

Replace the pricing section on each industry page. See the example in `app/car-detailing/page.tsx` (lines 900-1007).

**Before:**
```tsx
<div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-12 items-stretch">
  {tiers.map((tier, index) => (
    // ... hardcoded pricing cards
  ))}
</div>
```

**After:**
```tsx
import { PricingTiers } from "@/components/site/PricingTiers"
import { getBasePricingTiers } from "@/lib/constants/pricing"

// In your component:
const tiers = getBasePricingTiers({
  industryName: "car detailing business",
  // optional: customize services per industry
})

<PricingTiers tiers={tiers} accentColor="cyan" />
```

## Step 5: Test the Flow

1. Visit an industry page (e.g., `/car-detailing`)
2. Click "Choose Growth" button
3. Complete the Stripe checkout (use test mode)
4. Verify redirect to `https://onboarding.elevaris.app`

## Stripe Test Cards

Use these for testing:
- **Success**: 4242 4242 4242 4242
- **Requires authentication**: 4000 0025 0000 3155
- **Declined**: 4000 0000 0000 9995

Use any future expiry date and any 3-digit CVC.

## Success URL Parameters

Stripe automatically appends useful parameters to your success URL:
- `?session_id={CHECKOUT_SESSION_ID}` - Use this to retrieve customer info

You can use this in your onboarding form to pre-fill customer data.

## Common Issues

**Issue**: Redirect not working
- **Solution**: Ensure success URL is exactly `https://onboarding.elevaris.app` (no trailing slash unless your onboarding site requires it)

**Issue**: Setup fee not removed
- **Solution**: Don't add the $249/$549/$999 setup as a line item. Only create monthly recurring prices.

**Issue**: Customer sees payment then closes tab
- **Solution**: Enable "Send email receipt" in Stripe settings and set up a webhook for `checkout.session.completed` to track successful payments.

## Need Help?

- [Stripe Payment Links Documentation](https://stripe.com/docs/payment-links)
- [Stripe Webhooks Guide](https://stripe.com/docs/webhooks)
