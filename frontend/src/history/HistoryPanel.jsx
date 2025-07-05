import "react"
import {useState, useEffect} from "react"
import {useApi} from "../utils/api.js";

export function HistoryPanel() {
    const {makeRequest} = useApi()
    const [history, setHistory] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        fetchHistory()
    }, [])

    const fetchHistory = async () => {
        setIsLoading(true)
        setError(null)

        try {
            // Mock trading history data - in a real app, this would come from an API
            setHistory([
                {
                    id: 1,
                    type: "BUY",
                    symbol: "AAPL",
                    shares: 10,
                    price: 185.50,
                    total: 1855.00,
                    date: "2024-01-15T10:30:00Z",
                    status: "completed"
                },
                {
                    id: 2,
                    type: "SELL",
                    symbol: "TSLA",
                    shares: 5,
                    price: 250.00,
                    total: 1250.00,
                    date: "2024-01-14T14:20:00Z",
                    status: "completed"
                },
                {
                    id: 3,
                    type: "BUY",
                    symbol: "MSFT",
                    shares: 8,
                    price: 375.25,
                    total: 3002.00,
                    date: "2024-01-13T09:15:00Z",
                    status: "completed"
                },
                {
                    id: 4,
                    type: "BUY",
                    symbol: "GOOGL",
                    shares: 15,
                    price: 135.80,
                    total: 2037.00,
                    date: "2024-01-12T16:45:00Z",
                    status: "completed"
                },
                {
                    id: 5,
                    type: "SELL",
                    symbol: "NVDA",
                    shares: 3,
                    price: 480.00,
                    total: 1440.00,
                    date: "2024-01-11T11:30:00Z",
                    status: "completed"
                }
            ])
        } catch (err) {
            setError("Failed to load trading history.")
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

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
    }

    if (isLoading) {
        return <div className="history-container">
            <div className="loading">Loading trading history...</div>
        </div>
    }

    if (error) {
        return <div className="history-container">
            <div className="error-message">
                <p>{error}</p>
                <button onClick={fetchHistory} className="retry-button">Retry</button>
            </div>
        </div>
    }

    return (
        <div className="history-container">
            <h2>Trading History</h2>
            {history.length === 0 ? (
                <div className="empty-history">
                    <p>No trading history found</p>
                </div>
            ) : (
                <div className="history-table">
                    <div className="table-header">
                        <div className="header-cell">Type</div>
                        <div className="header-cell">Stock</div>
                        <div className="header-cell">Shares</div>
                        <div className="header-cell">Price</div>
                        <div className="header-cell">Total</div>
                        <div className="header-cell">Date</div>
                        <div className="header-cell">Status</div>
                    </div>
                    {history.map((trade) => (
                        <div key={trade.id} className="history-row">
                            <div className={`trade-type ${trade.type.toLowerCase()}`}>
                                {trade.type}
                            </div>
                            <div className="trade-symbol">{trade.symbol}</div>
                            <div className="trade-shares">{trade.shares}</div>
                            <div className="trade-price">{formatCurrency(trade.price)}</div>
                            <div className="trade-total">{formatCurrency(trade.total)}</div>
                            <div className="trade-date">{formatDate(trade.date)}</div>
                            <div className={`trade-status ${trade.status}`}>
                                {trade.status}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}