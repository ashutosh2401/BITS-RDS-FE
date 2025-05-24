'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function NavBar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await axios.get('http://localhost:8081/api/v1/auth/me', {
          withCredentials: true,
        });
        setIsAuthenticated(true);
      } catch (err) {
        setIsAuthenticated(false);
      }
    };
    checkAuth();
  }, []);

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
