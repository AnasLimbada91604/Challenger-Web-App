import "react"
import {useState, useEffect} from "react"
import {useParams, useNavigate} from "react-router-dom"
import {useApi} from "../utils/api.js"

export function News() {
    const {symbol} = useParams()
    const navigate = useNavigate()
    const [news, setNews] = useState([])
    const [sentiment, setSentiment] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)
    const [filter, setFilter] = useState("all")
    const {makeRequest} = useApi()

    useEffect(() => {
        fetchNewsData()
    }, [symbol])

    const fetchNewsData = async () => {
        setIsLoading(true)
        setError(null)

        try {
            // Mock news data - in a real app, this would come from NewsAPI or Finnhub
            const mockNews = [
                {
                    id: 1,
                    title: `${symbol || 'AAPL'} Reports Strong Q4 Earnings, Beats Expectations`,
                    summary: "The company reported earnings per share of $1.52, beating analyst estimates of $1.48. Revenue grew 8% year-over-year to $119.6 billion.",
                    content: "Apple Inc. today announced financial results for its fiscal 2024 first quarter ended December 30, 2023. The Company posted quarterly revenue of $119.6 billion, up 2 percent year over year, and quarterly earnings per diluted share of $1.52, up 13 percent year over year.",
                    source: "Reuters",
                    publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
                    url: "#",
                    sentiment: "positive",
                    sentimentScore: 0.85,
                    impact: "high",
                    whyItMoved: "Strong earnings beat and positive guidance for next quarter"
                },
                {
                    id: 2,
                    title: `${symbol || 'AAPL'} Announces New AI Features for iPhone`,
                    summary: "The tech giant unveiled new artificial intelligence capabilities that will be integrated into the next iPhone model.",
                    content: "Apple has announced a suite of new AI features that will be available on the upcoming iPhone 16. These features include enhanced Siri capabilities, improved photo editing, and new productivity tools.",
                    source: "Bloomberg",
                    publishedAt: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
                    url: "#",
                    sentiment: "positive",
                    sentimentScore: 0.72,
                    impact: "medium",
                    whyItMoved: "Innovation announcement boosts investor confidence"
                },
                {
                    id: 3,
                    title: `Analyst Downgrades ${symbol || 'AAPL'} Stock Rating`,
                    summary: "Goldman Sachs analyst reduces price target citing concerns about iPhone sales growth.",
                    content: "Goldman Sachs analyst has downgraded Apple from 'Buy' to 'Neutral' and reduced the price target from $200 to $185, citing concerns about iPhone sales growth in emerging markets.",
                    source: "CNBC",
                    publishedAt: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
                    url: "#",
                    sentiment: "negative",
                    sentimentScore: -0.45,
                    impact: "medium",
                    whyItMoved: "Analyst downgrade creates selling pressure"
                },
                {
                    id: 4,
                    title: `${symbol || 'AAPL'} Expands Manufacturing in India`,
                    summary: "The company announces plans to increase iPhone production in India, diversifying its supply chain.",
                    content: "Apple has announced plans to significantly expand its manufacturing operations in India, with the goal of producing 25% of all iPhones in the country by 2025.",
                    source: "Wall Street Journal",
                    publishedAt: new Date(Date.now() - 8 * 60 * 60 * 1000), // 8 hours ago
                    url: "#",
                    sentiment: "neutral",
                    sentimentScore: 0.12,
                    impact: "low",
                    whyItMoved: "Supply chain diversification viewed as positive long-term"
                },
                {
                    id: 5,
                    title: `${symbol || 'AAPL'} Faces Regulatory Scrutiny in EU`,
                    summary: "European regulators are investigating the company's App Store practices under new digital markets law.",
                    content: "The European Commission has opened an investigation into Apple's App Store practices, examining whether the company's policies comply with the Digital Markets Act.",
                    source: "Financial Times",
                    publishedAt: new Date(Date.now() - 12 * 60 * 60 * 1000), // 12 hours ago
                    url: "#",
                    sentiment: "negative",
                    sentimentScore: -0.68,
                    impact: "high",
                    whyItMoved: "Regulatory concerns create uncertainty"
                }
            ]

            setNews(mockNews)

            // Mock sentiment analysis
            setSentiment({
                overall: "positive",
                score: 0.31,
                breakdown: {
                    positive: 40,
                    neutral: 20,
                    negative: 40
                },
                summary: "Recent news sentiment is mixed with positive earnings news offset by regulatory concerns and analyst downgrades.",
                keyDrivers: [
                    "Strong Q4 earnings beat expectations",
                    "New AI features announcement",
                    "Analyst downgrade from Goldman Sachs",
                    "EU regulatory investigation"
                ]
            })

        } catch (err) {
            setError("Failed to load news data.")
        } finally {
            setIsLoading(false)
        }
    }

    const formatTimeAgo = (date) => {
        const now = new Date()
        const diffMs = now - date
        const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
        const diffDays = Math.floor(diffHours / 24)

        if (diffDays > 0) return `${diffDays}d ago`
        if (diffHours > 0) return `${diffHours}h ago`
        return "Just now"
    }

    const getSentimentColor = (sentiment) => {
        switch (sentiment) {
            case "positive": return "#22c55e"
            case "negative": return "#ef4444"
            default: return "#6b7280"
        }
    }

    const getSentimentIcon = (sentiment) => {
        switch (sentiment) {
            case "positive": return "📈"
            case "negative": return "📉"
            default: return "➡️"
        }
    }

    const getImpactBadge = (impact) => {
        const colors = {
            high: "#ef4444",
            medium: "#f59e0b",
            low: "#6b7280"
        }
        return colors[impact] || "#6b7280"
    }

    const filteredNews = news.filter(article => {
        if (filter === "all") return true
        return article.sentiment === filter
    })

    if (isLoading) {
        return <div className="news-container">
            <div className="loading">Loading news...</div>
        </div>
    }

    if (error) {
        return <div className="news-container">
            <div className="error-message">
                <p>{error}</p>
            </div>
        </div>
    }

    return (
        <div className="news-container">
            <div className="news-header">
                <h2>News & Sentiment Analysis</h2>
                {symbol && (
                    <div className="stock-context">
                        <span className="stock-symbol">{symbol}</span>
                        <button className="action-button" onClick={() => navigate(`/stock/${symbol}`)}>
                            <span>View Stock</span>
                        </button>
                    </div>
                )}
            </div>

            {/* Sentiment Overview */}
            {sentiment && (
                <div className="sentiment-overview">
                    <div className="sentiment-header">
                        <h3>Sentiment Analysis</h3>
                        <div className="sentiment-score">
                            <span className={`sentiment-badge ${sentiment.overall}`}>
                                {sentiment.overall.toUpperCase()}
                            </span>
                            <span className="score-value">{(sentiment.score * 100).toFixed(0)}%</span>
                        </div>
                    </div>
                    
                    <div className="sentiment-breakdown">
                        <div className="sentiment-bar">
                            <div className="sentiment-segment positive" style={{width: `${sentiment.breakdown.positive}%`}}></div>
                            <div className="sentiment-segment neutral" style={{width: `${sentiment.breakdown.neutral}%`}}></div>
                            <div className="sentiment-segment negative" style={{width: `${sentiment.breakdown.negative}%`}}></div>
                        </div>
                        <div className="sentiment-labels">
                            <span>Positive: {sentiment.breakdown.positive}%</span>
                            <span>Neutral: {sentiment.breakdown.neutral}%</span>
                            <span>Negative: {sentiment.breakdown.negative}%</span>
                        </div>
                    </div>

                    <div className="sentiment-summary">
                        <h4>AI Analysis Summary</h4>
                        <p>{sentiment.summary}</p>
                        
                        <div className="key-drivers">
                            <h5>Key Drivers:</h5>
                            <ul>
                                {sentiment.keyDrivers.map((driver, index) => (
                                    <li key={index}>{driver}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            )}

            {/* News Filters */}
            <div className="news-filters">
                <div className="filter-buttons">
                    <button 
                        className={`filter-btn ${filter === "all" ? "active" : ""}`}
                        onClick={() => setFilter("all")}
                    >
                        All News
                    </button>
                    <button 
                        className={`filter-btn ${filter === "positive" ? "active" : ""}`}
                        onClick={() => setFilter("positive")}
                    >
                        Positive
                    </button>
                    <button 
                        className={`filter-btn ${filter === "negative" ? "active" : ""}`}
                        onClick={() => setFilter("negative")}
                    >
                        Negative
                    </button>
                    <button 
                        className={`filter-btn ${filter === "neutral" ? "active" : ""}`}
                        onClick={() => setFilter("neutral")}
                    >
                        Neutral
                    </button>
                </div>
            </div>

            {/* News Feed */}
            <div className="news-feed">
                {filteredNews.map((article) => (
                    <div key={article.id} className="news-card">
                        <div className="news-meta">
                            <div className="news-source">{article.source}</div>
                            <div className="news-time">{formatTimeAgo(article.publishedAt)}</div>
                            <div 
                                className="sentiment-indicator"
                                style={{color: getSentimentColor(article.sentiment)}}
                            >
                                {article.sentiment.charAt(0).toUpperCase()}
                            </div>
                        </div>
                        
                        <div className="news-content">
                            <h4 className="news-title">{article.title}</h4>
                            <p className="news-summary">{article.summary}</p>
                            
                            {article.whyItMoved && (
                                <div className="why-it-moved">
                                    <span className="why-label">Why it moved:</span>
                                    <span className="why-text">{article.whyItMoved}</span>
                                </div>
                            )}
                        </div>

                        <div className="news-actions">
                            <div className="impact-badge" style={{backgroundColor: getImpactBadge(article.impact)}}>
                                {article.impact} impact
                            </div>
                            <button className="action-button small">
                                <span>Read More</span>
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {filteredNews.length === 0 && (
                <div className="empty-news">
                    <p>No news articles found for the selected filter.</p>
                </div>
            )}
        </div>
    )
} 