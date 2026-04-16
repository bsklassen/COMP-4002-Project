import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../common/usercontext/UserContext";

function Landing() {
  const navigate = useNavigate();
  const { username } = useUser();

  useEffect(() => {
    if (username) {
      navigate("/battle", { replace: true });
      return;
    }
    const timer = setTimeout(() => navigate("/login", { replace: true }), 2000);
    return () => clearTimeout(timer);
  }, [username, navigate]);

  return (
    <section style={{ textAlign: "center", padding: "4rem" }}>
      <h1>Welcome to Full Stack Demo</h1>
      <p>The best place to build full-stack apps!</p>
    </section>
  );
}

export default Landing;
