module.exports = async (req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const { question } = req.body;

  if (!question) {
    res.status(400).json({ error: 'Question is required' });
    return;
  }

  try {
    // Use OpenRouter API directly from the serverless function
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'nvidia/llama-3.1-nemotron-nano-8b-v1:free',
        messages: [
          {
            role: 'system',
            content: 'You are an AI assistant specialized in explaining artificial intelligence concepts. Provide clear, concise, and accurate answers about AI. Keep responses under 200 words unless specifically asked for more detail.'
          },
          { role: 'user', content: question }
        ],
        temperature: 0.7,
        max_tokens: 500
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('OpenRouter API Error:', response.status, errorText);
      res.status(response.status).json({ error: `AI service error: ${response.status}` });
      return;
    }

    const data = await response.json();
    const answer = data.choices[0].message.content.trim();

    res.status(200).json({ answer });
  } catch (error) {
    console.error('Error in serverless function:', error);
    res.status(500).json({ error: 'Failed to process your request' });
  }
};