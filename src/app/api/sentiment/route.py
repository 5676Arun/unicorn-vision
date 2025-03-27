import requests
import nltk
import json
from nltk.sentiment import SentimentIntensityAnalyzer
import logging
from datetime import datetime
import os
from http.server import BaseHTTPRequestHandler, HTTPServer
import urllib.parse

# Set up logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Download required NLTK data
try:
    nltk.download('vader_lexicon', quiet=True)
except Exception as e:
    logger.error(f"Failed to download NLTK data: {e}")
    raise

# Initialize VADER Sentiment Analyzer
sia = SentimentIntensityAnalyzer()

# NewsAPI Configuration
NEWS_API_KEY = "d848fc6091ab42e68bfad51b8bd32393"
NEWS_API_URL = "https://newsapi.org/v2/everything"

KEYWORDS = [
    "startup success", "startup failure", "why startup is popular",
    "startup funding", "startup investment", "unicorn startup",
    "failed startup", "most successful startups", "venture capital"
]

def fetch_startup_news(query=None):
    """Fetches startup-related news articles from NewsAPI"""
    try:
        search_query = query if query else " OR ".join(KEYWORDS)
        params = {
            "q": search_query,  
            "language": "en",
            "sortBy": "publishedAt",
            "pageSize": 10,
            "apiKey": NEWS_API_KEY,
        }

        response = requests.get(NEWS_API_URL, params=params, timeout=10)
        response.raise_for_status()  # Raise an exception for bad status codes
        
        data = response.json()
        if data.get("status") == "error":
            logger.error(f"NewsAPI error: {data.get('message')}")
            return []
            
        return data.get("articles", [])
        
    except requests.exceptions.RequestException as e:
        logger.error(f"Error fetching news: {e}")
        return []
    except json.JSONDecodeError as e:
        logger.error(f"Error parsing JSON response: {e}")
        return []
    except Exception as e:
        logger.error(f"Unexpected error: {e}")
        return []

def analyze_sentiment(text):
    """Classifies sentiment as Good, Neutral, or Bad using VADER"""
    try:
        if not isinstance(text, str) or not text.strip():
            return "Neutral"
            
        score = sia.polarity_scores(text)["compound"]
        
        if score >= 0.2:
            return "positive"
        elif score <= -0.2:
            return "negative"
        else:
            return "neutral"
    except Exception as e:
        logger.error(f"Error analyzing sentiment: {e}")
        return "neutral"

def get_sentiment_results(query=None):
    """Fetch news and return structured JSON output"""
    try:
        news_articles = fetch_startup_news(query)
        
        results = {
            "status": "success",
            "timestamp": datetime.now().isoformat(),
            "total_articles": len(news_articles),
            "articles": []
        }

        total_score = 0
        analyzed_articles = []

        for article in news_articles:
            if not isinstance(article, dict):
                continue
                
            title = article.get("title", "")
            description = article.get("description", "")
            source = article.get("source", {}).get("name", "Unknown")
            url = article.get("url", "")
            published_at = article.get("publishedAt", "")
            image_url = article.get("urlToImage", "")
            
            if not title:
                continue
                
            sentiment_result = analyze_sentiment(title)
            sentiment_score = sia.polarity_scores(title)["compound"]
            
            # Convert to frontend-friendly format
            normalized_score = int(sentiment_score * 100)
            total_score += normalized_score
            
            analyzed_articles.append({
                "id": f"news-{len(analyzed_articles)}",
                "title": title,
                "summary": description,
                "source": source,
                "url": url,
                "imageUrl": image_url,
                "time": published_at,
                "sentiment": sentiment_result,
                "score": sentiment_score
            })

        # Calculate overall sentiment
        avg_score = total_score / len(analyzed_articles) if analyzed_articles else 0
        
        # Extract keywords and their sentiment
        keywords = []
        used_words = set()
        
        for article in analyzed_articles:
            title_words = article["title"].lower().split()
            for word in title_words:
                if len(word) > 5 and word not in used_words and word.isalpha():
                    used_words.add(word)
                    keywords.append({
                        "word": word,
                        "sentiment": analyze_sentiment(word),
                        "weight": abs(sia.polarity_scores(word)["compound"])
                    })
                    if len(keywords) >= 10:
                        break
        
        results = {
            "overall": avg_score,
            "articles": analyzed_articles,
            "keywords": keywords[:10]  # Get the most significant keywords
        }

        return results
        
    except Exception as e:
        logger.error(f"Error generating results: {e}")
        return {
            "status": "error",
            "message": str(e),
            "timestamp": datetime.now().isoformat()
        }

class SentimentHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()

        # Check if query parameter exists
        query = None
        if '?' in self.path:
            query_string = self.path.split('?', 1)[1]
            query_params = urllib.parse.parse_qs(query_string)
            query = query_params.get('q', [None])[0]
        
        results = get_sentiment_results(query)
        self.wfile.write(json.dumps(results).encode())
        
    def do_POST(self):
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()
        
        content_length = int(self.headers['Content-Length'])
        post_data = self.rfile.read(content_length)
        
        try:
            query_data = json.loads(post_data.decode('utf-8'))
            query = query_data.get('query')
            results = get_sentiment_results(query)
            self.wfile.write(json.dumps(results).encode())
        except Exception as e:
            error_response = {
                "status": "error",
                "message": str(e)
            }
            self.wfile.write(json.dumps(error_response).encode())

# Run server if executed directly
if __name__ == "__main__":
    port = int(os.environ.get('PORT', 8000))
    server = HTTPServer(('localhost', port), SentimentHandler)
    print(f"Starting sentiment analysis server on port {port}")
    server.serve_forever() 