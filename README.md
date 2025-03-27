# Unicorn Vision

A comprehensive AI-powered investment research platform.

## Features

- Dashboard with portfolio tracking and market insights
- Sentiment analysis for investment research
- News aggregation with AI-powered analysis
- Investment recommendations and portfolio optimization
- Interactive charts and data visualization

## Getting Started

### Prerequisites

- Node.js 18+
- Python 3.8+ (for sentiment analysis feature)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/unicorn-vision.git
cd unicorn-vision
```

2. Install Node.js dependencies:

```bash
npm install
# or
yarn install
```

3. Install Python dependencies for sentiment analysis:

```bash
pip install requests nltk
```

### Running the application

#### Standard development server:

```bash
npm run dev
# or
yarn dev
```

#### With sentiment analysis server:

To run both the Next.js app and the sentiment analysis server together:

```bash
npm run dev:with-sentiment
# or
yarn dev:with-sentiment
```

### Using the Sentiment Analysis Feature

1. Navigate to the Research page in the dashboard
2. Enter a query in the search bar (e.g., "Tesla earnings", "Startup funding", "AI investments")
3. Click "Analyze Sentiment"
4. View the sentiment analysis results, including:
   - Overall sentiment score
   - News articles with sentiment classification
   - Key topics and their sentiment impact

## Project Structure

- `/src/app` - Next.js pages and API routes
- `/src/components` - React components
- `/src/app/api/sentiment` - Python-based sentiment analysis service

## Sentiment Analysis Architecture

The sentiment analysis feature uses a Python backend that:

1. Fetches news articles from NewsAPI based on the user's query
2. Analyzes the sentiment of each article using NLTK's VADER sentiment analyzer
3. Extracts key topics and their sentiment impact
4. Returns structured data to the frontend for visualization

## License

This project is licensed under the MIT License - see the LICENSE file for details.
