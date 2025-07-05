import React, { useState } from "react";
import { User, Mail, Lock, Eye, EyeOff, Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authUser";

const SignUpPage = () => {
  const { signup, Loading } = useAuthStore();

  const { searchParams } = new URL(window.location);
  const emailValue = searchParams.get("email");

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: emailValue || "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    signup(formData);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const inputClasses = `w-full pl-12 pr-4 py-3 bg-zinc-900/80 border border-white/10 
                       rounded-lg focus:outline-none focus:border-red-500 
                       text-white placeholder-gray-400 transition duration-200
                       focus:bg-zinc-900/80 autofill:bg-zinc-900/80
                       [-webkit-autofill]:bg-zinc-900/80
                       [-webkit-autofill]:text-white
                       [-webkit-autofill]:shadow-[0_0_0_30px_rgb(24_24_27/0.8)_inset]`;

  return (
    <div className="min-h-screen w-full flex items-center justify-center ">
      <div
        className="w-full max-w-md p-8 mx-4 rounded-2xl shadow-2xl 
                    bg-black 
                    backdrop-blur-xl border border-white/10"
      >
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-2">Sign Up</h1>
          <p className="text-gray-400">Join our movie community today</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              className={inputClasses}
              required
            />
          </div>

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
                     transition duration-200 transform hover:scale-[1.02] shadow-lg 
                     hover:shadow-red-500/20"
          >
            {Loading ? (
              <Loader2 className=" animate-spin flex self-center place-self-center" />
            ) : (
              "Sign Up"
            )}{" "}
          </button>
        </form>

        <p className="mt-6 text-center text-gray-400">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login?email=" + formData.email)}
            className="text-red-400 hover:text-red-300 cursor-pointer"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};
///hello

export default SignUpPage;
