import ClerkProviderWithRoutes from "./auth/ClerkProviderWithRoutes.jsx"
import {Routes, Route} from "react-router-dom"
import {Layout} from "./layout/Layout.jsx"
import {Dashboard} from "./dashboard/Dashboard.jsx"
import {Portfolio} from "./portfolio/Portfolio.jsx"
import {Watchlist} from "./watchlist/Watchlist.jsx"
import {StockDetail} from "./stock-detail/StockDetail.jsx"
import {News} from "./news/News.jsx"
import {AIAssistant} from "./ai-assistant/AIAssistant.jsx"
import {HistoryPanel} from "./history/HistoryPanel.jsx";
import {AuthenticationPage} from "./auth/AuthenticationPage.jsx";
import {LandingPage} from "./marketing/LandingPage.jsx";
import './App.css'

function App() {
  return <ClerkProviderWithRoutes>
        <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/sign-in/*" element={<AuthenticationPage />} />
            <Route path="/sign-up/*" element={<AuthenticationPage />} />
            <Route element={<Layout />}>
                <Route path="/dashboard" element={<Dashboard />}/>
                <Route path="/portfolio" element={<Portfolio />}/>
                <Route path="/watchlist" element={<Watchlist />}/>
                <Route path="/stock/:symbol" element={<StockDetail />}/>
                <Route path="/news" element={<News />}/>
                <Route path="/news/:symbol" element={<News />}/>
                <Route path="/ai" element={<AIAssistant />}/>
                <Route path="/history" element={<HistoryPanel />}/>
            </Route>
        </Routes>
    </ClerkProviderWithRoutes>
}

export default App
