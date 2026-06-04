# How to Get an OpenRouter API Key

OpenRouter is a unified interface for various AI models. To use the "Ask the AI" feature, you'll need an API key from OpenRouter.

## Steps to Get Your API Key

1. Visit [OpenRouter.ai](https://openrouter.ai/)
2. Click on "Sign Up" or "Login" if you already have an account
3. Once logged in, go to your account dashboard
4. Look for the "API Keys" section
5. Generate a new API key
6. Copy the API key and use it in your project:
   - For Vercel deployment: Add it as an environment variable
   - For local development: Add it to your `.env` file

## Free Tier

OpenRouter offers a free tier that includes access to several models, including:
- Mistral 7B (used in this project)
- Llama 2 13B
- And others

The free tier has rate limits, but it's sufficient for testing and moderate usage.

## Security Note

Keep your API key private and never commit it to version control. The project is configured to:
- Exclude `.env` files from Git (via `.gitignore`)
- Use environment variables for API keys
- Provide `.env.example` as a template

Always use environment variables or other secure methods to store API keys in production.