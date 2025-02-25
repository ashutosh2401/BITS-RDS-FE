import React from 'react'
import Link from "next/link";

export default function NavBar() {
  return (
    <nav className="bg-gray-800 p-4 text-white">
      <div className="flex justify-between items-center">
        {/* Left Side - Main Navigation */}
        <ul className="flex space-x-4">
          <li><Link href="/">Home</Link></li>
          <li><Link href="/about">About</Link></li>
          <li><Link href="/contact">Contact</Link></li>
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