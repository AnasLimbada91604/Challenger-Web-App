import "react"
import {SignedIn, SignedOut, UserButton} from "@clerk/clerk-react"
import {Outlet, Link, Navigate} from "react-router-dom"

export function Layout() {
    return <div className="app-layout">
        <header className="app-header">
            <div className="header-content">
                <div className="challenger-title--small">CHALLENGER</div>
                <nav>
                    <SignedIn>
                        <Link to="/dashboard">Dashboard</Link>
                        <Link to="/portfolio">Portfolio</Link>
                        <Link to="/watchlist">Watchlist</Link>
                        <Link to="/news">News</Link>
                        <Link to="/ai">AI Assistant</Link>
                        <Link to="/history">History</Link>
                        <UserButton/>
                    </SignedIn>
                </nav>
            </div>
        </header>

        <main className="app-main">
            <SignedOut>
                <Navigate to="/sign-in" replace/>
            </SignedOut>
            <SignedIn>
                <Outlet />
            </SignedIn>
        </main>
    </div>
}