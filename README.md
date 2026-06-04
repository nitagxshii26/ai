# AI Explained Website

A simple, dark-themed website that explains what artificial intelligence is and how it works, with an interactive "Ask the AI" section.

## Features

- Dark theme design with purple and teal accents
- Responsive layout for all device sizes
- Animated sections and interactive elements
- "Ask the AI" section powered by OpenRouter API

## Setup Instructions

1. Clone or download this repository
2. Open `index.html` in your web browser

## Setting up the "Ask the AI" Section

To enable the "Ask the AI" functionality, you need to add your OpenRouter API key:

1. Sign up for an account at [OpenRouter](https://openrouter.ai/)
2. Get your API key from your account dashboard
3. For local development:
   - Create a `.env` file in the root directory
   - Add your API key: `OPENROUTER_API_KEY=your_actual_api_key_here`
4. For Vercel deployment:
   - Set the environment variable in your Vercel project settings

## Deployment to Vercel

For detailed deployment instructions, see [DEPLOYMENT.md](DEPLOYMENT.md).

1. Push your code to a GitHub repository
2. Sign up for a [Vercel](https://vercel.com/) account
3. Import your repository
4. In the project settings, add an environment variable:
   - Key: `OPENROUTER_API_KEY`
   - Value: Your actual OpenRouter API key
5. Deploy the project

## File Structure

- `index.html` - Main HTML structure
- `styles.css` - Dark theme styling
- `script.js` - Interactive functionality
- `vercel.json` - Vercel configuration
- `api/ask-ai.js` - Serverless function for AI questions
- `api/package.json` - Dependencies for API functions

## Sections

1. What is AI?
2. How AI Works
3. Types of AI
4. AI Applications
5. Ask the AI (interactive)

## Customization

You can customize the website by modifying:
- Colors in `styles.css` (variables at the top)
- Content in `index.html`
- Functionality in `script.js`

## Browser Support

The website works in all modern browsers that support:
- CSS Grid and Flexbox
- ES6 JavaScript features
- Fetch API

## License

This project is open source and available under the MIT License.