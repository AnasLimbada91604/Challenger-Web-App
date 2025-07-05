import "react"
import {useState, useEffect} from "react"
import {useApi} from "../utils/api.js"
import {useNavigate} from "react-router-dom"

export function Dashboard() {
    const [marketData, setMarketData] = useState(null)
    const [trendingStocks, setTrendingStocks] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)
    const {makeRequest} = useApi()
    const navigate = useNavigate()

    // Mock portfolio data
    const portfolioValue = 125450.67
    const dayPL = 2345.78

    useEffect(() => {
        fetchDashboardData()
    }, [])

    const fetchDashboardData = async () => {
        setIsLoading(true)
        setError(null)

        try {
            // Mock data for now - in a real app, these would be API calls
            setMarketData({
                marketStatus: "Open",
                sp500: { value: 4567.89, change: +23.45, changePercent: +0.52 },
                nasdaq: { value: 14234.56, change: -12.34, changePercent: -0.09 },
                dow: { value: 35678.90, change: +45.67, changePercent: +0.13 }
            })
            
            setTrendingStocks([
                { symbol: "AAPL", name: "Apple Inc.", price: 189.45, change: +2.34, changePercent: +1.25 },
                { symbol: "TSLA", name: "Tesla Inc.", price: 245.67, change: -5.43, changePercent: -2.16 },
                { symbol: "MSFT", name: "Microsoft Corp.", price: 378.90, change: +1.23, changePercent: +0.33 },
                { symbol: "GOOGL", name: "Alphabet Inc.", price: 134.56, change: +0.78, changePercent: +0.58 },
                { symbol: "AMZN", name: "Amazon.com Inc.", price: 145.23, change: -1.45, changePercent: -0.99 }
            ])
        } catch (err) {
            setError("Failed to load market data.")
        } finally {
            setIsLoading(false)
        }
    }

    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(price)
    }

    const formatChange = (change) => {
        const sign = change >= 0 ? '+' : ''
        return `${sign}${change.toFixed(2)}`
    }

    const formatChangePercent = (changePercent) => {
        const sign = changePercent >= 0 ? '+' : ''
        return `${sign}${changePercent.toFixed(2)}%`
    }

    // Top movers: sort by absolute % change, take top 3
    const topMovers = [...trendingStocks]
        .sort((a, b) => Math.abs(b.changePercent) - Math.abs(a.changePercent))
        .slice(0, 3)

    if (isLoading) {
        return <div className="dashboard-container">
            <div className="loading">Loading market data...</div>
        </div>
    }

    if (error) {
        return <div className="dashboard-container">
            <div className="error-message">
                <p>{error}</p>
            </div>
        </div>
    }

    return (
        <div className="dashboard-container">
            <h2>Dashboard</h2>

            {/* At-a-glance section */}
            <div className="at-a-glance">
                <div className="glance-cards">
                    <div className="glance-card">
                        <div className="glance-label">Portfolio Value</div>
                        <div className="glance-value">{formatPrice(portfolioValue)}</div>
                    </div>
                    <div className="glance-card">
                        <div className="glance-label">Day's P/L</div>
                        <div className={`glance-value ${dayPL >= 0 ? 'positive' : 'negative'}`}>{formatChange(dayPL)}</div>
                    </div>
                    <div className="glance-card">
                        <div className="glance-label">Market Movers</div>
                        <div className="top-movers-list">
                            {topMovers.map((stock) => (
                                <div key={stock.symbol} className="top-mover">
                                    <span className="top-mover-symbol">{stock.symbol}</span>
                                    <span className={`top-mover-change ${stock.changePercent >= 0 ? 'positive' : 'negative'}`}>{formatChangePercent(stock.changePercent)}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Quick Links */}
            <div className="quick-links">
                <button className="quick-link" onClick={() => navigate('/watchlist')}>
                    <span>Watchlist</span>
                </button>
                <button className="quick-link" onClick={() => navigate('/news')}>
                    <span>News</span>
                </button>
                <button className="quick-link" onClick={() => navigate('/ai')}>
                    <span>AI Assistant</span>
                </button>
            </div>

            {/* Market Overview */}
            <div className="market-overview">
                <h3>Market Overview</h3>
                <div className="market-indices">
                    <div className="index-card">
                        <h4>S&P 500</h4>
                        <div className="index-value">{formatPrice(marketData.sp500.value)}</div>
                        <div className={`index-change ${marketData.sp500.change >= 0 ? 'positive' : 'negative'}`}>
                            {formatChange(marketData.sp500.change)} ({formatChangePercent(marketData.sp500.changePercent)})
                        </div>
                    </div>
                    <div className="index-card">
                        <h4>NASDAQ</h4>
                        <div className="index-value">{formatPrice(marketData.nasdaq.value)}</div>
                        <div className={`index-change ${marketData.nasdaq.change >= 0 ? 'positive' : 'negative'}`}>
                            {formatChange(marketData.nasdaq.change)} ({formatChangePercent(marketData.nasdaq.changePercent)})
                        </div>
                    </div>
                    <div className="index-card">
                        <h4>Dow Jones</h4>
                        <div className="index-value">{formatPrice(marketData.dow.value)}</div>
                        <div className={`index-change ${marketData.dow.change >= 0 ? 'positive' : 'negative'}`}>
                            {formatChange(marketData.dow.change)} ({formatChangePercent(marketData.dow.changePercent)})
                        </div>
                    </div>
                </div>
            </div>

            {/* Trending Stocks */}
            <div className="trending-stocks">
                <h3>Trending Stocks</h3>
                <div className="stocks-grid">
                    {trendingStocks.map((stock) => (
                        <div key={stock.symbol} className="stock-card" onClick={() => navigate(`/stock/${stock.symbol}`)} style={{cursor: 'pointer'}}>
                            <div className="stock-header">
                                <h4>{stock.symbol}</h4>
                                <span className="stock-name">{stock.name}</span>
                            </div>
                            <div className="stock-price">{formatPrice(stock.price)}</div>
                            <div className={`stock-change ${stock.change >= 0 ? 'positive' : 'negative'}`}>
                                {formatChange(stock.change)} ({formatChangePercent(stock.changePercent)})
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
} 