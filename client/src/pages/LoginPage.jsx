import React, { useState } from "react";
import { Mail, Lock, Eye, EyeOff, Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authUser";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login, Loading } = useAuthStore();
  const { searchParams } = new URL(window.location);
  const emailValue = searchParams.get("email");
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: emailValue || "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    login(formData);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const inputClasses =
    "w-full pl-12 pr-4 py-3 bg-[#1a1a1a] rounded-lg text-white \
                       placeholder-gray-400 focus:outline-none";

  return (
    <div className="min-h-screen w-full flex items-center justify-center">
      <div className="w-full max-w-md p-8 mx-4 bg-black">
        <div className="mb-8 text-center">
          <h1 className="text-5xl font-bold text-white mb-2">Login</h1>
          <p className="text-gray-400">Welcome back to our movie community</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className={inputClasses}
              required
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className={`${inputClasses} pr-12`}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 
                       hover:text-white transition duration-200"
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg 
                     transition duration-200"
          >
            {Loading ? (
              <Loader2 className=" animate-spin flex self-center place-self-center" />
            ) : (
              "Login"
            )}
          </button>
        </form>

        <p className="mt-6 text-center text-gray-400">
          Don't have an account?{" "}
          <span
            onClick={() => {
              navigate("/signup?email=" + formData.email);
            }}
            className="text-red-500 hover:text-red-400 cursor-pointer"
          >
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
