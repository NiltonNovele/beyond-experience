"use client";

import { useState } from "react";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa";
import Link from "next/link";

// Example verse type
interface Verse {
  reference: string;
  text: string;
}

// You can import this JSON from a file: import verses from "../data/verses.json";
const verses: Verse[] = [
  { reference: "John 3:16", text: "For God so loved the world, that he gave his only Son..." },
  { reference: "Psalm 23:1", text: "The Lord is my shepherd; I shall not want." },
  { reference: "Romans 8:28", text: "And we know that all things work together for good..." },
  { reference: "Philippians 4:13", text: "I can do all things through Christ who strengthens me." },
  { reference: "Genesis 1:1", text: "In the beginning, God created the heavens and the earth." },
  { reference: "Matthew 28:19", text: "Go therefore and make disciples of all nations..." },
  { reference: "Isaiah 41:10", text: "Fear not, for I am with you; be not dismayed, for I am your God." },
  { reference: "Proverbs 3:5", text: "Trust in the Lord with all your heart, and lean not on your own understanding." },
  { reference: "2 Corinthians 5:7", text: "For we walk by faith, not by sight." },
  { reference: "Jeremiah 29:11", text: "For I know the plans I have for you, declares the Lord..." },
  { reference: "Matthew 6:33", text: "But seek first the kingdom of God and his righteousness..." },
  { reference: "Romans 3:23", text: "For all have sinned and fall short of the glory of God." },
  { reference: "Luke 6:31", text: "And as you wish that others would do to you, do so to them." },
  { reference: "Hebrews 11:1", text: "Now faith is the assurance of things hoped for, the conviction of things not seen." },
  { reference: "John 14:6", text: "Jesus said to him, 'I am the way, and the truth, and the life.'" },
  { reference: "Isaiah 40:31", text: "But they who wait for the Lord shall renew their strength." },
  { reference: "James 1:5", text: "If any of you lacks wisdom, let him ask of God..." },
  { reference: "Philippians 4:6", text: "Do not be anxious about anything, but in everything by prayer and supplication..." },
  { reference: "1 John 4:19", text: "We love because he first loved us." },
  { reference: "Matthew 7:7", text: "Ask, and it will be given to you; seek, and you will find..." },
  { reference: "Romans 5:8", text: "But God shows his love for us in that while we were still sinners, Christ died for us." },
  { reference: "Psalm 121:1-2", text: "I lift up my eyes to the hills. From where does my help come?" },
  { reference: "1 Peter 5:7", text: "Casting all your anxieties on him, because he cares for you." },
  { reference: "Matthew 11:28", text: "Come to me, all who labor and are heavy laden, and I will give you rest." },
  { reference: "Psalm 34:8", text: "Oh, taste and see that the Lord is good!" },
  { reference: "1 Thessalonians 5:16-18", text: "Rejoice always, pray without ceasing, give thanks in all circumstances." },
  { reference: "2 Timothy 1:7", text: "For God gave us a spirit not of fear but of power and love and self-control." },
  { reference: "John 8:32", text: "And you will know the truth, and the truth will set you free." },
  { reference: "Matthew 22:37-39", text: "You shall love the Lord your God with all your heart... and you shall love your neighbor as yourself." },
  { reference: "Isaiah 55:8-9", text: "For my thoughts are not your thoughts, neither are your ways my ways, declares the Lord." },
  { reference: "Psalm 46:1", text: "God is our refuge and strength, a very present help in trouble." },
  { reference: "Romans 10:9", text: "If you confess with your mouth that Jesus is Lord and believe in your heart that God raised him from the dead..." },
  { reference: "Ephesians 2:8-9", text: "For by grace you have been saved through faith. And this is not your own doing; it is the gift of God." },
  { reference: "2 Corinthians 12:9", text: "But he said to me, 'My grace is sufficient for you, for my power is made perfect in weakness.'" },
  { reference: "Matthew 5:14", text: "You are the light of the world. A city set on a hill cannot be hidden." },
  { reference: "Revelation 21:4", text: "He will wipe away every tear from their eyes, and death shall be no more..." },
  { reference: "1 Corinthians 13:4-7", text: "Love is patient and kind; love does not envy or boast; it is not arrogant or rude..." },
  { reference: "Psalm 37:4", text: "Delight yourself in the Lord, and he will give you the desires of your heart." },
  { reference: "John 15:13", text: "Greater love has no one than this, that someone lay down his life for his friends." },
  { reference: "Colossians 3:23", text: "Whatever you do, work heartily, as for the Lord and not for men." },
  { reference: "Titus 2:11-12", text: "For the grace of God has appeared, bringing salvation for all people..." },
  { reference: "1 John 1:9", text: "If we confess our sins, he is faithful and just to forgive us our sins..." },
  { reference: "Matthew 5:9", text: "Blessed are the peacemakers, for they shall be called sons of God." },
  { reference: "1 Corinthians 10:13", text: "No temptation has overtaken you that is not common to man." },
  { reference: "Romans 8:1", text: "There is therefore now no condemnation for those who are in Christ Jesus." },
  { reference: "Luke 1:37", text: "For nothing will be impossible with God." },
  { reference: "Psalm 119:105", text: "Your word is a lamp to my feet and a light to my path." },
  { reference: "Matthew 4:4", text: "Man shall not live by bread alone, but by every word that comes from the mouth of God." },
  { reference: "Luke 12:7", text: "Why, even the hairs of your head are all numbered. Fear not; you are of more value than many sparrows." },
  { reference: "Psalm 23:4", text: "Even though I walk through the valley of the shadow of death, I will fear no evil..." },
  { reference: "1 John 3:1", text: "See what kind of love the Father has given to us, that we should be called children of God." },
  { reference: "1 Timothy 4:12", text: "Let no one despise you for your youth, but set the believers an example..." },
  { reference: "Hebrews 4:12", text: "For the word of God is living and active, sharper than any two-edged sword..." },
  { reference: "Psalm 55:22", text: "Cast your burden on the Lord, and he will sustain you." },
  { reference: "Luke 18:27", text: "What is impossible with man is possible with God." },
  { reference: "Galatians 5:22-23", text: "But the fruit of the Spirit is love, joy, peace, forbearance, kindness, goodness, faithfulness..." },
  { reference: "Romans 12:2", text: "Do not be conformed to this world, but be transformed by the renewal of your mind..." },
  { reference: "Philippians 1:6", text: "And I am sure of this, that he who began a good work in you will bring it to completion..." },
  { reference: "Psalm 119:11", text: "I have stored up your word in my heart, that I might not sin against you." },
  { reference: "Romans 8:37", text: "No, in all these things we are more than conquerors through him who loved us." },
  { reference: "1 Peter 3:15", text: "But in your hearts honor Christ the Lord as holy, always being prepared to make a defense..." },
  { reference: "Luke 10:27", text: "You shall love the Lord your God with all your heart, with all your soul, with all your strength, and with all your mind..." },
];

