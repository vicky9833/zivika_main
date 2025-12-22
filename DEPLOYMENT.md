# Deployment Guide for Zivika Labs Health Twin

This guide provides instructions for deploying the Zivika Labs Health Twin application to various platforms.

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- Git

## Building the Application

Before deploying, make sure to build the application:

```bash
npm install
npm run build
```

This will create a `dist` directory with the built application.

## Deploying to Vercel

1. **Install Vercel CLI** (optional)
   ```bash
   npm install -g vercel
   ```

2. **Deploy using Vercel CLI** (optional)
   ```bash
   vercel login
   vercel
   ```

3. **Deploy using Vercel Dashboard**
   - Go to [vercel.com](https://vercel.com)
   - Sign in or create an account
   - Import your GitHub/GitLab/Bitbucket repository
   - Vercel will automatically detect the project as a Vite React application
   - Configure your project settings if needed
   - Deploy

## Deploying to Render

1. **Sign up for Render**
   - Go to [render.com](https://render.com)
   - Create an account or sign in

2. **Create a new Web Service**
   - Click "New" and select "Static Site"
   - Connect your GitHub/GitLab repository
   - Configure the service:
     - Name: `arogya-ai-health-twin` (or your preferred name)
     - Build Command: `npm install && npm run build`
     - Publish Directory: `dist`
   - Click "Create Static Site"

## Deploying to Netlify

1. **Sign up for Netlify**
   - Go to [netlify.com](https://netlify.com)
   - Create an account or sign in

2. **Deploy your site**
   - Click "New site from Git"
   - Connect your GitHub/GitLab/Bitbucket repository
   - Configure the build settings:
     - Build Command: `npm run build`
     - Publish Directory: `dist`
   - Click "Deploy site"

## Environment Variables

If your application uses environment variables, make sure to set them in the respective platform's dashboard:

- **Vercel**: Environment variables can be set in the project settings
- **Render**: Environment variables can be set in the service settings
- **Netlify**: Environment variables can be set in the site settings

## Troubleshooting

### Routing Issues

If you encounter routing issues (404 errors when refreshing or accessing routes directly), make sure the platform is configured to handle client-side routing:

- **Vercel**: The `vercel.json` file in this project already includes the necessary configuration
- **Render**: The `render.yaml` file in this project already includes the necessary configuration
- **Netlify**: The `netlify.toml` and `public/_redirects` files in this project already include the necessary configuration

### Build Failures

If the build fails, check the build logs for errors. Common issues include:

- Missing dependencies
- Node.js version incompatibility
- Environment variable issues

## Continuous Deployment

All three platforms (Vercel, Render, and Netlify) support continuous deployment from your Git repository. Once set up, any push to your main branch will trigger a new deployment.
