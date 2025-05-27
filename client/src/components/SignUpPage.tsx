import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [otpInput, setOtpInput] = useState('');
  const [otpError, setOtpError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setError('');
    const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();

    try {
      const res = await fetch('/api/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email, otp: generatedOtp }),
      });

      const data = await res.json();
      if (data.success) {
        console.log('OTP sent to:', formData.email);
        setOtp(generatedOtp);
        setOtpSent(true);
      } else {
        setError('Failed to send OTP');
      }
    } catch (err) {
      setError('Error sending OTP');
    }
  };

  const handleVerifyOtp = async () => {
  if (otpInput === otp) {
    try {
      const res = await fetch('/api/register-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, otp: otpInput }),
      });
      const data = await res.json();

      if (data.success) {
        setOtpError('');
        setSuccess(true);
        console.log('User registered successfully.');
      } else {
        setOtpError(data.message || 'Registration failed');
      }
    } catch {
      setOtpError('Error during registration');
    }
  } else {
    setOtpError('Invalid OTP');
  }
};


  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Sign Up</h2>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      {otpError && <p className="text-red-500 text-center mb-4">{otpError}</p>}
      {success && <p className="text-green-600 text-center mb-4">OTP Verified! Registration successful.</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        {!otpSent ? (
          <>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-600">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:ring-blue-500"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-600">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:ring-blue-500"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-600">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:ring-blue-500"
                placeholder="Enter your password"
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-600">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:ring-blue-500"
                placeholder="Confirm your password"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 mt-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition"
            >
              Send OTP
            </button>
          </>
        ) : (
          <>
            <div>
              <label htmlFor="otp" className="block text-sm font-medium text-gray-600">
                Enter OTP
              </label>
              <input
                type="text"
                id="otp"
                name="otp"
                value={otpInput}
                onChange={(e) => setOtpInput(e.target.value)}
                className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:ring-blue-500"
                placeholder="Enter the OTP sent to your email"
              />
            </div>

            <button
              type="button"
              onClick={handleVerifyOtp}
              className="w-full py-3 mt-4 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 transition"
            >
              Verify OTP
            </button>
          </>
        )}
      </form>

      <p className="text-center text-sm mt-4">
        Already have an account?{' '}
        <Link to="/login" className="text-blue-600 hover:underline">
          Login here
        </Link>
      </p>
    </div>
  );
};

export default SignUpPage;
