import { Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import Landing from "./components/pages/Landing";
import Login from "./components/pages/Login/Login";
import BattleScreen from "./components/pages/battlescreen/Battlescreen";
import { UserProvider } from "./components/common/usercontext/UserContext";
import BattleComplete from "./components/pages/battlecomplete/battleComplete";
import ProtectedRoute from "./components/common/ProtectedRoute";
import "./App.css";

function AppRoutes() {
  const location = useLocation();
  const battleKey = (location.state as { resetKey?: number } | null)?.resetKey ?? 0;

  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/battle" element={<ProtectedRoute><BattleScreen key={battleKey} /></ProtectedRoute>} />
      <Route path="/victory" element={<ProtectedRoute><BattleComplete /></ProtectedRoute>} />
    </Routes>
  );
}

function App() {
  return (
    <>
    <UserProvider>
      <Header />
      <main className="container">
        <div className="game-viewport">
          <AppRoutes />
        </div>
      </main>
      <Footer />
    </UserProvider>
    </>
  )
}

export default App