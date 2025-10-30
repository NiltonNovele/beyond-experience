"use client";

import Image from "next/image";
import { FaCreditCard } from "react-icons/fa";

export default function Give() {
  const donationInfo = {
    bank: "FNB/RMB",
    accountNumber: "63043448950",
    branchCode: "210835",
    accountHolder: "Beyond Experience International NPC",
    qrCode: "/qr.png",
    snapScanLink: "https://pos.snapscan.io/qr/F-kNZsXV",
    swiftCode: "FIRNZAJJ",
  };

  return (
    <main className="min-h-screen bg-white flex flex-col items-center px-6 py-12 text-black">
      {/* ===== HEADER ===== */}
      <header className="text-center mb-16 max-w-3xl">
        <h1
          className="text-6xl font-bold text-center w-full" style={{ fontFamily: "MyFont2" }}
        >
          Online Giving
        </h1>
        <p className="text-gray-700 text-base sm:text-lg lg:text-xl leading-relaxed">
          Partner with this vision to reach{" "}
          <span className="font-semibold text-gray-900">72 million people</span> across{" "}
          <span className="font-semibold text-gray-900">72 nations</span>.
        </p>
      </header>

      {/* ===== MAIN CONTENT GRID ===== */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 w-full max-w-6xl items-start">
        {/* --- SnapScan Link Card --- */}
        <a
          href={donationInfo.snapScanLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center p-8 rounded-2xl bg-gray-50 border border-gray-200 text-black shadow-sm hover:shadow-lg hover:scale-[1.02] transition-transform duration-200"
        >
          <FaCreditCard className="w-10 h-10 mb-4 text-blue-600" />
          <h2 className="text-xl lg:text-2xl font-semibold mb-1 text-center">
            Tap to give via SnapScan
          </h2>
          <p className="text-sm text-gray-500 text-center">
            Quick, secure and simple.
          </p>
        </a>

        {/* --- QR Code Section --- */}
        <section className="flex flex-col items-center justify-center bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
          <h2 className="text-2xl font-bold mb-4 tracking-tight">SnapScan</h2>
          <div className="bg-white border border-gray-300 rounded-lg p-4 flex flex-col items-center shadow-sm">
            <Image
              src={donationInfo.qrCode}
              alt="SnapScan QR Code"
              width={220}
              height={220}
              className="rounded-md"
            />
            <p className="mt-3 text-sm text-gray-600 italic">Scan here to give</p>
          </div>
        </section>

        {/* --- Banking Details Section --- */}
        <section className="bg-gray-50 border border-gray-200 rounded-2xl shadow-sm p-8 text-center">
          <h2 className="text-2xl font-bold mb-4 tracking-tight">Banking Details</h2>
          <div className="text-left text-sm lg:text-base text-gray-700 space-y-2">
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
              <strong>Swift Code:</strong> {donationInfo.swiftCode}
            </p>
            <p>
              <strong>Account Holder:</strong> {donationInfo.accountHolder}
            </p>
          </div>
        </section>
      </div>

      {/* ===== FOOTER NOTE ===== */}
      <footer className="mt-12 text-xs sm:text-sm text-gray-500 text-center max-w-md leading-relaxed">
        *All contributions go towards advancing the Beyond mission and empowering
        communities across nations.
      </footer>
    </main>
  );
}
