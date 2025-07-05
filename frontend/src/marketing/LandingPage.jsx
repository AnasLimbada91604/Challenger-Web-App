import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function LandingPage() {
    const navigate = useNavigate();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handleGetStarted = () => {
        navigate('/sign-up');
    };

    return (
        <div className="landing-page">
            {/* Navigation */}
            <nav className="landing-nav">
                <div className="nav-content">
                    <div className="nav-brand">
                        <div className="nav-wordmark">CHALLENGER</div>
                    </div>
                    <div className="nav-actions">
                        <button className="nav-button secondary" onClick={() => navigate('/sign-in')}>
                            Sign In
                        </button>
                        <button className="nav-button primary" onClick={() => navigate('/sign-up')}>
                            Sign Up
                        </button>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="hero-section">
                <div className="hero-content">
                    <div className="hero-text">
                        <h1 className="hero-title">
                            Professional Stock Trading
                            <span className="gradient-text"> Made Simple</span>
                        </h1>
                        <p className="hero-subtitle">
                            Experience the future of stock tracking with AI-powered insights, 
                            real-time data, and a beautiful interface designed for professionals.
                        </p>
                        <div className="hero-actions">
                            <button className="cta-button primary" onClick={handleGetStarted}>
                                Get Started Free
                            </button>
                            <button className="cta-button secondary" onClick={() => scrollToSection('features')}>
                                See Features
                            </button>
                        </div>
                    </div>
                    <div className="hero-visual">
                        <div className="app-preview">
                            <div className="preview-header">
                                <div className="preview-logo">CHALLENGER</div>
                                <div className="preview-nav">
                                    <span>Dashboard</span>
                                    <span>Portfolio</span>
                                    <span>Watchlist</span>
                                </div>
                            </div>
                            <div className="preview-content">
                                <div className="preview-card">
                                    <div className="card-title">Portfolio Value</div>
                                    <div className="card-value">$124,567.89</div>
                                    <div className="card-change positive">+$2,345.67 (+1.92%)</div>
                                </div>
                                <div className="preview-card">
                                    <div className="card-title">Top Movers</div>
                                    <div className="movers-list">
                                        <div className="mover-item">
                                            <span>AAPL</span>
                                            <span className="positive">+2.4%</span>
                                        </div>
                                        <div className="mover-item">
                                            <span>TSLA</span>
                                            <span className="negative">-1.8%</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="features-section">
                <div className="section-header">
                    <h2>Everything You Need to Succeed</h2>
                    <p>Powerful tools designed for modern investors</p>
                </div>
                <div className="features-grid">
                    <div className="feature-card">
                        <h3>Smart Dashboard</h3>
                        <p>Get a comprehensive overview of your portfolio with real-time data, market trends, and personalized insights.</p>
                    </div>
                    <div className="feature-card">
                        <h3>Portfolio Management</h3>
                        <p>Track your investments, analyze performance, and manage your holdings with professional-grade tools.</p>
                    </div>
                    <div className="feature-card">
                        <h3>Watchlist</h3>
                        <p>Monitor your favorite stocks with customizable alerts and real-time price updates.</p>
                    </div>
                    <div className="feature-card">
                        <h3>AI Assistant</h3>
                        <p>Get intelligent analysis, market predictions, and personalized recommendations powered by AI.</p>
                    </div>
                    <div className="feature-card">
                        <h3>News & Sentiment</h3>
                        <p>Stay informed with curated news and sentiment analysis that impacts your investments.</p>
                    </div>
                    <div className="feature-card">
                        <h3>Advanced Charts</h3>
                        <p>Analyze stock performance with interactive charts and technical indicators.</p>
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="how-it-works-section">
                <div className="section-header">
                    <h2>Get Started in Minutes</h2>
                    <p>Simple setup, powerful results</p>
                </div>
                <div className="steps-container">
                    <div className="step">
                        <div className="step-number">1</div>
                        <h3>Sign Up</h3>
                        <p>Create your account in seconds with secure authentication</p>
                    </div>
                    <div className="step-arrow">→</div>
                    <div className="step">
                        <div className="step-number">2</div>
                        <h3>Connect Portfolio</h3>
                        <p>Import your existing holdings or start fresh</p>
                    </div>
                    <div className="step-arrow">→</div>
                    <div className="step">
                        <div className="step-number">3</div>
                        <h3>Start Trading</h3>
                        <p>Access professional tools and AI insights immediately</p>
                    </div>
                </div>
            </section>

            {/* Pricing Section */}
            <section className="pricing-section">
                <div className="section-header">
                    <h2>Choose Your Plan</h2>
                    <p>Start free, upgrade when you're ready</p>
                </div>
                <div className="pricing-grid">
                    <div className="pricing-card">
                        <div className="plan-name">Free</div>
                        <div className="plan-price">$0<span>/month</span></div>
                        <ul className="plan-features">
                            <li>Basic portfolio tracking</li>
                            <li>Watchlist (up to 10 stocks)</li>
                            <li>Market data (delayed)</li>
                            <li>Basic charts</li>
                        </ul>
                        <button className="plan-button" onClick={handleGetStarted}>
                            Get Started
                        </button>
                    </div>
                    <div className="pricing-card featured">
                        <div className="plan-badge">Most Popular</div>
                        <div className="plan-name">Pro</div>
                        <div className="plan-price">$19<span>/month</span></div>
                        <ul className="plan-features">
                            <li>Everything in Free</li>
                            <li>Real-time data</li>
                            <li>AI Assistant</li>
                            <li>Advanced analytics</li>
                            <li>Unlimited watchlist</li>
                            <li>News & sentiment</li>
                        </ul>
                        <button className="plan-button primary" onClick={handleGetStarted}>
                            Start Pro Trial
                        </button>
                    </div>
                    <div className="pricing-card">
                        <div className="plan-name">Enterprise</div>
                        <div className="plan-price">$99<span>/month</span></div>
                        <ul className="plan-features">
                            <li>Everything in Pro</li>
                            <li>Team collaboration</li>
                            <li>Custom integrations</li>
                            <li>Priority support</li>
                            <li>Advanced reporting</li>
                        </ul>
                        <button className="plan-button" onClick={handleGetStarted}>
                            Contact Sales
                        </button>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta-section">
                <div className="cta-content">
                    <h2>Ready to Transform Your Trading?</h2>
                    <p>Join thousands of investors who trust Challenger for their portfolio management</p>
                    <button className="cta-button primary large" onClick={handleGetStarted}>
                        Start Your Free Account
                    </button>
                </div>
            </section>

            {/* Footer */}
            <footer className="landing-footer">
                <div className="footer-content">
                    <div className="footer-section">
                        <div className="footer-logo">CHALLENGER</div>
                        <p>Professional stock trading made simple</p>
                    </div>
                    <div className="footer-section">
                        <h4>Product</h4>
                        <ul>
                            <li><a href="#features">Features</a></li>
                            <li><a href="#pricing">Pricing</a></li>
                            <li><a href="/auth">Sign Up</a></li>
                        </ul>
                    </div>
                    <div className="footer-section">
                        <h4>Support</h4>
                        <ul>
                            <li><a href="#help">Help Center</a></li>
                            <li><a href="#contact">Contact</a></li>
                            <li><a href="#docs">Documentation</a></li>
                        </ul>
                    </div>
                    <div className="footer-section">
                        <h4>Legal</h4>
                        <ul>
                            <li><a href="#privacy">Privacy Policy</a></li>
                            <li><a href="#terms">Terms of Service</a></li>
                        </ul>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>&copy; 2024 Challenger. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
} 