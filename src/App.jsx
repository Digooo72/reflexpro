import {BrowserRouter, Routes, Route} from "react-router-dom"

import Navbar from "./components/Navbar"
import ThemeController from "./components/ThemeController"
import HomePage from "./pages/HomePage"
import GamePage from "./pages/GamePage"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import LeaderboardPage from "./pages/LeaderboardPage"
import ProfilePage from "./pages/ProfilePage"
import NotFoundPage from "./pages/NotFoundPage"
import ProtectedRoute from "./components/ProtectedRoute"

function App(){
    return(
        <BrowserRouter>
            <a href="#main" className="skip-link">Ugrás a tartalomra</a>

            <Navbar/>
            <ThemeController />

            <main id="main" className="container">
                <Routes>
                    {/* --- NYILVÁNOS OLDALAK (Bárki láthatja, bejelentkezés nélkül is) --- */}
                    <Route path="/" element={<HomePage/>}/>
                    <Route path="/game" element={<GamePage/>}/> {/* <-- IDE KERÜLT ÁT A JÁTÉK! */}
                    <Route path="/leaderboard" element={<LeaderboardPage/>}/>
                    <Route path="/login" element={<LoginPage/>}/>
                    <Route path="/register" element={<RegisterPage/>}/>
                    <Route path="*" element={<NotFoundPage/>}/>

                    {/* --- VÉDETT OLDALAK (Csak belépve) --- */}
                    <Route
                        path="/profile"
                        element={
                            <ProtectedRoute>
                                <ProfilePage/>
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </main>
        </BrowserRouter>
    )
}

export default App