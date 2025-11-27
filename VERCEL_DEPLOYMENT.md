# Vercel Deployment Guide for Ship-it-Polls

## Prerequisites

Before deploying to Vercel, ensure you have:

- [x] Project is committed to GitHub
- [x] Vercel account (create at https://vercel.com)
- [x] GitHub account linked to Vercel

## Step-by-Step Deployment

### 1. Prepare Your Repository for Git

First, make sure your project is in a Git repository:

```bash
cd "c:\Users\hp\Documents\ALX ProDev\New folder\Ship-it-Polls"
git init
git add .
git commit -m "Initial commit: Modular polling application"
```

### 2. Push to GitHub

Create a repository on GitHub and push your code:

```bash
# Add your GitHub repository
git remote add origin https://github.com/mualu-ko/Ship-it-Polls.git
git branch -M main
git push -u origin main
```

### 3. Deploy with Vercel

#### Option A: Using Vercel Dashboard (Recommended for beginners)

1. Go to https://vercel.com/new
2. Import your GitHub repository
3. Select "Next.js" as the framework
4. Configure project settings:
   - **Project Name**: `ship-it-polls`
   - **Root Directory**: `./ship-it-polls` (important!)
   - **Framework**: Next.js (auto-detected)
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
   - **Install Command**: `npm install`

5. Click "Deploy"

#### Option B: Using Vercel CLI

Install and login to Vercel CLI:

```bash
# Install Vercel CLI globally
npm install -g vercel

# Login to your Vercel account
vercel login

# Navigate to project root
cd ship-it-polls

# Deploy
vercel
```

Follow the prompts to:
- Confirm project settings
- Link to existing project or create new one
- Select project scope

### 4. Configure Build Settings (If Needed)

If deployment fails, configure in `vercel.json`:

Create `ship-it-polls/vercel.json`:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "installCommand": "npm install"
}
```

---

## Environment Variables

Your app uses localStorage, so no backend environment variables are needed initially.

If you add API integration later, add env vars in Vercel dashboard:

1. Go to project settings
2. Environment Variables
3. Add your variables (API keys, etc.)

---

## Troubleshooting

### Issue: "Build failed"

**Solution**: Check build logs in Vercel dashboard

```bash
# Test build locally first
npm run build
npm run lint
```

### Issue: "lucide-react not found"

**Solution**: Dependencies already in package.json, should auto-install

### Issue: "Cannot find module '@/types'"

**Solution**: Ensure `tsconfig.json` has path aliases configured:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

### Issue: "localStorage is not defined"

**Solution**: Already handled with `'use client'` directives and window checks

---

## Post-Deployment

### 1. Get Your Live URL

After deployment, Vercel provides:
- **Production URL**: https://ship-it-polls.vercel.app (example)
- Copy this URL for sharing

### 2. Custom Domain (Optional)

In Vercel dashboard:
1. Go to Settings → Domains
2. Add custom domain
3. Follow DNS configuration steps

### 3. Continuous Deployment

Every push to `main` branch triggers automatic deployment:

```bash
# Make changes locally
git add .
git commit -m "Add feature"
git push origin main

# Vercel automatically deploys!
```

### 4. Preview Deployments

Every pull request gets a preview URL automatically

---

## Deployment Checklist

- [ ] Repository pushed to GitHub
- [ ] Vercel account created
- [ ] Project linked to Vercel
- [ ] Root directory set to `./ship-it-polls`
- [ ] Build succeeds locally (`npm run build`)
- [ ] No build errors in Vercel logs
- [ ] Site loads at provided URL
- [ ] localStorage persists data correctly
- [ ] All pages accessible
- [ ] Responsive design works on mobile

---

## Vercel Dashboard Features

### Monitor Deployments
- View deployment history
- Check build logs
- Compare versions

### Analytics
- Page views
- Performance metrics
- Web Vitals

### Settings
- Environment variables
- Build settings
- Domains
- Git integration

---

## Useful Commands

```bash
# Test production build locally
npm run build
npm run start

# Deploy from CLI
vercel

# Deploy to production (if already linked)
vercel --prod

# Check project info
vercel ls

# Remove deployment
vercel remove
```

---

## Next Steps After Deployment

1. **Share URL** with team
2. **Monitor performance** in Vercel Analytics
3. **Setup custom domain** if needed
4. **Add features** and push to GitHub (auto-deploys)

---

## Common Best Practices

✅ Always test locally before pushing  
✅ Use meaningful commit messages  
✅ Keep environment variables secure  
✅ Monitor build times  
✅ Test on mobile before deployment  
✅ Setup error monitoring with Sentry (optional)  

---

## Support

- **Vercel Docs**: https://vercel.com/docs
- **Next.js Docs**: https://nextjs.org/docs
- **GitHub Issues**: https://github.com/mualu-ko/Ship-it-Polls/issues

---

**Deployment Status**: Ready to deploy! 🚀

Your project is fully configured for Vercel. Choose Option A (Dashboard) for easiest deployment.
