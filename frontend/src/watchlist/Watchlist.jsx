import "react"
import {useState, useEffect} from "react"
import {useApi} from "../utils/api.js"

export function Watchlist() {
    const [watchlist, setWatchlist] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)
    const [searchTerm, setSearchTerm] = useState("")
    const [sortBy, setSortBy] = useState("symbol")
    const [sortOrder, setSortOrder] = useState("asc")
    const [filterBy, setFilterBy] = useState("all")
    const [newTicker, setNewTicker] = useState("")
    const [showAddForm, setShowAddForm] = useState(false)
    const {makeRequest} = useApi()

    useEffect(() => {
        fetchWatchlist()
    }, [])

    const fetchWatchlist = async () => {
        setIsLoading(true)
        setError(null)

        try {
            // Mock watchlist data - in a real app, this would come from an API
            setWatchlist([
                {
                    symbol: "NVDA",
                    name: "NVIDIA Corporation",
                    price: 485.23,
                    change: +12.45,
                    changePercent: +2.64,
                    volume: "45.2M",
                    marketCap: "1.2T"
                },
                {
                    symbol: "META",
                    name: "Meta Platforms Inc.",
                    price: 334.56,
                    change: -5.67,
                    changePercent: -1.67,
                    volume: "23.1M",
                    marketCap: "850B"
                },
                {
                    symbol: "NFLX",
                    name: "Netflix Inc.",
                    price: 567.89,
                    change: +8.90,
                    changePercent: +1.59,
                    volume: "12.8M",
                    marketCap: "250B"
                },
                {
                    symbol: "AMD",
                    name: "Advanced Micro Devices",
                    price: 123.45,
                    change: -2.34,
                    changePercent: -1.86,
                    volume: "67.3M",
                    marketCap: "200B"
                },
                {
                    symbol: "CRM",
                    name: "Salesforce Inc.",
                    price: 234.67,
                    change: +3.21,
                    changePercent: +1.39,
                    volume: "18.9M",
                    marketCap: "230B"
                },
                {
                    symbol: "TSLA",
                    name: "Tesla Inc.",
                    price: 245.67,
                    change: -15.43,
                    changePercent: -5.91,
                    volume: "89.1M",
                    marketCap: "780B"
                }
            ])
        } catch (err) {
            setError("Failed to load watchlist.")
        } finally {
            setIsLoading(false)
        }
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

    const addTicker = () => {
        if (!newTicker.trim()) return
        
        // Mock new stock data - in a real app, you'd fetch this from an API
        const newStock = {
            symbol: newTicker.toUpperCase(),
            name: `${newTicker.toUpperCase()} Company`,
            price: Math.random() * 500 + 50,
            change: (Math.random() - 0.5) * 20,
            changePercent: (Math.random() - 0.5) * 10,
            volume: `${Math.floor(Math.random() * 100)}M`,
            marketCap: `${Math.floor(Math.random() * 1000)}B`
        }
        
        setWatchlist(prev => [...prev, newStock])
        setNewTicker("")
        setShowAddForm(false)
    }

    const removeFromWatchlist = (symbol) => {
        setWatchlist(prev => prev.filter(stock => stock.symbol !== symbol))
    }

    const sortWatchlist = (a, b) => {
        let aValue, bValue
        
        switch (sortBy) {
            case "symbol":
                aValue = a.symbol
                bValue = b.symbol
                break
            case "price":
                aValue = a.price
                bValue = b.price
                break
            case "change":
                aValue = a.changePercent
                bValue = b.changePercent
                break
            case "volume":
                aValue = parseFloat(a.volume.replace('M', '').replace('B', '000'))
                bValue = parseFloat(b.volume.replace('M', '').replace('B', '000'))
                break
            case "marketCap":
                aValue = parseFloat(a.marketCap.replace('B', '').replace('T', '000'))
                bValue = parseFloat(b.marketCap.replace('B', '').replace('T', '000'))
                break
            default:
                aValue = a.symbol
                bValue = b.symbol
        }
        
        if (sortOrder === "asc") {
            return aValue > bValue ? 1 : -1
        } else {
            return aValue < bValue ? 1 : -1
        }
    }

    const filterWatchlist = (stock) => {
        switch (filterBy) {
            case "gainers":
                return stock.changePercent > 0
            case "losers":
                return stock.changePercent < 0
            case "highVolume":
                return parseFloat(stock.volume.replace('M', '').replace('B', '000')) > 50
            case "largeCap":
                return parseFloat(stock.marketCap.replace('B', '').replace('T', '000')) > 500
            default:
                return true
        }
    }

    const filteredAndSortedWatchlist = watchlist
        .filter(stock => 
            (stock.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
             stock.name.toLowerCase().includes(searchTerm.toLowerCase())) &&
            filterWatchlist(stock)
        )
        .sort(sortWatchlist)

    const toggleSortOrder = () => {
        setSortOrder(prev => prev === "asc" ? "desc" : "asc")
    }

    if (isLoading) {
        return <div className="watchlist-container">
            <div className="loading">Loading watchlist...</div>
        </div>
    }

    if (error) {
        return <div className="watchlist-container">
            <div className="error-message">
                <p>{error}</p>
            </div>
        </div>
    }

    return (
        <div className="watchlist-container">
            <div className="watchlist-header">
                <h2>Watchlist</h2>
                <button 
                    className="action-button primary"
                    onClick={() => setShowAddForm(!showAddForm)}
                >
                    <span>Add Ticker</span>
                </button>
            </div>

            {/* Add Ticker Form */}
            {showAddForm && (
                <div className="add-ticker-form">
                    <div className="form-row">
                        <input
                            type="text"
                            placeholder="Enter stock symbol (e.g., AAPL)"
                            value={newTicker}
                            onChange={(e) => setNewTicker(e.target.value)}
                            className="ticker-input"
                            onKeyPress={(e) => e.key === 'Enter' && addTicker()}
                        />
                        <button className="action-button primary" onClick={addTicker}>
                            Add
                        </button>
                        <button className="action-button secondary" onClick={() => setShowAddForm(false)}>
                            Cancel
                        </button>
                    </div>
                </div>
            )}

            {/* Controls */}
            <div className="watchlist-controls">
                <div className="search-filter">
                    <input
                        type="text"
                        placeholder="Search stocks..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input"
                    />
                    <select 
                        value={filterBy} 
                        onChange={(e) => setFilterBy(e.target.value)}
                        className="filter-select"
                    >
                        <option value="all">All Stocks</option>
                        <option value="gainers">Gainers</option>
                        <option value="losers">Losers</option>
                        <option value="highVolume">High Volume</option>
                        <option value="largeCap">Large Cap</option>
                    </select>
                </div>
                
                <div className="sort-controls">
                    <select 
                        value={sortBy} 
                        onChange={(e) => setSortBy(e.target.value)}
                        className="sort-select"
                    >
                        <option value="symbol">Symbol</option>
                        <option value="price">Price</option>
                        <option value="change">Change %</option>
                        <option value="volume">Volume</option>
                        <option value="marketCap">Market Cap</option>
                    </select>
                    <button 
                        className="sort-order-btn"
                        onClick={toggleSortOrder}
                    >
                        {sortOrder === "asc" ? "↑" : "↓"}
                    </button>
                </div>
            </div>

            {filteredAndSortedWatchlist.length === 0 ? (
                <div className="empty-watchlist">
                    <p>No stocks found in your watchlist.</p>
                                    <button className="action-button primary" onClick={() => setShowAddForm(true)}>
                    <span>Add Stocks</span>
                </button>
                </div>
            ) : (
                <div className="watchlist-table">
                    <div className="table-header">
                        <div className="header-cell">Stock</div>
                        <div className="header-cell">Price</div>
                        <div className="header-cell">Change</div>
                        <div className="header-cell">Volume</div>
                        <div className="header-cell">Market Cap</div>
                        <div className="header-cell">Actions</div>
                    </div>
                    {filteredAndSortedWatchlist.map((stock) => (
                        <div key={stock.symbol} className="watchlist-row">
                            <div className="stock-info">
                                <div className="stock-symbol" onClick={() => navigate(`/stock/${stock.symbol}`)} style={{cursor: 'pointer', color: 'var(--primary-color)'}}>{stock.symbol}</div>
                                <div className="stock-name">{stock.name}</div>
                            </div>
                            <div className="stock-price">{formatCurrency(stock.price)}</div>
                            <div className={`stock-change ${stock.change >= 0 ? 'positive' : 'negative'}`}>
                                {formatChange(stock.change)} ({formatChangePercent(stock.changePercent)})
                            </div>
                            <div className="stock-volume">{stock.volume}</div>
                            <div className="stock-market-cap">{stock.marketCap}</div>
                            <div className="stock-actions">
                                <button className="action-button small">
                                    <span>View</span>
                                </button>
                                <button 
                                    className="action-button small remove"
                                    onClick={() => removeFromWatchlist(stock.symbol)}
                                >
                                    <span>Remove</span>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <div className="watchlist-summary">
                <p>Showing {filteredAndSortedWatchlist.length} of {watchlist.length} stocks</p>
            </div>
        </div>
    )
} 