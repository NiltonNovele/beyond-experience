import { Check } from "lucide-react";
import { FaInstagram, FaYoutube, FaTiktok } from "react-icons/fa";

export default function Contact() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-between bg-white px-6 py-12 md:py-16 text-black">
      {/* Header */}
      <section className="text-center space-y-4 max-w-lg">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight" style={{ fontFamily: "MyFont2" }}>
          Get in touch
        </h1>
        <p className="text-gray-700 text-sm md:text-base leading-relaxed">
          Whether you have got a question, a testimony to share, or just want to say hi —
          we wouldd love to hear from you.
        </p>
      </section>

      {/* Contact Form */}
      <form
        action="https://formsubmit.co/your@email.com"  // Updated action URL
        method="POST"
        className="mt-10 w-full max-w-md bg-gray-50 border border-gray-200 shadow-md rounded-2xl p-6 space-y-5"
      >
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            placeholder="First Name"
            className="flex-1 border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-black transition"
            name="name" // Added name attribute for form submission
            required
          />
          <input
            type="text"
            placeholder="Last Name"
            className="flex-1 border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-black transition"
            name="lastname" // Added name attribute for form submission
            required
          />
        </div>

        <input
          type="email"
          placeholder="Email Address"
          className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-black transition"
          name="email" // Added name attribute for form submission
          required
        />

        <textarea
          placeholder="Message"
          rows={5}
          className="w-full border border-gray-300 px-4 py-2 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-black transition"
          name="message" // Added name attribute for form submission
          required
        />

        <button
          type="submit"
          className="flex items-center justify-center gap-2 w-full bg-black text-white py-2.5 rounded-md hover:bg-gray-800 transition-all"
        >
          Submit <Check className="w-5 h-5" />
        </button>
      </form>

      {/* Social Media Section */}
      <footer className="flex flex-col items-center gap-4 mt-12 md:mt-16">
        <p className="text-gray-600 text-sm">Follow us on</p>
        <div className="flex gap-6">
          <a href="https://www.instagram.com/beyondexperience_?igsh=MTljaDU1MDY2a2xieQ==" aria-label="Instagram">
            <FaInstagram className="w-6 h-6 hover:text-gray-600 transition-transform transform hover:scale-110" />
          </a>
          <a href="https://www.tiktok.com/@beyondexperience_?_t=ZS-8yypDgdzo5F&_r=1&fbclid=PAZnRzaANXtU9leHRuA2FlbQIxMQABp5ytfVaxdhCD3O1aCarYG7JUAhj_uoOo9OtcG_kk5yTznpjyIreF7un9m5mF_aem_21O3dT35zZG2C5eoERSXMg" aria-label="TikTok">
            <FaTiktok className="w-6 h-6 hover:text-gray-600 transition-transform transform hover:scale-110" />
          </a>
          <a href="https://m.youtube.com/@beyondonlive?fbclid=PARlRTSANXtWJleHRuA2FlbQIxMQABpwd1h6E2Lx8smyAKb6sJAiiBpIpRJqMuAhuG4z6r6O_HtTRh56sJ6VRcKCl4_aem_W-0LySA_IqUd9lZA5o-VVg" aria-label="YouTube">
            <FaYoutube className="w-6 h-6 hover:text-gray-600 transition-transform transform hover:scale-110" />
          </a>
        </div>
      </footer>
    </main>
  );
}
