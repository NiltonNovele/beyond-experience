// src/pages/index.tsx
"use client";

import { SignIn, SignedIn, SignedOut, useClerk } from "@clerk/nextjs";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function SignInPage() {
  const router = useRouter();
  const clerk = useClerk(); // Hook to get Clerk instance

  // Redirect signed-in users automatically
  useEffect(() => {
    if (clerk) {
      const unsubscribe = clerk.addListener(({ session }) => {
        if (session) router.push("/home");
      });

      return () => {
        unsubscribe(); // clean up listener
      };
    }
  }, [clerk, router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white px-4 sm:px-6">
      <SignedIn>
        {() => router.push("/home")}
      </SignedIn>

      <SignedOut>
        {/* Logo Section */}
        <div className="mb-10 flex flex-col items-center">
          <div className="rounded-full w-48 h-48 overflow-hidden flex items-center justify-center border-4 border-black shadow-lg">
            <img
              src="/beyond.png"
              alt="Beyond Logo"
              className="object-cover w-full h-full"
            />
          </div>
        </div>

        {/* Sign In Box */}
        <SignIn
          appearance={{
            elements: {
              card: "shadow-none border-none bg-transparent",
              headerTitle: "hidden",
              headerSubtitle: "hidden",
              formFieldInput:
                "rounded-md border border-gray-300 focus:ring-1 focus:ring-black focus:border-black",
              formButtonPrimary:
                "bg-black text-white hover:bg-gray-800 rounded-md py-2 mt-2 w-full",
              footer: "hidden",
            },
            variables: {
              colorPrimary: "#000000",
            },
          }}
          routing="hash"
          signUpUrl="/"
          afterSignInUrl="/home"
          afterSignUpUrl="/create-profile"
        />

        {/* Optional Footer */}
        <p className="mt-6 text-gray-500 text-sm text-center">
          © 2025 Beyond. All rights reserved. Developed by{" "}
          <a
            href="https://synctechx.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            SyncTechX
          </a>
        </p>
      </SignedOut>
    </div>
  );
}
