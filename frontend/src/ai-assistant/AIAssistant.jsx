import "react"
import {useState, useEffect, useRef} from "react"
import {useSearchParams, useNavigate} from "react-router-dom"
import {useApi} from "../utils/api.js"

export function AIAssistant() {
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()
    const [messages, setMessages] = useState([])
    const [inputMessage, setInputMessage] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [activeTab, setActiveTab] = useState("chat")
    const [deepDive, setDeepDive] = useState(null)
    const [summaries, setSummaries] = useState([])
    const messagesEndRef = useRef(null)
    const {makeRequest} = useApi()

    const ticker = searchParams.get('ticker')

    useEffect(() => {
        // Initialize with welcome message
        setMessages([
            {
                id: 1,
                type: "ai",
                content: "Hello! I'm your AI investment assistant. I can help you analyze stocks, generate reports, and answer questions about the market. What would you like to know?",
                timestamp: new Date()
            }
        ])

        // If ticker is provided, load initial analysis
        if (ticker) {
            loadTickerAnalysis(ticker)
        }
    }, [ticker])

    useEffect(() => {
        scrollToBottom()
    }, [messages])

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    const loadTickerAnalysis = async (symbol) => {
        setIsLoading(true)
        
        // Mock AI analysis for the ticker
        const analysis = {
            symbol: symbol.toUpperCase(),
            summary: `${symbol.toUpperCase()} is a technology company with strong fundamentals and growth potential. The stock has shown consistent performance with a solid balance sheet and innovative product pipeline.`,
            keyMetrics: {
                pe: 28.5,
                marketCap: "2.98T",
                beta: 1.2,
                dividendYield: 0.5
            },
            recommendations: [
                "Strong buy rating based on technical and fundamental analysis",
                "Positive earnings growth expected in next quarter",
                "Innovation pipeline shows promising new products",
                "Market position remains strong despite competition"
            ],
            risks: [
                "Regulatory scrutiny in key markets",
                "Supply chain dependencies",
                "Currency fluctuations affecting international sales"
            ]
        }

        setDeepDive(analysis)
        setIsLoading(false)
    }

    const sendMessage = async () => {
        if (!inputMessage.trim()) return

        const userMessage = {
            id: Date.now(),
            type: "user",
            content: inputMessage,
            timestamp: new Date()
        }

        setMessages(prev => [...prev, userMessage])
        setInputMessage("")
        setIsLoading(true)

        // Simulate AI response
        setTimeout(() => {
            const aiResponse = generateAIResponse(inputMessage)
            setMessages(prev => [...prev, aiResponse])
            setIsLoading(false)
        }, 1500)
    }

    const generateAIResponse = (userInput) => {
        const lowerInput = userInput.toLowerCase()
        
        if (lowerInput.includes("tsla") || lowerInput.includes("tesla")) {
            return {
                id: Date.now() + 1,
                type: "ai",
                content: "Tesla (TSLA) is a leading electric vehicle manufacturer with strong growth potential. The company has a P/E ratio of 45.2, which is high but justified by its growth trajectory. Key factors to watch include production capacity, competition from traditional automakers, and regulatory changes in the EV space. Would you like me to generate a detailed analysis report?",
                timestamp: new Date()
            }
        } else if (lowerInput.includes("earnings") || lowerInput.includes("financial")) {
            return {
                id: Date.now() + 1,
                type: "ai",
                content: "I can help you analyze earnings reports and financial statements. I can automatically summarize earnings calls, identify key metrics, and highlight important trends. Would you like me to analyze a specific company's recent earnings or generate a comparison between multiple companies?",
                timestamp: new Date()
            }
        } else if (lowerInput.includes("report") || lowerInput.includes("analysis")) {
            return {
                id: Date.now() + 1,
                type: "ai",
                content: "I can generate comprehensive stock analysis reports including technical analysis, fundamental metrics, risk assessment, and investment recommendations. Just let me know which stock you'd like me to analyze in detail.",
                timestamp: new Date()
            }
        } else {
            return {
                id: Date.now() + 1,
                type: "ai",
                content: "I understand you're asking about the market. I can help with stock analysis, earnings summaries, technical analysis, and investment recommendations. Could you be more specific about what you'd like to know?",
                timestamp: new Date()
            }
        }
    }

    const generateDeepDive = async (symbol) => {
        setIsLoading(true)
        
        // Mock deep dive report
        const report = {
            symbol: symbol.toUpperCase(),
            generatedAt: new Date(),
            executiveSummary: `${symbol.toUpperCase()} represents a compelling investment opportunity with strong fundamentals and growth potential. The company's innovative approach and market position provide a solid foundation for long-term value creation.`,
            technicalAnalysis: {
                trend: "Bullish",
                support: "$180",
                resistance: "$200",
                rsi: 65,
                macd: "Positive"
            },
            fundamentalAnalysis: {
                pe: 28.5,
                peg: 1.2,
                debtToEquity: 0.8,
                currentRatio: 1.5,
                roe: 25.3,
                roa: 12.1
            },
            riskAssessment: {
                marketRisk: "Medium",
                businessRisk: "Low",
                financialRisk: "Low",
                regulatoryRisk: "Medium"
            },
            investmentRecommendation: {
                rating: "Buy",
                targetPrice: "$220",
                timeHorizon: "12 months",
                confidence: "High"
            }
        }

        setDeepDive(report)
        setIsLoading(false)
    }

    const loadSummaries = async () => {
        setIsLoading(true)
        
        // Mock summaries
        const mockSummaries = [
            {
                id: 1,
                type: "earnings",
                title: "Q4 2023 Earnings Call Summary",
                company: "AAPL",
                date: "2024-01-25",
                summary: "Apple reported strong Q4 results with revenue of $119.6B, up 2% YoY. iPhone sales grew 6% while services revenue increased 11%. Management provided positive guidance for Q1 2024.",
                keyPoints: [
                    "EPS of $1.52 beat estimates of $1.48",
                    "iPhone revenue up 6% year-over-year",
                    "Services revenue grew 11% to $23.1B",
                    "Positive guidance for next quarter"
                ]
            },
            {
                id: 2,
                type: "sec",
                title: "10-K Annual Report Summary",
                company: "MSFT",
                date: "2024-01-20",
                summary: "Microsoft's annual report shows continued strong performance in cloud services and AI integration. Revenue grew 15% with Azure leading the charge.",
                keyPoints: [
                    "Total revenue of $211.9B, up 15%",
                    "Azure revenue growth of 27%",
                    "Strong AI integration across products",
                    "Increased R&D investment in AI"
                ]
            }
        ]

        setSummaries(mockSummaries)
        setIsLoading(false)
    }

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        })
    }

    return (
        <div className="ai-assistant-container">
            <div className="ai-header">
                <h2>AI Investment Assistant</h2>
                <div className="ai-tabs">
                    <button 
                        className={`tab-btn ${activeTab === "chat" ? "active" : ""}`}
                        onClick={() => setActiveTab("chat")}
                    >
                        💬 Chat
                    </button>
                    <button 
                        className={`tab-btn ${activeTab === "deep-dive" ? "active" : ""}`}
                        onClick={() => setActiveTab("deep-dive")}
                    >
                        📊 Deep Dive Reports
                    </button>
                    <button 
                        className={`tab-btn ${activeTab === "summaries" ? "active" : ""}`}
                        onClick={() => setActiveTab("summaries")}
                    >
                        📋 Auto-Summaries
                    </button>
                </div>
            </div>

            {/* Chat Interface */}
            {activeTab === "chat" && (
                <div className="chat-interface">
                    <div className="chat-messages">
                        {messages.map((message) => (
                            <div key={message.id} className={`message ${message.type}`}>
                                <div className="message-content">
                                    {message.content}
                                </div>
                                <div className="message-time">
                                    {formatDate(message.timestamp)}
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="message ai">
                                <div className="message-content">
                                    <div className="typing-indicator">
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>
                    
                    <div className="chat-input">
                        <input
                            type="text"
                            value={inputMessage}
                            onChange={(e) => setInputMessage(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                            placeholder="Ask me anything about stocks, e.g., 'What do you think of TSLA?'"
                            disabled={isLoading}
                        />
                        <button 
                            className="send-button"
                            onClick={sendMessage}
                            disabled={isLoading || !inputMessage.trim()}
                        >
                            Send
                        </button>
                    </div>
                </div>
            )}

            {/* Deep Dive Reports */}
            {activeTab === "deep-dive" && (
                <div className="deep-dive-section">
                    <div className="deep-dive-header">
                        <h3>Generate Deep Dive Report</h3>
                        <div className="ticker-input-group">
                            <input
                                type="text"
                                placeholder="Enter stock symbol (e.g., AAPL)"
                                value={ticker || ""}
                                onChange={(e) => navigate(`/ai?ticker=${e.target.value.toUpperCase()}`)}
                            />
                            <button 
                                className="action-button primary"
                                onClick={() => generateDeepDive(ticker || "AAPL")}
                                disabled={isLoading}
                            >
                                Generate Report
                            </button>
                        </div>
                    </div>

                    {deepDive && (
                        <div className="deep-dive-report">
                            <div className="report-header">
                                <h4>{deepDive.symbol} Deep Dive Analysis</h4>
                                <span className="report-date">Generated: {formatDate(deepDive.generatedAt)}</span>
                            </div>

                            <div className="report-section">
                                <h5>Executive Summary</h5>
                                <p>{deepDive.executiveSummary}</p>
                            </div>

                            <div className="report-grid">
                                <div className="report-card">
                                    <h6>Technical Analysis</h6>
                                    <div className="metric-list">
                                        <div className="metric">
                                            <span>Trend:</span>
                                            <span className={`trend ${deepDive.technicalAnalysis.trend.toLowerCase()}`}>
                                                {deepDive.technicalAnalysis.trend}
                                            </span>
                                        </div>
                                        <div className="metric">
                                            <span>Support:</span>
                                            <span>{deepDive.technicalAnalysis.support}</span>
                                        </div>
                                        <div className="metric">
                                            <span>Resistance:</span>
                                            <span>{deepDive.technicalAnalysis.resistance}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="report-card">
                                    <h6>Investment Recommendation</h6>
                                    <div className="recommendation">
                                        <div className={`rating ${deepDive.investmentRecommendation.rating.toLowerCase()}`}>
                                            {deepDive.investmentRecommendation.rating}
                                        </div>
                                        <div className="target-price">
                                            Target: {deepDive.investmentRecommendation.targetPrice}
                                        </div>
                                        <div className="confidence">
                                            Confidence: {deepDive.investmentRecommendation.confidence}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* Auto-Summaries */}
            {activeTab === "summaries" && (
                <div className="summaries-section">
                    <div className="summaries-header">
                        <h3>Earnings Calls & SEC Filings</h3>
                        <button 
                            className="action-button"
                            onClick={loadSummaries}
                            disabled={isLoading}
                        >
                            Load Recent Summaries
                        </button>
                    </div>

                    <div className="summaries-list">
                        {summaries.map((summary) => (
                            <div key={summary.id} className="summary-card">
                                <div className="summary-header">
                                    <div className="summary-type">
                                        {summary.type === "earnings" ? "📊" : "📄"} {summary.type.toUpperCase()}
                                    </div>
                                    <div className="summary-company">{summary.company}</div>
                                    <div className="summary-date">{summary.date}</div>
                                </div>
                                
                                <h5>{summary.title}</h5>
                                <p className="summary-text">{summary.summary}</p>
                                
                                <div className="key-points">
                                    <h6>Key Points:</h6>
                                    <ul>
                                        {summary.keyPoints.map((point, index) => (
                                            <li key={index}>{point}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
} 