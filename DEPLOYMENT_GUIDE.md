# 🚀 Vercel Deployment & Razorpay Webhook Setup Guide

## 📋 Overview
When deploying to Vercel with a custom domain, you need to update URLs in multiple places for Razorpay webhooks and other services to work correctly.

---

## 🔧 Step 1: Update Environment Variables in Vercel

After deploying to Vercel, go to your project settings and add these environment variables:

### Required Changes:

1. **NEXT_PUBLIC_WEBSITE_URL**
   ```
   Change from: http://localhost:3001
   Change to: https://yourdomain.com
   ```

2. **BETTER_AUTH_URL**
   ```
   Change from: http://localhost:3001
   Change to: https://yourdomain.com
   ```

### All Environment Variables to Add in Vercel:

```bash
# Database
DATABASE_URL=postgresql://username:password@host.region.aws.neon.tech/dbname?sslmode=require

# Better Auth (Authentication)
BETTER_AUTH_SECRET=your-better-auth-secret-here
GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-your-google-client-secret

# Sanity CMS
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2020-11-01
SANITY_EDITOR_TOKEN=your-sanity-editor-token-here
SANITY_REVALIDATE_SECRET=your-revalidation-secret-here

# Razorpay (Payment Gateway)
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_your_key_id
RAZORPAY_SECRET_ID=your-razorpay-secret
RAZORPAY_WEBHOOK_SECRET=your-webhook-secret

# Telegram Bot (for notifications/logs)
TELEGRAM_BOT_TOKEN=your-telegram-bot-token
TELEGRAM_PAYMENT_CHANNEL=-your-channel-id
TELEGRAM_REPORTS_CHANNEL=-your-channel-id
TELEGRAM_ERROR_LOGS_CHANNEL=-your-channel-id

# Website Configuration (CHANGE THESE!)
NEXT_PUBLIC_WEBSITE_URL=https://yourdomain.com
BETTER_AUTH_URL=https://yourdomain.com
```

---

## 🎯 Step 2: Configure Razorpay Webhook

### A. Login to Razorpay Dashboard
1. Go to https://dashboard.razorpay.com
2. Navigate to **Settings** → **Webhooks**
3. Click **"+ Add New Webhook"**

### B. Configure Webhook URL

**Webhook URL:**
```
https://yourdomain.com/api/premium/webhook
```

Replace `yourdomain.com` with your actual domain.

### C. Select Events to Listen

✅ Check these events:
- `payment.captured` - When payment is successful
- `payment.failed` - When payment fails
- `payment.authorized` - When payment is authorized (optional)

### D. Set Webhook Secret

The secret is already in your code: `6388Deva`

**Important:** This should match `RAZORPAY_WEBHOOK_SECRET` in your environment variables.

### E. Active Status

Make sure the webhook is set to **Active** (toggle ON).

---

## 🔐 Step 3: Update Google OAuth Settings

Since you're changing domains, update Google OAuth:

1. Go to https://console.cloud.google.com
2. Navigate to **APIs & Services** → **Credentials**
3. Click on your OAuth 2.0 Client ID
4. Under **Authorized redirect URIs**, add:
   ```
   https://yourdomain.com/api/auth/callback/google
   ```

---

## 📝 Step 4: Update Sanity Webhook (Optional)

If you're using Sanity webhooks for revalidation:

1. Go to https://sanity.io/manage
2. Select your project
3. Go to **API** → **Webhooks**
4. Update or create a webhook with URL:
   ```
   https://yourdomain.com/api/revalidate?secret=my-super-secret-revalidation-key-12345
   ```

---

## ✅ Step 5: Testing Checklist

After deployment, test these:

### 1. Test Razorpay Webhook
```bash
# From Razorpay Dashboard
Settings → Webhooks → Click "Send Test Webhook"
```

### 2. Test Payment Flow
- Go to your premium page
- Initiate a test payment
- Complete payment
- Check if webhook is received
- Verify database is updated

### 3. Check Webhook Logs
In Razorpay Dashboard:
- Go to **Settings** → **Webhooks**
- Click on your webhook
- Check **Webhook Logs** tab
- Look for any failed deliveries

---

## 🐛 Troubleshooting

### Webhook Not Receiving Events

**Check 1: Webhook URL is correct**
```
https://yourdomain.com/api/premium/webhook
```
(No trailing slash!)

**Check 2: Environment variable is set**
```bash
RAZORPAY_WEBHOOK_SECRET=razorpay_webhook_secret
```

**Check 3: SSL Certificate**
Razorpay requires HTTPS. Vercel provides this automatically.

**Check 4: Webhook is Active**
Check the toggle in Razorpay dashboard.

### Signature Verification Failing

**Issue:** Webhook secret mismatch

**Solution:**
1. Copy the secret from Razorpay dashboard
2. Update `RAZORPAY_WEBHOOK_SECRET` in Vercel
3. Redeploy

### Payment Status Not Updating

**Issue:** Webhook not being processed

**Solution:**
1. Check Razorpay webhook logs
2. Check Vercel function logs
3. Verify database connection
4. Check Telegram error logs channel

---

## 📊 Monitoring Webhooks

### In Razorpay Dashboard:
- **Settings** → **Webhooks** → **Your Webhook** → **Logs**
- Shows all webhook deliveries
- Shows success/failure status
- Shows response codes

### In Vercel:
- Go to your project → **Functions**
- Click on `/api/premium/webhook`
- View logs and invocations

### In Telegram:
- Payment notifications go to: `-1003265253623`
- Error logs go to: `-1003222515797`

---

## 🔄 Switching from Test to Production

When you're ready to go live:

### 1. Razorpay Production Keys
```bash
# Update these in Vercel
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_live_XXXXXXXXXX
RAZORPAY_SECRET_ID=YOUR_LIVE_SECRET
RAZORPAY_WEBHOOK_SECRET=YOUR_LIVE_WEBHOOK_SECRET
```

### 2. Create New Webhook
- Production webhooks are separate from test
- Create a new webhook in production mode
- Use the same URL: `https://yourdomain.com/api/premium/webhook`

### 3. Test Thoroughly
- Do test transactions in production
- Monitor webhook logs
- Check database updates
- Verify email/notifications

---

## 📱 Quick Reference

### Your Webhook Endpoint:
```
https://yourdomain.com/api/premium/webhook
```

### Webhook Events to Listen:
- `payment.captured`
- `payment.failed`

### Webhook Secret:
```
6388Deva
```

### Test Webhook:
Razorpay Dashboard → Settings → Webhooks → Send Test Webhook

---

## 🎉 Summary

**What to update when deploying:**

1. ✅ Vercel environment variables (URLs)
2. ✅ Razorpay webhook URL
3. ✅ Google OAuth redirect URIs
4. ✅ Sanity webhook URL (optional)
5. ✅ Test everything!

**Critical URLs to update:**
- `NEXT_PUBLIC_WEBSITE_URL` → `https://yourdomain.com`
- `BETTER_AUTH_URL` → `https://yourdomain.com`
- Razorpay Webhook → `https://yourdomain.com/api/premium/webhook`

---

## 🆘 Need Help?

If webhook issues persist:
1. Check Razorpay webhook logs
2. Check Vercel function logs
3. Check Telegram error channel
4. Verify all environment variables are set
5. Ensure webhook is set to "Active" in Razorpay

Good luck with your deployment! 🚀
