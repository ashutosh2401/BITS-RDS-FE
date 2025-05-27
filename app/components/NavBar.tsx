'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useAuth } from '../context/AuthContext'; // ✅ Import the hook

export default function NavBar() {
  const router = useRouter();
  const { isAuthenticated, setIsAuthenticated } = useAuth(); // ✅ Get auth state from context

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:8081/api/v1/auth/logout', {}, {
        withCredentials: true,
      });
      setIsAuthenticated(false);
      router.push('/login');
    } catch (err) {
      console.error('Logout failed', err);
    }
  };

  return (
    <nav className="bg-gray-800 p-4 text-white">
      <div className="flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          ResumeDB
        </Link>

        <ul className="flex space-x-4">
          <li><Link href="/resume">Resume</Link></li>

          {isAuthenticated && (
            <li>
              <Link href="/validation-requests">Validation Requests</Link>
            </li>
          )}
        </ul>

        <ul className="flex space-x-4">
          {isAuthenticated ? (
            <li>
              <button onClick={handleLogout} className="text-white hover:underline">
                Logout
              </button>
            </li>
          ) : (
            <>
              <li><Link href="/login">Login</Link></li>
              <li><Link href="/register">Register</Link></li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}
