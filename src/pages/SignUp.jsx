import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaUser,
  FaPhone,
  FaBuilding,
  FaGoogle,
  FaFacebook,
  FaGithub,
} from "react-icons/fa";

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    organization: "",
    role: "user", // Default role
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) {
      newErrors.name = "Name is required";
    }
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.phone) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\+?[\d\s-]{10,}$/.test(formData.phone)) {
      newErrors.phone = "Invalid phone number";
    }
    if (!formData.organization) {
      newErrors.organization = "Organization is required";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        // Add your signup logic here
        console.log("Signup attempted with:", formData);
        // On successful signup, navigate to login
        // navigate('/login');
      } catch (error) {
        console.error("Signup failed:", error);
      }
    }
  };

  const handleSocialSignup = (provider) => {
    console.log(`Signing up with ${provider}`);
    // Implement social signup logic here
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="flex items-center justify-center py-6 px-4 sm:py-12 sm:px-6 lg:px-8"
    >
      <div className="w-full max-w-sm sm:max-w-md space-y-4 sm:space-y-8">
        <div className="bg-white shadow-2xl rounded-lg p-4 sm:p-8 border border-gray-200">
          <div className="flex flex-col items-center">
            <div className="bg-gradient-to-r from-gray-100 to-gray-200 p-2 sm:p-3 rounded-full">
              <FaUser className="h-5 w-5 sm:h-6 sm:w-6 text-gray-800" />
            </div>
            <h2 className="mt-4 sm:mt-6 text-center text-2xl sm:text-3xl font-extrabold text-gray-900">
              Create Account
            </h2>

            {/* Social Sign Up Buttons */}
            <div className="flex space-x-3 sm:space-x-4 mt-4 sm:mt-6">
              <button
                type="button"
                onClick={() => handleSocialSignup("google")}
                className="flex items-center justify-center p-2 border border-gray-300 rounded-full hover:bg-gray-50 transition-colors"
              >
                <FaGoogle className="h-5 w-5 sm:h-6 sm:w-6 text-red-500" />
              </button>
              <button
                type="button"
                onClick={() => handleSocialSignup("facebook")}
                className="flex items-center justify-center p-2 border border-gray-300 rounded-full hover:bg-gray-50 transition-colors"
              >
                <FaFacebook className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
              </button>
              <button
                type="button"
                onClick={() => handleSocialSignup("github")}
                className="flex items-center justify-center p-2 border border-gray-300 rounded-full hover:bg-gray-50 transition-colors"
              >
                <FaGithub className="h-5 w-5 sm:h-6 sm:w-6 text-gray-800" />
              </button>
            </div>

            <div className="relative w-full mt-4 sm:mt-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-xs sm:text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Or continue with
                </span>
              </div>
            </div>
          </div>

          <form className="mt-6 sm:mt-8 space-y-4 sm:space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm space-y-3 sm:space-y-4">
              {/* Name Input */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaUser className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500" />
                </div>
                <input
                  name="name"
                  type="text"
                  required
                  className={`appearance-none rounded-lg relative block w-full pl-9 sm:pl-10 pr-3 py-1.5 sm:py-2 border
                    ${errors.name ? "border-red-400" : "border-gray-300"}
                    bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 
                    focus:ring-gray-500 focus:border-transparent text-sm sm:text-base`}
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                />
                {errors.name && (
                  <p className="mt-1 text-xs sm:text-sm text-red-500">{errors.name}</p>
                )}
              </div>

              {/* Email Input */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaEnvelope className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500" />
                </div>
                <input
                  name="email"
                  type="email"
                  required
                  className={`appearance-none rounded-lg relative block w-full pl-9 sm:pl-10 pr-3 py-1.5 sm:py-2 border
                    ${errors.email ? "border-red-400" : "border-gray-300"}
                    bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 
                    focus:ring-gray-500 focus:border-transparent text-sm sm:text-base`}
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && (
                  <p className="mt-1 text-xs sm:text-sm text-red-500">{errors.email}</p>
                )}
              </div>

              {/* Phone Input */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaPhone className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500" />
                </div>
                <input
                  name="phone"
                  type="tel"
                  required
                  className={`appearance-none rounded-lg relative block w-full pl-9 sm:pl-10 pr-3 py-1.5 sm:py-2 border
                    ${errors.phone ? "border-red-400" : "border-gray-300"}
                    bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 
                    focus:ring-gray-500 focus:border-transparent text-sm sm:text-base`}
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                />
                {errors.phone && (
                  <p className="mt-1 text-xs sm:text-sm text-red-500">{errors.phone}</p>
                )}
              </div>

              {/* Organization Input */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaBuilding className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500" />
                </div>
                <input
                  name="organization"
                  type="text"
                  required
                  className={`appearance-none rounded-lg relative block w-full pl-9 sm:pl-10 pr-3 py-1.5 sm:py-2 border
                    ${errors.organization ? "border-red-400" : "border-gray-300"}
                    bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 
                    focus:ring-gray-500 focus:border-transparent text-sm sm:text-base`}
                  placeholder="Organization"
                  value={formData.organization}
                  onChange={handleChange}
                />
                {errors.organization && (
                  <p className="mt-1 text-xs sm:text-sm text-red-500">
                    {errors.organization}
                  </p>
                )}
              </div>

              {/* Role Selection */}
              <div className="relative">
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="appearance-none rounded-lg relative block w-full pl-3 pr-8 py-1.5 sm:py-2 border border-gray-300
                    bg-white text-gray-900 focus:outline-none focus:ring-2 
                    focus:ring-gray-500 focus:border-transparent text-sm sm:text-base"
                >
                  <option value="user">User</option>
                  <option value="service_provider">Service Provider</option>
                </select>
              </div>

              {/* Password Input */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500" />
                </div>
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  className={`appearance-none rounded-lg relative block w-full pl-9 sm:pl-10 pr-9 sm:pr-10 py-1.5 sm:py-2 border
                    ${errors.password ? "border-red-400" : "border-gray-300"}
                    bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2
                    focus:ring-gray-500 focus:border-transparent text-sm sm:text-base`}
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-auto"
                >
                  {showPassword ? (
                    <FaEyeSlash className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500" />
                  ) : (
                    <FaEye className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500" />
                  )}
                </button>
                {errors.password && (
                  <p className="mt-1 text-xs sm:text-sm text-red-500">{errors.password}</p>
                )}
              </div>

              {/* Confirm Password Input */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500" />
                </div>
                <input
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  required
                  className={`appearance-none rounded-lg relative block w-full pl-9 sm:pl-10 pr-9 sm:pr-10 py-1.5 sm:py-2 border
                    ${errors.confirmPassword ? "border-red-400" : "border-gray-300"}
                    bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2
                    focus:ring-gray-500 focus:border-transparent text-sm sm:text-base`}
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-auto"
                >
                  {showConfirmPassword ? (
                    <FaEyeSlash className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500" />
                  ) : (
                    <FaEye className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500" />
                  )}
                </button>
                {errors.confirmPassword && (
                  <p className="mt-1 text-xs sm:text-sm text-red-500">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-1.5 sm:py-2 px-4 border border-gray-300
                  text-sm font-medium rounded-md text-gray-900 bg-gradient-to-r from-gray-100 to-gray-200 
                  hover:from-gray-200 hover:to-gray-300 focus:outline-none focus:ring-2 
                  focus:ring-offset-2 focus:ring-gray-500 transition-all duration-200"
              >
                Sign Up
              </button>
            </div>

            <div className="text-center">
              <p className="text-gray-600 text-sm">
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => navigate("/login")}
                  className="text-gray-900 hover:text-gray-700 font-medium"
                >
                  Sign In
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </motion.div>
  );
};

export default SignUp;
