# Deployment Guide

## Deploying to Vercel

This project is configured to work with Vercel's serverless functions. Follow these steps to deploy:

### 1. Prepare Your Repository

1. Make sure all files are committed to your Git repository
2. Ensure your repository is hosted on GitHub, GitLab, or Bitbucket

### 2. Sign Up for Vercel

1. Go to [vercel.com](https://vercel.com/)
2. Sign up for an account or log in if you already have one

### 3. Import Your Project

1. Click "New Project" in your Vercel dashboard
2. Import your Git repository
3. Vercel will automatically detect the project settings

### 4. Configure Environment Variables

1. In your project settings, go to the "Environment Variables" section
2. Add the following environment variable:
   - Key: `OPENROUTER_API_KEY`
   - Value: Your actual OpenRouter API key (get it from https://openrouter.ai/)

### 5. Deploy

1. Click "Deploy" to start the deployment process
2. Vercel will automatically build and deploy your project
3. Once deployment is complete, you'll receive a URL for your live site

## Local Development

To run the project locally:

1. Install dependencies:
   ```
   npm install
   ```

2. Create a `.env` file in the root directory with your OpenRouter API key:
   ```
   OPENROUTER_API_KEY=your_actual_api_key_here
   ```

3. Start the development server:
   ```
   npm start
   ```

4. Open your browser to `http://localhost:3000`

## Project Structure for Vercel

```
/
├── index.html
├── styles.css
├── script.js
├── vercel.json
├── api/
│   ├── ask-ai.js
│   └── package.json
└── package.json
```

The `vercel.json` file configures the routing:
- `/api/ask-ai` routes to the serverless function
- All other routes serve the static files, with `index.html` as fallback

## Environment Variables

For the "Ask the AI" feature to work, you must set the `OPENROUTER_API_KEY` environment variable in your Vercel project settings.