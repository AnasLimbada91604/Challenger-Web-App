import "react"
import {useState, useEffect} from "react"
import {useParams, useNavigate} from "react-router-dom"
import {useApi} from "../utils/api.js"

export function StockDetail() {
    const {symbol} = useParams()
    const navigate = useNavigate()
    const [stockData, setStockData] = useState(null)
    const [timeframe, setTimeframe] = useState("1d")
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)
    const {makeRequest} = useApi()

    useEffect(() => {
        if (symbol) {
            fetchStockData()
        }
    }, [symbol, timeframe])

    const fetchStockData = async () => {
        setIsLoading(true)
        setError(null)

        try {
            // Mock comprehensive stock data - in a real app, this would come from APIs
            setStockData({
                symbol: symbol.toUpperCase(),
                name: `${symbol.toUpperCase()} Corporation`,
                price: 189.45,
                change: +2.34,
                changePercent: +1.25,
                bid: 189.40,
                ask: 189.50,
                volume: "45.2M",
                marketCap: "2.98T",
                pe: 28.5,
                eps: 6.65,
                dividendYield: 0.5,
                beta: 1.2,
                dayRange: { low: 187.20, high: 190.10 },
                yearRange: { low: 124.17, high: 198.23 },
                chartData: generateMockChartData(timeframe),
                fundamentals: {
                    pe: 28.5,
                    eps: 6.65,
                    dividendYield: 0.5,
                    beta: 1.2,
                    marketCap: "2.98T",
                    enterpriseValue: "3.1T",
                    priceToBook: 15.2,
                    priceToSales: 7.8,
                    returnOnEquity: 147.9,
                    returnOnAssets: 28.3,
                    debtToEquity: 1.8,
                    currentRatio: 1.1,
                    quickRatio: 0.9
                }
            })
        } catch (err) {
            setError("Failed to load stock data.")
        } finally {
            setIsLoading(false)
        }
    }

    const generateMockChartData = (tf) => {
        // Generate mock candlestick data based on timeframe
        const data = []
        const basePrice = 189.45
        const now = new Date()
        
        let intervals, intervalMs
        switch (tf) {
            case "1d":
                intervals = 24
                intervalMs = 60 * 60 * 1000 // 1 hour
                break
            case "5d":
                intervals = 5
                intervalMs = 24 * 60 * 60 * 1000 // 1 day
                break
            case "1m":
                intervals = 30
                intervalMs = 24 * 60 * 60 * 1000 // 1 day
                break
            case "1y":
                intervals = 12
                intervalMs = 30 * 24 * 60 * 60 * 1000 // 30 days
                break
            default:
                intervals = 24
                intervalMs = 60 * 60 * 1000
        }

        for (let i = intervals; i >= 0; i--) {
            const time = new Date(now.getTime() - (i * intervalMs))
            const open = basePrice + (Math.random() - 0.5) * 10
            const close = open + (Math.random() - 0.5) * 5
            const high = Math.max(open, close) + Math.random() * 3
            const low = Math.min(open, close) - Math.random() * 3
            const volume = Math.floor(Math.random() * 1000000) + 100000

            data.push({
                time: time.getTime(),
                open,
                high,
                low,
                close,
                volume
            })
        }

        return data
    }

    const formatCurrency = (price) => {
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

    const formatNumber = (num) => {
        if (num >= 1e12) return (num / 1e12).toFixed(2) + 'T'
        if (num >= 1e9) return (num / 1e9).toFixed(2) + 'B'
        if (num >= 1e6) return (num / 1e6).toFixed(2) + 'M'
        if (num >= 1e3) return (num / 1e3).toFixed(2) + 'K'
        return num.toString()
    }

    if (isLoading) {
        return <div className="stock-detail-container">
            <div className="loading">Loading stock data...</div>
        </div>
    }

    if (error) {
        return <div className="stock-detail-container">
            <div className="error-message">
                <p>{error}</p>
            </div>
        </div>
    }

    return (
        <div className="stock-detail-container">
            {/* Header */}
            <div className="stock-header">
                <button className="back-button" onClick={() => navigate(-1)}>
                    ← Back
                </button>
                <div className="stock-title">
                    <h1>{stockData.symbol}</h1>
                    <p className="stock-name">{stockData.name}</p>
                </div>
            </div>

            {/* Real-time Quote */}
            <div className="quote-section">
                <div className="quote-main">
                    <div className="quote-price">{formatCurrency(stockData.price)}</div>
                    <div className={`quote-change ${stockData.change >= 0 ? 'positive' : 'negative'}`}>
                        {formatChange(stockData.change)} ({formatChangePercent(stockData.changePercent)})
                    </div>
                </div>
                <div className="quote-details">
                    <div className="quote-item">
                        <span className="label">Bid:</span>
                        <span className="value">{formatCurrency(stockData.bid)}</span>
                    </div>
                    <div className="quote-item">
                        <span className="label">Ask:</span>
                        <span className="value">{formatCurrency(stockData.ask)}</span>
                    </div>
                    <div className="quote-item">
                        <span className="label">Volume:</span>
                        <span className="value">{stockData.volume}</span>
                    </div>
                    <div className="quote-item">
                        <span className="label">Market Cap:</span>
                        <span className="value">{stockData.marketCap}</span>
                    </div>
                </div>
            </div>

            {/* Chart Controls */}
            <div className="chart-controls">
                <div className="timeframe-buttons">
                    {["1d", "5d", "1m", "1y"].map((tf) => (
                        <button
                            key={tf}
                            className={`timeframe-btn ${timeframe === tf ? 'active' : ''}`}
                            onClick={() => setTimeframe(tf)}
                        >
                            {tf}
                        </button>
                    ))}
                </div>
            </div>

            {/* Interactive Chart */}
            <div className="chart-section">
                <div className="chart-container">
                    <div className="chart-placeholder">
                        <h3>Interactive Candlestick Chart</h3>
                        <p>Chart data for {stockData.symbol} - {timeframe} timeframe</p>
                        <div className="chart-mock">
                            {stockData.chartData.slice(-10).map((candle, i) => (
                                <div key={i} className="candle-mock">
                                    <div className="candle-body" style={{
                                        height: `${Math.abs(candle.close - candle.open) * 10}px`,
                                        backgroundColor: candle.close >= candle.open ? '#22c55e' : '#ef4444'
                                    }}></div>
                                    <div className="candle-wick" style={{
                                        height: `${(candle.high - candle.low) * 10}px`
                                    }}></div>
                                </div>
                            ))}
                        </div>
                        <p className="chart-note">In a real app, this would be an interactive chart using libraries like TradingView or Chart.js</p>
                    </div>
                </div>
            </div>

            {/* Fundamental Metrics */}
            <div className="fundamentals-section">
                <h3>Fundamental Metrics</h3>
                <div className="fundamentals-grid">
                    <div className="metric-card">
                        <div className="metric-label">P/E Ratio</div>
                        <div className="metric-value">{stockData.fundamentals.pe}</div>
                    </div>
                    <div className="metric-card">
                        <div className="metric-label">EPS</div>
                        <div className="metric-value">{formatCurrency(stockData.fundamentals.eps)}</div>
                    </div>
                    <div className="metric-card">
                        <div className="metric-label">Dividend Yield</div>
                        <div className="metric-value">{stockData.fundamentals.dividendYield}%</div>
                    </div>
                    <div className="metric-card">
                        <div className="metric-label">Beta</div>
                        <div className="metric-value">{stockData.fundamentals.beta}</div>
                    </div>
                    <div className="metric-card">
                        <div className="metric-label">Market Cap</div>
                        <div className="metric-value">{stockData.fundamentals.marketCap}</div>
                    </div>
                    <div className="metric-card">
                        <div className="metric-label">Enterprise Value</div>
                        <div className="metric-value">{stockData.fundamentals.enterpriseValue}</div>
                    </div>
                    <div className="metric-card">
                        <div className="metric-label">Price to Book</div>
                        <div className="metric-value">{stockData.fundamentals.priceToBook}</div>
                    </div>
                    <div className="metric-card">
                        <div className="metric-label">ROE</div>
                        <div className="metric-value">{stockData.fundamentals.returnOnEquity}%</div>
                    </div>
                    <div className="metric-card">
                        <div className="metric-label">Debt to Equity</div>
                        <div className="metric-value">{stockData.fundamentals.debtToEquity}</div>
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="stock-actions">
                <button className="action-button primary" onClick={() => navigate(`/portfolio`)}>
                    <span>Add to Portfolio</span>
                </button>
                <button className="action-button" onClick={() => navigate(`/watchlist`)}>
                    <span>Add to Watchlist</span>
                </button>
                <button className="action-button" onClick={() => navigate(`/news/${symbol}`)}>
                    <span>View News</span>
                </button>
                <button className="action-button" onClick={() => navigate(`/ai?ticker=${symbol}`)}>
                    <span>AI Analysis</span>
                </button>
            </div>
        </div>
    )
} 