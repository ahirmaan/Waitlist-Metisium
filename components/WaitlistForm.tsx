
import React, { useState } from 'react';
import { supabase } from '../services/supabase';

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

/**
 * Safely extracts a string error message from an unknown value.
 * This function is designed to prevent "[object Object]" errors by
 * carefully inspecting the error value and its `message` property.
 * @param error The value caught in a catch block or received from an API.
 * @returns A user-friendly error message as a string.
 */
const getErrorMessage = (error: unknown): string => {
  // If the error has a `message` property that is a string, use it.
  // This covers Error objects, Supabase API errors, and other similar shapes.
  if (
    error &&
    typeof error === 'object' &&
    'message' in error &&
    typeof (error as { message: unknown }).message === 'string'
  ) {
    return (error as { message: string }).message;
  }

  // If the error itself is a string, use it.
  if (typeof error === 'string') {
    return error;
  }

  // Fallback for all other cases.
  return 'An unexpected error occurred. Please try again.';
};


const WaitlistForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<FormStatus>('idle');
  const [message, setMessage] = useState('');

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setStatus('error');
      setMessage('Please enter a valid email address.');
      return;
    }

    setStatus('loading');
    setMessage('');

    try {
  const response = await fetch('https://<your-worker-name>.<your-subdomain>.workers.dev/join', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email }),
});

  const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to join waitlist.');
        }


      if (error) {
        console.error('Supabase API error:', error);
        if (error.code === '23505') { // Unique constraint violation
          setStatus('error');
          setMessage('This email is already on the list!');
        } else {
          setStatus('error');
          setMessage(getErrorMessage(error));
        }
      } else {
        setStatus('success');
        setMessage("You're now part of Metisium. Welcome.");
        setEmail('');
      }
    } catch (error: unknown) {
      console.error('Unexpected error during submission:', error);
      setStatus('error');
      setMessage(getErrorMessage(error));
    }
  };

  return (
    <div className="flex flex-col items-center w-full">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row items-center justify-center gap-2 w-full"
      >
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          disabled={status === 'loading'}
          className="w-full sm:w-[350px] h-[50px] px-6 rounded-full bg-white/5 border border-white/20 backdrop-blur-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all duration-300"
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full sm:w-[160px] h-[50px] rounded-full font-semibold text-white bg-gradient-to-r from-yellow-400 via-pink-500 to-blue-500 animate-gradient-x hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/20 active:scale-95 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status === 'loading' ? 'Joining...' : 'Join Waitlist'}
        </button>
      </form>
      {message && (
        <p
          className={`mt-4 text-sm font-medium ${
            status === 'success' ? 'text-green-400' : 'text-red-400'
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
};

export default WaitlistForm;
