"use client";

import { useState, useRef } from "react";
import {
  Heart,
  Share2,
  Image as ImageIcon,
  Send,
  Lock,
  Unlock,
  Volume,
  VolumeX,
  Play,
  Pause,
  Maximize2,
  Edit,
  Check,
  X,
  RotateCcw,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Post {
  id: number;
  title: string;
  content: string;
  media: string[];
  likes: number;
  timestamp: string;
}

const ADMIN_PIN = "0101";

export default function ConstructionProgress() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  const restartVideo = () => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = 0;
    videoRef.current.play();
    setIsPlaying(true);
  };

  const toggleFullScreen = () => {
    if (!videoRef.current) return;
    if (document.fullscreenElement) document.exitFullscreen();
    else videoRef.current.requestFullscreen();
  };

  const [isAdmin, setIsAdmin] = useState(false);
  const [showPinPrompt, setShowPinPrompt] = useState(false);
  const [pinInput, setPinInput] = useState("");

  const [editingPostId, setEditingPostId] = useState<number | null>(null);
  const [newPost, setNewPost] = useState({ title: "", content: "", media: [] as string[] });

  const posts: Post[] = [
    {
      id: 1,
      title: "",
      content: "",
      media: [
      "/batch2/1.jpeg",
      "/batch2/2.jpeg",
      "/batch2/3.jpeg",
      "/batch2/4.jpeg",
      "/batch2/5.MOV",
      "/batch2/6.jpeg",
      "/batch2/7.jpeg",
      "/batch2/8.jpeg",
      "/batch2/9.jpeg",
      "/batch2/10.jpeg",
      "/batch2/11.jpg",
      "/batch2/12.jpg",
      ],
      likes: 45,
      timestamp: "2 weeks ago",
    },
    {
      id: 2,
      title: "",
      content: "",
      media: [
      "/batch1/1.jpg",
      "/batch1/2.jpg",
      "/batch1/3.jpg",
      "/batch1/4.jpg",
      "/batch1/5.jpg",
      "/batch1/6.jpg",
      "/batch1/7.mp4",
      "/batch1/8.jpg",
      "/batch1/9.jpg",
      "/batch1/10.jpg",
      ],
      likes: 60,
      timestamp: "1 week ago",
    },
  ];

  const handleAdminLogin = () => {
    if (pinInput === ADMIN_PIN) {
      setIsAdmin(true);
      setShowPinPrompt(false);
      setPinInput("");
    } else alert("Incorrect PIN");
  };

  const handleLike = (id: number) => {
    const postIndex = posts.findIndex((p) => p.id === id);
    if (postIndex === -1) return;
    posts[postIndex].likes += 1;
  };

  const handleMediaUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    const urls = Array.from(files).map((f) => URL.createObjectURL(f));
    setNewPost({ ...newPost, media: [...newPost.media, ...urls] });
  };

  const handleAddPost = () => {
    if (!newPost.title.trim() && !newPost.content.trim()) return;
    const newEntry: Post = {
      id: Date.now(),
      title: newPost.title,
      content: newPost.content,
      media: newPost.media,
      likes: 0,
      timestamp: "Just now",
    };
    posts.unshift(newEntry);
    setNewPost({ title: "", content: "", media: [] });
  };

  return (
    <div className="bg-gray-50 min-h-screen px-4 sm:px-8 py-8">
      {/* HEADER */}
      <div className="text-center mb-10 relative">
        <h1 className="text-5xl sm:text-6xl font-bold mb-2" style={{ fontFamily: "MyFont2" }}>
          Community
        </h1>
        <p className="text-gray-600 text-sm sm:text-base">Stay on #ThePulse of what is happening in the life of Beyond!</p>

        {!isAdmin ? (
          <button
            className="absolute right-0 top-0 mt-2 mr-2 p-2 hover:bg-gray-200 rounded-full transition"
            onClick={() => setShowPinPrompt(true)}
          >
            <Lock className="w-6 h-6 text-black" />
          </button>
        ) : (
          <div className="absolute right-0 top-0 mt-2 mr-2 p-2 flex items-center gap-1 bg-green-100 px-2 rounded-full">
            <Unlock className="w-5 h-5 text-green-600" />
            <span className="text-green-600 text-sm font-semibold">Admin</span>
          </div>
        )}
      </div>

      {showPinPrompt && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-2xl shadow-lg w-80">
            <h2 className="text-lg font-bold mb-4">Enter Admin PIN</h2>
            <input
              type="password"
              value={pinInput}
              onChange={(e) => setPinInput(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2 mb-4 outline-none"
              placeholder="PIN"
            />
            <div className="flex justify-end gap-3">
              <button
                className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
                onClick={() => setShowPinPrompt(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                onClick={handleAdminLogin}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FEATURED VIDEO */}
      <div className="max-w-4xl mx-auto mb-12 relative rounded-xl overflow-hidden shadow-lg">
        <video
          ref={videoRef}
          src="/video.mp4"
          className="w-full h-[320px] sm:h-[400px] object-cover bg-black rounded-xl"
          muted={isMuted}
        />
        <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-60 flex justify-center items-center gap-6 py-2 rounded-b-xl">
          <button onClick={togglePlay} className="text-white">
            {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
          </button>
          <button onClick={restartVideo} className="text-white">
            <RotateCcw className="w-6 h-6" />
          </button>
          <button onClick={toggleMute} className="text-white">
            {isMuted ? <VolumeX className="w-6 h-6" /> : <Volume className="w-6 h-6" />}
          </button>
          <button onClick={toggleFullScreen} className="text-white">
            <Maximize2 className="w-6 h-6" />
          </button>
        </div>
      </div>

      <h2 className="text-xl font-bold">Beyond On Stanley Loading...</h2>
      <br></br>

      {/* POSTS FEED */}
      <div className="max-w-4xl mx-auto flex flex-col gap-10">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-white border border-gray-200 rounded-2xl p-6 shadow-md"
          >
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-xl font-bold">{post.title}</h2>
              {isAdmin && (
                <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-blue-600">
                  <Edit className="w-4 h-4" /> Edit
                </button>
              )}
            </div>
            <p className="text-gray-500 text-sm mb-3">{post.timestamp}</p>
            <p className="text-gray-700 mb-4">{post.content}</p>

            <div className="flex overflow-x-auto gap-4 pb-2 scroll-smooth snap-x snap-mandatory">
              {post.media.map((m, i) =>
                m.endsWith(".mp4") ? (
                  <video
                    key={i}
                    src={m}
                    className="w-64 h-40 object-cover rounded-lg border border-gray-300 snap-center"
                    controls
                  />
                ) : (
                  <img
                    key={i}
                    src={m}
                    alt={post.title}
                    className="w-64 h-40 object-cover rounded-lg border border-gray-300 snap-center"
                  />
                )
              )}
            </div>

            <div className="flex gap-6 mt-4 text-gray-600">
              <motion.button
                whileTap={{ scale: 1.4 }}
                onClick={() => handleLike(post.id)}
                className="flex items-center gap-2 hover:text-pink-600 transition"
              >
                <AnimatePresence>
                  <motion.div
                    key={post.likes}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Heart className="w-5 h-5 text-red-500 fill-red-500" />
                  </motion.div>
                </AnimatePresence>
                {post.likes}
              </motion.button>

              <button className="flex items-center gap-2 hover:text-blue-600 transition">
                <Share2 className="w-5 h-5" /> Share
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