export default function HomePage() {
  const [currentVerse, setCurrentVerse] = useState<Verse>(
    verses[Math.floor(Math.random() * verses.length)]
  );

  const getRandomVerse = () => {
    const random = verses[Math.floor(Math.random() * verses.length)];
    setCurrentVerse(random);
  };

  return (
    <div className="relative flex flex-col items-center justify-between min-h-screen bg-white text-black px-6 py-8">
      {/* Navbar / User button */}
      <SignedIn>
        {/* <div className="absolute top-4 right-4 flex items-center gap-3">
          <Link
            href="/profile"
            className="text-sm font-medium text-gray-700 hover:text-black underline"
          >
            View Profile
          </Link>
          <UserButton afterSignOutUrl="/" />
        </div> */}
      </SignedIn>

      {/* Main Section */}
      <main className="flex flex-col items-center text-center mt-12 mb-12 max-w-xl">
        <h2 className="text-xl italic mb-2 text-gray-700">Welcome to</h2>
        <h1 className="text-6xl md:text-7xl font-bold tracking-tight mb-6 text-black">beyond</h1>
        <p className="text-gray-600 leading-relaxed mb-12 text-lg md:text-xl">
          Church on a Mission <br />
          Christ at the Centre <br />
          Community at Heart <br />
          Generosity in Action
        </p>

        {/* Random Bible Verse Section */}
        <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 shadow-md w-full">
          <h3 className="text-lg font-semibold mb-2 text-gray-800">📖 Random Bible Verse</h3>
          <p className="text-gray-700 italic mb-4 text-base md:text-lg">"{currentVerse.text}"</p>
          <p className="text-gray-500 mb-4 text-sm md:text-base font-medium">— {currentVerse.reference}</p>
          <button
            onClick={getRandomVerse}
            className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition text-sm md:text-base"
          >
            Show Another Verse
          </button>
        </div>
      </main>

      {/* Social Links */}
      <footer className="flex flex-col items-center gap-6 mb-4">
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

        {/* If not signed in, show button */}
        <SignedOut>
          <div className="mt-4">
            <SignInButton>
              <button className="bg-black text-white px-8 py-3 rounded-full hover:bg-gray-800 transition text-sm md:text-base">
                Get Started
              </button>
            </SignInButton>
          </div>
        </SignedOut>
      </footer>
    </div>
  );
}
