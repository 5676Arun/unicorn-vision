import { NextRequest, NextResponse } from 'next/server';

// For Vercel deployment, we'll use the fallback data generator only
// since we can't run a Python server in a serverless environment
async function fetchSentimentAnalysis(query: string) {
  // In production, you would replace this with a call to a third-party API
  // such as Google Cloud Natural Language API, AWS Comprehend, or Azure Text Analytics
  // Example:
  // const response = await fetch(`https://your-deployed-sentiment-api.com/analyze?query=${encodeURIComponent(query)}`);
  // return await response.json();
  
  // For now, we'll use our fallback data generator
  return generateFallbackData(query);
}

// Fallback data generator
function generateFallbackData(query: string) {
  const now = new Date().toISOString();
  const randomScore = Math.random() * 100 - 50; // Random score between -50 and 50
  
  // Create more realistic fallback data with proper URLs
  const articles = [
    {
      id: 'news-1',
      title: `Latest updates on ${query}`,
      summary: `Recent developments in ${query} show promising trends according to industry experts.`,
      source: 'Business Insider',
      url: `https://www.google.com/search?q=${encodeURIComponent(`${query} news business insider`)}`,
      imageUrl: 'https://via.placeholder.com/300x200',
      time: now,
      sentiment: 'positive',
      score: 0.65
    },
    {
      id: 'news-2',
      title: `${query}: Challenges and opportunities ahead`,
      summary: `A comprehensive analysis of the current state of ${query} and what it means for investors.`,
      source: 'Forbes',
      url: `https://www.google.com/search?q=${encodeURIComponent(`${query} analysis forbes`)}`,
      imageUrl: 'https://via.placeholder.com/300x200',
      time: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
      sentiment: 'neutral',
      score: 0.05
    },
    {
      id: 'news-3',
      title: `Concerns rising about ${query} market volatility`,
      summary: `Experts warn about potential risks associated with ${query} in the current economic climate.`,
      source: 'Financial Times',
      url: `https://www.google.com/search?q=${encodeURIComponent(`${query} concerns financial times`)}`,
      imageUrl: 'https://via.placeholder.com/300x200',
      time: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
      sentiment: 'negative',
      score: -0.38
    }
  ];
  
  // Generate more realistic keywords
  const keywords = query.split(' ')
    .filter(word => word.length > 3)
    .map((word, index) => {
      const sentiments = ['positive', 'neutral', 'negative'];
      const weights = [0.82, 0.65, 0.47, 0.73, 0.58];
      return {
        word: word.toLowerCase(),
        sentiment: sentiments[index % sentiments.length] as 'positive' | 'negative' | 'neutral',
        weight: weights[index % weights.length]
      };
    });
  
  // If no keywords were extracted from the query, provide some defaults
  if (keywords.length === 0) {
    keywords.push(
      { word: 'market', sentiment: 'neutral', weight: 0.6 },
      { word: 'investment', sentiment: 'positive', weight: 0.75 },
      { word: 'trend', sentiment: 'positive', weight: 0.68 },
      { word: 'risk', sentiment: 'negative', weight: 0.55 }
    );
  }
  
  return {
    overall: randomScore,
    articles: articles,
    keywords: keywords
  };
}

// API route handler
export async function GET(req: NextRequest) {
  try {
    // Get query parameter
    const searchParams = req.nextUrl.searchParams;
    const query = searchParams.get('query') || '';
    
    // Get sentiment results
    const results = await fetchSentimentAnalysis(query);
    
    return NextResponse.json(results);
  } catch (error) {
    console.error('Error in sentiment API route:', error);
    return NextResponse.json({ error: 'Failed to analyze sentiment' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const query = body.query || '';
    
    // Get sentiment results
    const results = await fetchSentimentAnalysis(query);
    
    return NextResponse.json(results);
  } catch (error) {
    console.error('Error in sentiment API route:', error);
    return NextResponse.json({ error: 'Failed to analyze sentiment' }, { status: 500 });
  }
} 