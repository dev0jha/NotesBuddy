# 🔧 Fix Sign-In Issue on Vercel Deployment

## Problem

Sign-in works on localhost but fails on Vercel deployment.

## Root Cause

Environment variables are pointing to `localhost:3001` instead of your production domain.

---

## ✅ Solution Checklist

### Step 1: Update Vercel Environment Variables

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project
3. Click **Settings** → **Environment Variables**
4. Update these variables (or add if missing):

   ```bash
   BETTER_AUTH_URL=https://your-vercel-domain.vercel.app
   NEXT_PUBLIC_WEBSITE_URL=https://your-vercel-domain.vercel.app
   ```

   **Replace `your-vercel-domain.vercel.app` with your actual domain!**

5. Make sure these are set for the **Production** environment
6. Click **Save**

### Step 2: Update Google OAuth Settings

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Navigate to **APIs & Services** → **Credentials**
3. Click on your OAuth 2.0 Client ID (the one used in your project)
4. Under **Authorized JavaScript origins**, add:
   ```
   https://your-vercel-domain.vercel.app
   ```
5. Under **Authorized redirect URIs**, add:
   ```
   https://your-vercel-domain.vercel.app/api/auth/callback/google
   ```
6. Click **Save**

### Step 3: Redeploy Your Application

After updating environment variables, you MUST redeploy:

**Option A: Push a new commit**

```bash
git commit --allow-empty -m "chore: trigger redeploy"
git push origin main
```

**Option B: Manual redeploy in Vercel**

1. Go to Vercel Dashboard → **Deployments**
2. Find the latest deployment
3. Click the three dots (•••) → **Redeploy**
4. Select **Use existing Build Cache** (optional) → Click **Redeploy**

### Step 4: Test Sign-In

1. Clear your browser cache and cookies for the site
2. Visit your production site: `https://your-vercel-domain.vercel.app/sign-in`
3. Try signing in with Google
4. It should now work! ✅

---

## 🔍 How to Find Your Vercel Domain

If you don't know your Vercel domain:

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click on your project
3. Look at the **Domains** section on the project overview
4. Use that domain (e.g., `notesbuddy-abcd123.vercel.app`)

---

## 🐛 Still Having Issues?

### Check Browser Console for Errors

1. Open your site in production
2. Press F12 to open DevTools
3. Go to **Console** tab
4. Try to sign in and look for errors
5. Common errors:
   - `redirect_uri_mismatch` → Google OAuth URIs not configured
   - `CORS error` → Wrong BETTER_AUTH_URL
   - `Failed to fetch` → Backend URL issues

### Check Vercel Logs

1. Go to Vercel Dashboard → **Deployments**
2. Click on your latest deployment
3. Go to **Functions** tab
4. Check logs for any authentication errors

### Verify Environment Variables

1. Go to Vercel Dashboard → **Settings** → **Environment Variables**
2. Make sure `BETTER_AUTH_URL` and `NEXT_PUBLIC_WEBSITE_URL` are NOT showing `localhost`
3. They should show your production domain

---

## 📝 Important Notes

- ⚠️ **NEVER commit production environment variables to git**
- ✅ All environment variables should be set in Vercel dashboard
- 🔄 Always redeploy after changing environment variables
- 🔒 Make sure Google OAuth is configured for your production domain
- 📱 Test on incognito/private browsing mode to avoid cache issues

---

## 📚 Related Documentation

- [Better Auth Documentation](https://www.better-auth.com/)
- [Google OAuth Setup](https://developers.google.com/identity/protocols/oauth2)
- [Vercel Environment Variables](https://vercel.com/docs/projects/environment-variables)
