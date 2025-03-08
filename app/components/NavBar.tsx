import React from 'react'
import Link from "next/link";

export default function NavBar() {
  return (
    <nav className="bg-gray-800 p-4 text-white">
      <div className="flex justify-between items-center">
        {/* Left Side - Main Navigation */}
        <Link href="/" className="text-xl font-bold">
          ResumeDB
        </Link>
        <ul className="flex space-x-4">
          <li><Link href="/resume">Resume</Link></li>
        </ul>

        {/* Right Side - Login & Register */}
        <ul className="flex space-x-4">
          <li><Link href="/login">Login</Link></li>
          <li><Link href="/register">Register</Link></li>
        </ul>
      </div>
    </nav>
  );
}