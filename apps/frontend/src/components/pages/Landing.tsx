import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
 
function Landing() {
  const navigate = useNavigate();
  const { isSignedIn, isLoaded } = useUser();
 
  useEffect(() => {
    // Wait for Clerk to load before redirecting
    if (!isLoaded) return;
 
    if (isSignedIn) {
      navigate("/battle", { replace: true });
      return;
    }
 
    const timer = setTimeout(() => navigate("/login", { replace: true }), 2000);
    return () => clearTimeout(timer);
  }, [isSignedIn, isLoaded, navigate]);
 
  return (
    <section style={{ textAlign: "center", padding: "4rem" }}>
      <h1>Welcome to Full Stack Demo</h1>
      <p>The best place to build full-stack apps!</p>
    </section>
  );
}
 
export default Landing;