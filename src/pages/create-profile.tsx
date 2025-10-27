"use client";

import { useState } from "react";
import { useUser } from "@clerk/nextjs";

export default function CreateProfile() {
const { user } = useUser();
const [form, setForm] = useState({
firstName: "",
lastName: "",
bio: "",
birthDay: "",
birthMonth: "",
phoneNumber: "",
});

const [profileImage, setProfileImage] = useState<File | null>(null);
const [success, setSuccess] = useState(false);
const [isSubmitting, setIsSubmitting] = useState(false);

// Handle form input changes
const handleChange = (
e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
) => {
setForm({ ...form, [e.target.name]: e.target.value });
};

// Handle image selection
const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
if (e.target.files && e.target.files[0]) {
setProfileImage(e.target.files[0]);
}
};

// Handle form submission
const handleSubmit = async (e: React.FormEvent) => {
e.preventDefault();
if (!user) return;


try {
  setIsSubmitting(true);

  // Upload profile image to Clerk
  if (profileImage) {
    await user.setProfileImage({ file: profileImage });
  }

  // Save profile metadata in Clerk
  await user.update({
    unsafeMetadata: {
      profile: form,
    },
  });

  setSuccess(true);
} catch (error) {
  console.error("Error saving profile:", error);
  alert("There was an issue saving your profile. Please try again.");
} finally {
  setIsSubmitting(false);
}

};

return ( <div className="flex justify-center items-center min-h-screen bg-white text-black px-4"> <div className="max-w-md w-full border p-6 rounded-2xl shadow-lg"> <h1 className="text-2xl font-semibold mb-4 text-center">
Create Your Profile </h1>
    {success ? (
      <p className="text-green-600 text-center font-medium">
        ✅ Profile created successfully!
      </p>
    ) : (
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Profile Image Upload */}
        <div className="flex flex-col items-center mb-2">
          <label className="w-32 h-32 border rounded-full overflow-hidden cursor-pointer flex items-center justify-center bg-gray-100">
            {profileImage ? (
              <img
                src={URL.createObjectURL(profileImage)}
                alt="Profile Preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-gray-400 text-sm">Upload Photo</span>
            )}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </label>
        </div>

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
          className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 disabled:opacity-60"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Saving..." : "Save Profile"}
        </button>
      </form>
    )}
  </div>
</div>

);
}
