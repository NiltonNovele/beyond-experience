"use client";

import Image from "next/image";
// If you have an icon component for the Credit Card, import it here.
import { FaCreditCard } from "react-icons/fa"; // Example of a possible icon library

export default function Give() {
  const donationInfo = {
    bank: "FNB/RMB",
    accountNumber: "63043448950",
    branchCode: "210835",
    accountHolder: "Beyond Experience International NPC",
    qrCode: "/qr.png", // Replace with your actual SnapScan QR code image
    snapScanLink: "https://www.snapscan.co.za", // Add the SnapScan link here (or remove this if unnecessary)
  };

  return (
    <main className="min-h-screen bg-white flex flex-col items-center px-6 py-12 text-black">
      {/* Header */}
      <header className="text-center mb-10">
        <h1 className="text-5xl font-extrabold mb-4 tracking-tight">
          Online Giving
        </h1>
        <p className="text-gray-700 text-base max-w-sm mx-auto">
          Partner with this vision to reach <br />
          72 million people across 72 nations.
        </p>
      </header>

      {/* SnapScan Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-4xl w-full">
        <a
          href={donationInfo.snapScanLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center p-8 rounded-3xl bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-2xl hover:scale-105 transition-transform"
        >
          <FaCreditCard className="w-10 h-10 mb-4" /> {/* Replace with appropriate icon */}
          <h2 className="text-2xl font-semibold mb-2 text-center">Donate via SnapScan</h2>
          <p className="text-center text-sm">Quick & easy. Open the link to donate instantly.</p>
        </a>
      </div>

      {/* SnapScan QR Code Section */}
      <section className="flex flex-col items-center mb-10">
        <h2 className="text-2xl font-bold mb-4 tracking-tight">Snapscan</h2>
        <div className="bg-white border border-black rounded-lg p-4 flex flex-col items-center shadow-sm">
          <Image
            src={donationInfo.qrCode}
            alt="SnapScan QR Code"
            width={180}
            height={180}
            className="rounded-md"
          />
          <p className="mt-3 text-sm text-gray-600 italic">Snap here to pay</p>
        </div>
      </section>

      {/* Banking Details Section */}
      <section className="w-full max-w-xs bg-gray-50 border border-gray-300 rounded-2xl shadow-sm p-5 text-center">
        <h2 className="text-2xl font-bold mb-3 tracking-tight">Banking Details</h2>
        <div className="text-left text-sm text-gray-700 space-y-1">
          <p>
            <strong>Bank:</strong> {donationInfo.bank}
          </p>
          <p>
            <strong>Account Number:</strong> {donationInfo.accountNumber}
          </p>
          <p>
            <strong>Branch Code:</strong> {donationInfo.branchCode}
          </p>
          <p>
            <strong>Account Holder:</strong> {donationInfo.accountHolder}
          </p>
        </div>
      </section>

      {/* Footer Note */}
      <footer className="mt-6 text-xs text-gray-500 text-center max-w-xs">
        *All contributions go towards advancing the Beyond mission.
      </footer>
    </main>
  );
}
