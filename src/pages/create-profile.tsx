import { useUser, SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs";
import { useState } from "react";

export default function CreateProfile() {
  const { user } = useUser();

  // State for form fields
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    bio: "",
    birthDay: "",
    birthMonth: "",
    phoneNumber: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Handle change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Save data to Clerk
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);

    try {
      await user.update({
        unsafeMetadata: {
          profile: {
            firstName: form.firstName,
            lastName: form.lastName,
            bio: form.bio,
            birthDay: form.birthDay,
            birthMonth: form.birthMonth,
            phoneNumber: form.phoneNumber,
            email: user.primaryEmailAddress?.emailAddress,
          },
        },
      });

      setSuccess(true);
    } catch (err) {
      console.error("Error saving profile:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white text-black px-4">
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>

      <SignedIn>
        <div className="max-w-md w-full border p-6 rounded-2xl shadow-lg">
          <h1 className="text-2xl font-semibold mb-4 text-center">Create Your Profile</h1>

          {success ? (
            <p className="text-green-600 text-center font-medium">
              ✅ Profile created successfully!
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={form.firstName}
                onChange={handleChange}
                className="w-full border rounded-md p-2"
                required
              />

              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={form.lastName}
                onChange={handleChange}
                className="w-full border rounded-md p-2"
                required
              />

              <textarea
                name="bio"
                placeholder="Bio"
                value={form.bio}
                onChange={handleChange}
                className="w-full border rounded-md p-2"
              />

              <div className="flex gap-2">
                <input
                  type="number"
                  name="birthDay"
                  placeholder="Day"
                  value={form.birthDay}
                  onChange={handleChange}
                  className="w-1/2 border rounded-md p-2"
                  required
                  min="1"
                  max="31"
                />
                <input
                  type="number"
                  name="birthMonth"
                  placeholder="Month"
                  value={form.birthMonth}
                  onChange={handleChange}
                  className="w-1/2 border rounded-md p-2"
                  required
                  min="1"
                  max="12"
                />
              </div>

              <input
                type="text"
                name="phoneNumber"
                placeholder="Phone Number"
                value={form.phoneNumber}
                onChange={handleChange}
                className="w-full border rounded-md p-2"
                required
              />

              <button
                type="submit"
                className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800"
                disabled={loading}
              >
                {loading ? "Saving..." : "Save Profile"}
              </button>
            </form>
          )}
        </div>
      </SignedIn>
    </div>
  );
}
