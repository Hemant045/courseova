import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebaseConfig';
import { collection, doc, setDoc } from 'firebase/firestore';

const SignUpPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    number: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  const { name, number, email, password, confirmPassword } = formData;

  if (!name || !number || !email || !password || !confirmPassword) {
    setError('⚠️ Please fill in all fields');
    return;
  }

  if (password !== confirmPassword) {
    setError('⚠️ Passwords do not match');
    return;
  }

  setError('');
  setLoading(true);
  setSuccess(false);

  try {
    console.log('Creating user...');
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log('User created:', user.uid);

    // Firestore write
    console.log('Storing user data in Firestore...');
    await setDoc(doc(db, 'users', user.uid), {
      uid: user.uid,
      name,
      number,
      email,
      createdAt: new Date(),
    });
    console.log('User data stored successfully.');

    setSuccess(true);
    setFormData({
      name: '',
      number: '',
      email: '',
      password: '',
      confirmPassword: '',
    });

    // ✅ Delay and navigate to login
    setTimeout(() => {
      console.log('Redirecting to login...');
      navigate('/login');
    }, 1500);

  } catch (err: any) {
    console.error('Error during registration:', err);

    if (err.code === 'auth/email-already-in-use') {
      setError('⚠️ This email is already in use.');
    } else if (err.code === 'auth/weak-password') {
      setError('⚠️ Password should be at least 6 characters.');
    } else {
      setError(err.message || '❌ Something went wrong during registration.');
    }
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Sign Up</h2>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      {success && <p className="text-green-600 text-center mb-4">✅ Registration successful! Redirecting to login...</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-md"
        />
        <input
          type="tel"
          name="number"
          placeholder="Phone Number"
          value={formData.number}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-md"
        />
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-md"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-md"
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-md"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700"
        >
          {loading ? 'Registering...' : 'Register'}
        </button>
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
