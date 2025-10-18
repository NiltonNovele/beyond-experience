// src/pages/_app.tsx
import "@/styles/globals.css";
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  RedirectToSignIn,
} from "@clerk/nextjs";
import type { AppProps } from "next/app";
import Navbar from "@/components/Navbar"; // 👈 We'll create this next
import Footer from "@/components/Footer";

function MyApp({ Component, pageProps, router }: AppProps) {
  const publicPages = ["/"]; 

  const isPublicPage = publicPages.includes(router.pathname);

  return (
    <ClerkProvider {...pageProps}>
      <div className="min-h-screen flex flex-col bg-white text-black">
        {/* Navbar only for signed-in users */}
        <SignedIn>
          <Navbar />
        </SignedIn>

        <main className="flex-1 pt-14">
  {isPublicPage ? (
    <Component {...pageProps} />
  ) : (
    <>
      <SignedIn>
        <Component {...pageProps} />
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  )}
</main>
        <Footer />
      </div>
    </ClerkProvider>
  );
}

export default MyApp;
