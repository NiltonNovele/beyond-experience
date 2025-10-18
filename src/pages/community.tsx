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
  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      title: "🎉",
      content: "",
      media: [
        "/images/img-1.jpg",
        "/images/img-2.jpg",
        "/images/img-3.mp4",
        "/images/img-4.jpg",
        "/images/img-17.jpg",
        "/images/img-18.jpg",
      ],
      likes: 45,
      timestamp: "2 weeks ago",
    },
    {
      id: 2,
      title: "🚧",
      content: "",
      media: [
        "/images/img-5.jpg",
        "/images/img-6.mp4",
        "/images/img-7.jpg",
        "/images/img-8.jpg",
        "/images/img-19.jpg",
        "/images/img-20.jpg",
      ],
      likes: 60,
      timestamp: "1 week ago",
    },
    {
      id: 3,
      title: "🧱",
      content: "",
      media: [
        "/images/img-9.jpg",
        "/images/img-10.jpg",
        "/images/img-11.jpg",
        "/images/img-12.jpg",
        "/images/img-21.jpg",
      ],
      likes: 74,
      timestamp: "3 days ago",
    },
    {
      id: 4,
      title: "🏗️",
      content: "",
      media: [
        "/images/img-13.jpg",
        "/images/img-14.jpg",
        "/images/img-15.jpg",
        "/images/img-16.jpg",
        "/images/img-22.jpg",
      ],
      likes: 102,
      timestamp: "Today",
    },
  ]);

  const [newPost, setNewPost] = useState({
    title: "",
    content: "",
    media: [] as string[],
  });

  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [isAdmin, setIsAdmin] = useState(false);
  const [showPinPrompt, setShowPinPrompt] = useState(false);
  const [pinInput, setPinInput] = useState("");

  const [editingPostId, setEditingPostId] = useState<number | null>(null);

  // VIDEO CONTROLS
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

  // ADMIN LOGIN
  const handleAdminLogin = () => {
    if (pinInput === ADMIN_PIN) {
      setIsAdmin(true);
      setShowPinPrompt(false);
      setPinInput("");
    } else alert("Incorrect PIN");
  };

  // POST ACTIONS
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
    setPosts([newEntry, ...posts]);
    setNewPost({ title: "", content: "", media: [] });
  };

  const handleLike = (id: number) => {
    setPosts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, likes: p.likes + 1 } : p))
    );
  };

  const handleEditPost = (id: number) => {
    const post = posts.find((p) => p.id === id);
    if (!post) return;
    setNewPost({ title: post.title, content: post.content, media: post.media });
    setEditingPostId(id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSaveEdit = () => {
    if (!editingPostId) return;
    setPosts((prev) =>
      prev.map((p) =>
        p.id === editingPostId
          ? { ...p, title: newPost.title, content: newPost.content, media: newPost.media }
          : p
      )
    );
    setEditingPostId(null);
    setNewPost({ title: "", content: "", media: [] });
  };

  return (
    <div className="bg-white text-black min-h-screen px-4 sm:px-8 py-8">
      {/* HEADER */}
      <div className="flex flex-col items-center mb-8 text-center relative">
        <h1 className="text-6xl font-bold mb-1" style={{ fontFamily: "MyFont2" }}>
          Community
        </h1>
        <p className="text-gray-600 text-sm">Stay updated on construction progress!</p>

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

      {/* PIN MODAL */}
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

      {/* FEATURED VIDEO PLAYER */}
      <div className="max-w-4xl mx-auto mb-12 relative rounded-xl overflow-hidden shadow-lg">
        <video
          ref={videoRef}
          src="/video.mp4"
          className="w-full h-[300px] object-cover bg-black"
          muted={isMuted}
        />
        {/* VIDEO FOOTER CONTROLS */}
        <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-60 flex justify-center items-center gap-6 py-2">
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

      {/* ADMIN CREATE/EDIT */}
      {isAdmin && (
        <div className="bg-gray-50 border border-gray-300 rounded-2xl p-5 mb-12 shadow-md max-w-4xl mx-auto">
          <h2 className="text-xl font-bold mb-4">
            {editingPostId ? "Edit Post" : "Create New Post"}
          </h2>
          <input
            type="text"
            placeholder="Post title..."
            value={newPost.title}
            onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
            className="w-full bg-transparent border-b border-gray-300 focus:border-blue-500 outline-none pb-2 text-black text-lg font-semibold mb-3"
          />
          <textarea
            placeholder="What's happening?"
            value={newPost.content}
            onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
            className="w-full bg-transparent text-black outline-none resize-none min-h-[80px]"
          />
          {newPost.media.length > 0 && (
            <div className="flex gap-3 flex-wrap mt-3">
              {newPost.media.map((m, i) =>
                m.endsWith(".mp4") ? (
                  <video
                    key={i}
                    src={m}
                    className="w-24 h-24 object-cover rounded-lg border border-gray-300"
                    controls
                  />
                ) : (
                  <img
                    key={i}
                    src={m}
                    alt="preview"
                    className="w-24 h-24 object-cover rounded-lg border border-gray-300"
                  />
                )
              )}
            </div>
          )}
          <div className="flex justify-between items-center mt-4">
            <label className="flex items-center gap-2 cursor-pointer text-gray-500 hover:text-black">
              <ImageIcon className="w-5 h-5" />
              <span className="text-sm">Add Media</span>
              <input
                type="file"
                multiple
                accept="image/*,video/*"
                className="hidden"
                onChange={handleMediaUpload}
              />
            </label>
            {editingPostId ? (
              <div className="flex gap-3">
                <button
                  onClick={handleSaveEdit}
                  className="flex items-center gap-2 bg-green-600 hover:bg-green-700 px-5 py-2 rounded-xl font-semibold text-sm text-white"
                >
                  <Check className="w-4 h-4" /> Save
                </button>
                <button
                  onClick={() => {
                    setEditingPostId(null);
                    setNewPost({ title: "", content: "", media: [] });
                  }}
                  className="flex items-center gap-2 bg-gray-300 hover:bg-gray-400 px-5 py-2 rounded-xl font-semibold text-sm"
                >
                  <X className="w-4 h-4" /> Cancel
                </button>
              </div>
            ) : (
              <button
                onClick={handleAddPost}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-xl font-semibold text-sm text-white"
              >
                <Send className="w-4 h-4" /> Post Update
              </button>
            )}
          </div>
        </div>
      )}

      {/* POSTS FEED */}
      <div className="max-w-4xl mx-auto">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-gray-50 border border-gray-200 rounded-2xl p-5 shadow-md mb-10"
          >
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-bold">{post.title}</h2>
              {isAdmin && (
                <button
                  onClick={() => handleEditPost(post.id)}
                  className="flex items-center gap-1 text-sm text-gray-500 hover:text-blue-600"
                >
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
