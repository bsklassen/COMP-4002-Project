import { Routes, Route } from "react-router-dom";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import Landing from "./components/pages/Landing";
import Login from "./components/pages/Login/Login";
import BattleScreen from "./components/pages/battlescreen/Battlescreen";
import { UserProvider } from "./components/common/usercontext/UserContext";
import BattleComplete from "./components/pages/battlecomplete/battleComplete";
import "./App.css";

function App() {

  return (
    <>
    <UserProvider>
      <Header />
      <main className="container">
        <div className="game-viewport">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/battle" element={<BattleScreen />} />
            <Route path="/victory" element={<BattleComplete />} />
          </Routes>
        </div>
      </main>
      <Footer />
      </UserProvider>
    </>
  )
}

export default App