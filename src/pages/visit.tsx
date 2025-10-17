"use client";

import Link from "next/link";

export default function Visit() {
  return (
    <main className="min-h-screen flex flex-col items-center py-12 px-4 bg-white text-black">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-5xl font-extrabold tracking-tight mb-3">
          Visit Beyond
        </h1>
        <p className="text-gray-700 text-sm">
          Join us every Sunday at one of our locations
        </p>
      </div>

      <div className="flex flex-col items-center space-y-10 w-full max-w-md">
        {/* Location 1 */}
        <section className="w-full border border-black rounded-2xl overflow-hidden shadow-sm bg-gray-50">
          <div className="relative w-full h-56">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2914.032489186284!2d18.413920410741156!3d-33.925260973093295!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1dcc67657a924e57%3A0xb0ab407c9fa0b3d6!2sLong%20Street%20Backpackers!5e1!3m2!1sen!2sza!4v1760708580912!5m2!1sen!2sza"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
          <div className="p-4 text-center">
            <h2 className="font-bold text-lg tracking-tight">Beyond On Long</h2>
            <p className="text-sm text-gray-700 mt-1">9am | 209 Long Street</p>
            <Link
              href="https://www.google.com/maps/dir/?api=1&destination=209+Long+Street"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-block text-sm font-semibold text-blue-700 underline"
            >
              Get Directions
            </Link>
          </div>
        </section>

        {/* Location 2 */}
        <section className="w-full border border-black rounded-2xl overflow-hidden shadow-sm bg-gray-50">
          <div className="relative w-full h-56">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2914.43658247307!2d18.420406210740627!3d-33.913446573097765!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1dcc675e67a62c4b%3A0x4fcfb09218ba5793!2sShift%20Espresso%20bar%20%7C%20Waterway%20House!5e1!3m2!1sen!2sza!4v1760708614921!5m2!1sen!2sza"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
          <div className="p-4 text-center">
            <h2 className="font-bold text-lg tracking-tight">Coffee Shop Sunday</h2>
            <p className="text-sm text-gray-700 mt-1">5:30pm | 4 Dock Road</p>
            <Link
              href="https://www.google.com/maps/dir/?api=1&destination=4+Dock+Road"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-block text-sm font-semibold text-blue-700 underline"
            >
              Get Directions
            </Link>
          </div>
        </section>
      </div>

      {/* Footer Note */}
      <footer className="mt-10 text-xs text-gray-500 text-center max-w-xs">
        *We can’t wait to welcome you to a Beyond Experience gathering.
      </footer>
    </main>
  );
}
