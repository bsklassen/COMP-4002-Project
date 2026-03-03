import { Routes, Route } from "react-router-dom";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import Landing from "./components/pages/Landing";
import Login from "./components/pages/Login/Login";
import BattleScreen from "./components/pages/battlescreen/Battlescreen";
import { UserProvider } from "./components/common/usercontext/UserContext";
import BattleComplete from "./components/pages/battlecomplete/battleComplete";

function App() {

  return (
    <>
    <UserProvider>
      <Header />
      <main className="container">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/battle" element={<BattleScreen />} />
          <Route path="/victory" element={<BattleComplete />} />
        </Routes>
      </main>
      <Footer />
      </UserProvider>
    </>
  )
}

export default App