import { useUser, SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs";
import { FaUserCircle } from "react-icons/fa";
import Link from "next/link";

interface Profile {
  firstName?: string;
  lastName?: string;
  bio?: string;
  birthDay?: string | number;
  birthMonth?: string | number;
  email?: string;
  phoneNumber?: string;
}

export default function ProfilePage() {
  const { user } = useUser();
  const profile: Profile | undefined = user?.unsafeMetadata?.profile as Profile | undefined;

  return (
    <div className="flex items-center justify-center min-h-screen bg-white text-black px-4 py-8">
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>

      <SignedIn>
        <div className="w-full max-w-xs bg-white flex flex-col items-center p-6 rounded-3xl shadow-md border border-gray-200">
          {/* Header */}
          <h1 className="text-6xl font-extrabold mb-6 text-center font-serif" style={{ fontFamily: "MyFont2" }}>
            My Profile
          </h1>

          {/* Avatar */}
          <div className="text-gray-400 mb-6">
            <FaUserCircle className="text-[100px]" />
          </div>

          {/* Input-like display fields */}
          {profile ? (
            <div className="w-full space-y-4">
              <div className="border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-700">
                {profile.firstName || ""} {profile.lastName || ""}
              </div>
              <div className="border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-700 min-h-[60px]">
                {profile.bio || "No bio added"}
              </div>
              <div className="border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-700">
                {profile.birthDay && profile.birthMonth
                  ? `${profile.birthDay}/${profile.birthMonth}`
                  : "Birthday not added"}
              </div>
              <div className="border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-700">
                {profile.email || "No email added"}
              </div>
              <div className="border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-700">
                {profile.phoneNumber || "No number added"}
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-600 mb-4">
              You haven’t created your profile yet.{" "}
              <Link href="/create-profile" className="text-blue-600 hover:underline">
                Create one now →
              </Link>
            </div>
          )}

          {/* Footer text */}
          <p className="text-[11px] text-gray-500 text-center mt-6 italic">
            *Profile information will only be visible to Beyond admins
          </p>

          {/* Buttons */}
          <div className="flex justify-between w-full mt-8 text-sm">
            <Link href="/home" className="text-gray-600 hover:text-black underline">
              ← Back
            </Link>
            <Link
              href="/create-profile"
              className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition"
            >
              Edit
            </Link>
          </div>
        </div>
      </SignedIn>
    </div>
  );
}
