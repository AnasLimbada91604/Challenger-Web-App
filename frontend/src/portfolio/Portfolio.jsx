import "react"
import {useState, useEffect} from "react"
import {useApi} from "../utils/api.js"

export function Portfolio() {
    const [portfolio, setPortfolio] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)
    const [showTradeModal, setShowTradeModal] = useState(false)
    const [tradeType, setTradeType] = useState('buy')
    const [selectedStock, setSelectedStock] = useState('')
    const [tradeShares, setTradeShares] = useState('')
    const [tradePrice, setTradePrice] = useState('')
    const {makeRequest} = useApi()

    useEffect(() => {
        fetchPortfolioData()
    }, [])

    const fetchPortfolioData = async () => {
        setIsLoading(true)
        setError(null)

        try {
            // Mock portfolio data - in a real app, this would come from an API
            setPortfolio({
                totalValue: 125450.67,
                totalChange: +2345.78,
                totalChangePercent: +1.91,
                holdings: [
                    {
                        symbol: "AAPL",
                        name: "Apple Inc.",
                        shares: 25,
                        avgPrice: 175.50,
                        currentPrice: 189.45,
                        marketValue: 4736.25,
                        gainLoss: +348.75,
                        gainLossPercent: +7.95
                    },
                    {
                        symbol: "MSFT",
                        name: "Microsoft Corp.",
                        shares: 15,
                        avgPrice: 350.20,
                        currentPrice: 378.90,
                        marketValue: 5683.50,
                        gainLoss: +430.50,
                        gainLossPercent: +8.20
                    },
                    {
                        symbol: "GOOGL",
                        name: "Alphabet Inc.",
                        shares: 30,
                        avgPrice: 140.30,
                        currentPrice: 134.56,
                        marketValue: 4036.80,
                        gainLoss: -172.20,
                        gainLossPercent: -4.09
                    },
                    {
                        symbol: "TSLA",
                        name: "Tesla Inc.",
                        shares: 20,
                        avgPrice: 250.00,
                        currentPrice: 245.67,
                        marketValue: 4913.40,
                        gainLoss: -86.60,
                        gainLossPercent: -1.73
                    }
                ]
            })
        } catch (err) {
            setError("Failed to load portfolio data.")
        } finally {
            setIsLoading(false)
        }
    }

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount)
    }

    const formatPercent = (percent) => {
        const sign = percent >= 0 ? '+' : ''
        return `${sign}${percent.toFixed(2)}%`
    }

    const handleTrade = () => {
        // Simulate trade execution
        const trade = {
            type: tradeType,
            symbol: selectedStock,
            shares: parseInt(tradeShares),
            price: parseFloat(tradePrice),
            total: parseInt(tradeShares) * parseFloat(tradePrice)
        }
        
        console.log('Trade executed:', trade)
        setShowTradeModal(false)
        setSelectedStock('')
        setTradeShares('')
        setTradePrice('')
        // In a real app, you would send this to your API
    }

    const exportToCSV = () => {
        if (!portfolio) return
        
        const headers = ['Symbol', 'Name', 'Shares', 'Avg Price', 'Current Price', 'Market Value', 'Gain/Loss', 'Gain/Loss %']
        const csvContent = [
            headers.join(','),
            ...portfolio.holdings.map(holding => [
                holding.symbol,
                holding.name,
                holding.shares,
                holding.avgPrice,
                holding.currentPrice,
                holding.marketValue,
                holding.gainLoss,
                holding.gainLossPercent
            ].join(','))
        ].join('\n')
        
        const blob = new Blob([csvContent], { type: 'text/csv' })
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = 'portfolio.csv'
        a.click()
        window.URL.revokeObjectURL(url)
    }

    const exportToPDF = () => {
        // In a real app, you would use a library like jsPDF
        alert('PDF export functionality would be implemented here')
    }

    if (isLoading) {
        return <div className="portfolio-container">
            <div className="loading">Loading portfolio...</div>
        </div>
    }

    if (error) {
        return <div className="portfolio-container">
            <div className="error-message">
                <p>{error}</p>
            </div>
        </div>
    }

    return (
        <div className="portfolio-container">
            <div className="portfolio-header">
                <h2>Portfolio Management</h2>
                <div className="portfolio-actions">
                    <button className="action-button primary" onClick={() => setShowTradeModal(true)}>
                        <span>Trade</span>
                    </button>
                    <button className="action-button" onClick={exportToCSV}>
                        <span>Export CSV</span>
                    </button>
                    <button className="action-button" onClick={exportToPDF}>
                        <span>Export PDF</span>
                    </button>
                </div>
            </div>
            
            {/* Portfolio Summary */}
            <div className="portfolio-summary">
                <div className="summary-card">
                    <h3>Total Value</h3>
                    <div className="summary-value">{formatCurrency(portfolio.totalValue)}</div>
                    <div className={`summary-change ${portfolio.totalChange >= 0 ? 'positive' : 'negative'}`}>
                        {formatCurrency(portfolio.totalChange)} ({formatPercent(portfolio.totalChangePercent)})
                    </div>
                </div>
            </div>

            {/* Holdings */}
            <div className="holdings-section">
                <h3>Holdings</h3>
                <div className="holdings-table">
                    <div className="table-header">
                        <div className="header-cell">Stock</div>
                        <div className="header-cell">Shares</div>
                        <div className="header-cell">Avg Price</div>
                        <div className="header-cell">Current Price</div>
                        <div className="header-cell">Market Value</div>
                        <div className="header-cell">Unrealized G/L</div>
                        <div className="header-cell">G/L %</div>
                    </div>
                    {portfolio.holdings.map((holding) => (
                        <div key={holding.symbol} className="holding-row">
                            <div className="holding-info">
                                <div className="stock-symbol">{holding.symbol}</div>
                                <div className="stock-name">{holding.name}</div>
                            </div>
                            <div className="holding-shares">{holding.shares}</div>
                            <div className="holding-avg-price">{formatCurrency(holding.avgPrice)}</div>
                            <div className="holding-current-price">{formatCurrency(holding.currentPrice)}</div>
                            <div className="holding-market-value">{formatCurrency(holding.marketValue)}</div>
                            <div className={`holding-gain-loss ${holding.gainLoss >= 0 ? 'positive' : 'negative'}`}>
                                {formatCurrency(holding.gainLoss)}
                            </div>
                            <div className={`holding-gain-loss ${holding.gainLossPercent >= 0 ? 'positive' : 'negative'}`}>
                                {formatPercent(holding.gainLossPercent)}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Trade Modal */}
            {showTradeModal && (
                <div className="modal-overlay" onClick={() => setShowTradeModal(false)}>
                    <div className="trade-modal" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3>Paper Trading</h3>
                            <button className="modal-close" onClick={() => setShowTradeModal(false)}>×</button>
                        </div>
                        <div className="trade-form">
                            <div className="trade-type-selector">
                                <button 
                                    className={`trade-type-btn ${tradeType === 'buy' ? 'active' : ''}`}
                                    onClick={() => setTradeType('buy')}
                                >
                                    Buy
                                </button>
                                <button 
                                    className={`trade-type-btn ${tradeType === 'sell' ? 'active' : ''}`}
                                    onClick={() => setTradeType('sell')}
                                >
                                    Sell
                                </button>
                            </div>
                            <div className="form-group">
                                <label>Stock Symbol</label>
                                <input
                                    type="text"
                                    value={selectedStock}
                                    onChange={(e) => setSelectedStock(e.target.value.toUpperCase())}
                                    placeholder="e.g., AAPL"
                                />
                            </div>
                            <div className="form-group">
                                <label>Number of Shares</label>
                                <input
                                    type="number"
                                    value={tradeShares}
                                    onChange={(e) => setTradeShares(e.target.value)}
                                    placeholder="0"
                                />
                            </div>
                            <div className="form-group">
                                <label>Price per Share</label>
                                <input
                                    type="number"
                                    step="0.01"
                                    value={tradePrice}
                                    onChange={(e) => setTradePrice(e.target.value)}
                                    placeholder="0.00"
                                />
                            </div>
                            {tradeShares && tradePrice && (
                                <div className="trade-summary">
                                    <div className="trade-total">
                                        Total: {formatCurrency(parseFloat(tradeShares) * parseFloat(tradePrice))}
                                    </div>
                                </div>
                            )}
                            <div className="modal-actions">
                                <button className="action-button secondary" onClick={() => setShowTradeModal(false)}>
                                    Cancel
                                </button>
                                <button 
                                    className="action-button primary" 
                                    onClick={handleTrade}
                                    disabled={!selectedStock || !tradeShares || !tradePrice}
                                >
                                    Execute {tradeType === 'buy' ? 'Buy' : 'Sell'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
} 