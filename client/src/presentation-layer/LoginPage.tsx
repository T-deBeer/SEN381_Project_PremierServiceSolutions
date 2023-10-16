import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import WelcomeDiv from "../components/WelcomeDiv";
import { useUser } from "../data-layer/context-classes/UserContext";

export default function LoginPage() {
  const { user, signIn, signOut } = useUser();

  const handleSignIn = () => {
    signIn({ username: "Tiaan", email: "tdebeer.za@gmail.com" });
  };

  const handleSignOut = () => {
    signOut();
  };

  return (
    <div>
      <Navbar />
      <WelcomeDiv text={"Premier Service Solutions"} />
      {user ? (
        <div>
          <p>Welcome, {user.username}</p>
          <button onClick={handleSignOut}>Sign Out</button>
        </div>
      ) : (
        <button onClick={handleSignIn}>Sign In</button>
      )}
      
      <Footer />
    </div>
  );
}
