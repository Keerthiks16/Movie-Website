import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SignupPage from "./pages/SignUpPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/authUser";
import { useEffect } from "react";
import { LoaderCircle, LoaderPinwheel } from "lucide-react";
import WatchPage from "./pages/WatchPage";
import ScrollToTopButton from "./components/ScrollToTop";
import SearchPage from "./pages/SearchPage";
import SearchHistoryPage from "./pages/SearchHistory";
function App() {
  const { user, AuthLoading, authCheck } = useAuthStore();

  useEffect(() => {
    authCheck();
  }, [authCheck]);

  if (AuthLoading) {
    return (
      <div className="flex bg-black h-screen justify-center items-center">
        <LoaderPinwheel className="text-red-700 animate-spin" />
      </div>
    );
  }

  return (
    <>
      <div className="bg-black">
        <BrowserRouter>
          <ScrollToTopButton />
          <div className=" w-screen background">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route
                path="/signup"
                element={!user ? <SignupPage /> : <Navigate to="/" />}
              />
              <Route
                path="/login"
                element={!user ? <LoginPage /> : <Navigate to="/" />}
              />
              <Route
                path="/watch/:id"
                element={user ? <WatchPage /> : <Navigate to="/login" />}
              />
              <Route
                path="/search"
                element={user ? <SearchPage /> : <Navigate to="/login" />}
              />
              <Route
                path="/history"
                element={
                  user ? <SearchHistoryPage /> : <Navigate to="/login" />
                }
              />
            </Routes>
          </div>
        </BrowserRouter>
        <Footer />
        <Toaster />
      </div>
    </>
  );
}

export default App;
