// src/components/Footer.tsx
import React from "react";

export default function Footer() {
  return (
    <footer className="w-full border-t border-gray-200 bg-white py-6 px-6 flex flex-col md:flex-row items-center justify-between text-gray-500 text-sm">
      <p>© 2025 Beyond. All rights reserved.</p>
      <p>
        Developed by{" "}
        <a
          href="https://synctechx.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          SyncTechX
        </a>
      </p>
    </footer>
  );
}
