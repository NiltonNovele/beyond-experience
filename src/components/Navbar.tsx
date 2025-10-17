import Link from "next/link";
import { useRouter } from "next/router";
import { UserButton } from "@clerk/nextjs";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Menu,
  X,
  Home,
  Users,
  Calendar,
  MapPin,
  HandCoins,
  Mail,
  UserCheck,
} from "lucide-react";

export default function Navbar() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { href: "/home", label: "Home", icon: <Home className="w-5 h-5" /> },
    { href: "/community", label: "Community", icon: <Users className="w-5 h-5" /> },
    { href: "/events", label: "Events", icon: <Calendar className="w-5 h-5" /> },
    { href: "/visit", label: "Visit", icon: <MapPin className="w-5 h-5" /> },
    { href: "/give", label: "Give", icon: <HandCoins className="w-5 h-5" /> },
    { href: "/contact", label: "Contact", icon: <Mail className="w-5 h-5" /> },
    { href: "/profile", label: "My Profile", icon: <UserCheck className="w-5 h-5" /> },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="flex items-center justify-between px-6 py-3 md:py-4 max-w-7xl mx-auto">
        {/* Logo */}
        <div
          className="cursor-pointer select-none flex items-center"
          onClick={() => router.push("/home")}
        >
          <img
            src="/logo.png"
            alt="Beyond Logo"
            className="w-28 h-auto md:w-32 md:h-auto"
          />
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-1 ${
                router.pathname === link.href
                  ? "text-black font-semibold"
                  : "text-gray-500 hover:text-black"
              } transition-colors`}
            >
              {link.icon}
              {link.label}
            </Link>
          ))}
          <UserButton afterSignOutUrl="/" />
        </div>

        {/* Mobile Hamburger Button */}
        <button
          className="md:hidden bg-black text-white p-3 rounded-full shadow-lg flex items-center justify-center focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-white shadow-lg border-t border-gray-200 w-full px-6 py-6 flex flex-col gap-4"
          >
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 text-gray-800 hover:text-black transition-colors text-lg"
              >
                {link.icon}
                {link.label}
              </Link>
            ))}

            <div className="flex items-center gap-3 pt-4 border-t w-full border-gray-200">
              <UserCheck className="w-5 h-5 text-gray-800" />
              <UserButton afterSignOutUrl="/" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
