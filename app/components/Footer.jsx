import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-4 text-center">
      <div className="container mx-auto">
      <div className="mt-2 space-x-4">
          <Link href="/about" className="hover:underline">About</Link>
          <Link href="/contact" className="hover:underline">Contact</Link>
        </div>
        <p>© {new Date().getFullYear()} ResumeDB. All rights reserved.</p>
      </div>
    </footer>
  );
}
