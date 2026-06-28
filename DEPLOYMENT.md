# Deployment Guide

This project is a Next.js App Router frontend prepared for GitHub and Vercel deployment.

## 1. Prerequisites

- Node.js 20.11 or newer.
- npm 11 or compatible npm version.
- A GitHub repository containing this project.
- A Vercel account connected to the GitHub organization or user that owns the repository.

## 2. Local Verification

From the repository root, run:

```bash
npm install
npm run typecheck
npm run lint
npm run build
```

If all commands pass, the project is ready for deployment.

## 3. GitHub Preparation

1. Confirm `.gitignore` excludes generated files such as `node_modules`, `.next`, `.vercel`, local environment files, and TypeScript build info.
2. Commit all source files, configuration files, and documentation.
3. Push the branch to GitHub:

```bash
git push origin <branch-name>
```

4. Open a pull request into `main`.
5. Confirm the GitHub Actions CI workflow completes successfully.
6. Merge the pull request after review.

## 4. Vercel Project Setup

1. Sign in to Vercel.
2. Select **Add New** → **Project**.
3. Import the GitHub repository.
4. Keep the framework preset as **Next.js**.
5. Use these build settings:
   - Install Command: `npm install`
   - Build Command: `npm run build`
   - Output Directory: leave empty / default
   - Development Command: `npm run dev`
6. No environment variables are required for Phase 1.
7. Click **Deploy**.

## 5. Production Domain

1. In Vercel, open the deployed project.
2. Go to **Settings** → **Domains**.
3. Add the production domain.
4. Follow Vercel's DNS instructions.
5. After DNS propagation, verify HTTPS is active.

## 6. Post-Deployment Checks

After deployment, verify:

- The homepage loads without client or server errors.
- Navigation links resolve correctly.
- The mobile menu opens and closes.
- The services mega menu works on desktop.
- Theme toggle, cookie banner, and back-to-top controls work.
- `/robots.txt` and `/sitemap.xml` resolve.
- The custom 404 page appears for unknown routes.
- Lighthouse or Vercel Speed Insights results meet launch expectations.

## 7. Recommended Production Enhancements

For Phase 2, add:

- Real production domain in `metadataBase`, `robots.ts`, and `sitemap.ts`.
- CMS-backed page content.
- CRM/email integration for contact and newsletter forms.
- Multilingual routing and localized metadata.
- Shipment tracking/customer portal integrations.
- Vercel Analytics and Speed Insights.
