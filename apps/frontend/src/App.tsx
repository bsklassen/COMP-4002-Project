import { Routes, Route, useLocation } from "react-router-dom";
import { SignIn, SignUp } from "@clerk/clerk-react";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import Landing from "./components/pages/Landing";
import BattleScreen from "./components/pages/battlescreen/Battlescreen";
import BattleComplete from "./components/pages/battlecomplete/battleComplete";
import ProtectedRoute from "./components/common/ProtectedRoute";
import "./App.css";
 
function AppRoutes() {
  const location = useLocation();
  const battleKey = (location.state as { resetKey?: number } | null)?.resetKey ?? 0;
 
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      {/* Clerk hosted sign in/up pages */}
      <Route path="/login" element={<SignIn routing="path" path="/login" />} />
      <Route path="/sign-up" element={<SignUp routing="path" path="/sign-up" />} />
      {/* Protected routes - require sign in */}
      <Route path="/battle" element={<ProtectedRoute><BattleScreen key={battleKey} /></ProtectedRoute>} />
      <Route path="/victory" element={<ProtectedRoute><BattleComplete /></ProtectedRoute>} />
    </Routes>
  );
}
 
function App() {
  return (
    <>
      <Header />
      <main className="container">
        <div className="game-viewport">
          <AppRoutes />
        </div>
      </main>
      <Footer />
    </>
  )
}
 
export default App;