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
  RotateCcw,
  Maximize2,
} from "lucide-react";

interface Post {
  id: number;
  title: string;
  content: string;
  images: string[];
  likes: number;
  timestamp: string;
}

const ADMIN_PIN = "1234"; // Example PIN

export default function ConstructionProgress() {
  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      title: "Foundation Completed 🚧",
      content:
        "The foundation for the new church building has been successfully completed! Next step: walls and structure assembly. God is good 🙏",
      images: ["/cls.jpg"],
      likes: 32,
      timestamp: "2 days ago",
    },
    {
      id: 2,
      title: "Groundbreaking Ceremony 🎉",
      content:
        "A beautiful start to our journey! Thank you to everyone who came and prayed over the land.",
      images: ["/cms.jpg"],
      likes: 58,
      timestamp: "1 week ago",
    },
  ]);

  const [newPost, setNewPost] = useState({
    title: "",
    content: "",
    images: [] as string[],
  });

  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [isAdmin, setIsAdmin] = useState(false);
  const [showPinPrompt, setShowPinPrompt] = useState(false);
  const [pinInput, setPinInput] = useState("");

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
  const toggleMute = () => setIsMuted((prev) => !prev);
  const rewind10 = () => {
    if (videoRef.current) videoRef.current.currentTime = Math.max(videoRef.current.currentTime - 10, 0);
  };
  const toggleFullScreen = () => {
    if (!videoRef.current) return;
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      videoRef.current.requestFullscreen();
    }
  };

  // POST FUNCTIONS
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const imageUrls = Array.from(files).map((file) => URL.createObjectURL(file));
      setNewPost({ ...newPost, images: [...newPost.images, ...imageUrls] });
    }
  };

  const handleAddPost = () => {
    if (!newPost.title.trim() && !newPost.content.trim()) return;
    const newEntry: Post = {
      id: Date.now(),
      title: newPost.title,
      content: newPost.content,
      images: newPost.images,
      likes: 0,
      timestamp: "Just now",
    };
    setPosts([newEntry, ...posts]);
    setNewPost({ title: "", content: "", images: [] });
  };

  const handleLike = (id: number) => {
    setPosts(posts.map((p) => (p.id === id ? { ...p, likes: p.likes + 1 } : p)));
  };

  const handleAdminLogin = () => {
    if (pinInput === ADMIN_PIN) {
      setIsAdmin(true);
      setShowPinPrompt(false);
      setPinInput("");
    } else {
      alert("Incorrect PIN");
    }
  };

  return (
    <div className="bg-white text-black min-h-screen px-4 sm:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col items-center mb-8 text-center relative">
        <h1 className="text-3xl font-bold mb-1">Follow Construction Progress</h1>
        <p className="text-gray-600 text-sm">Stay updated on the building of our new church 🙌</p>
        {!isAdmin && (
          <button
            className="absolute right-0 top-0 mt-2 mr-2 p-2 hover:bg-gray-200 rounded-full transition"
            onClick={() => setShowPinPrompt(true)}
          >
            <Lock className="w-6 h-6 text-black" />
          </button>
        )}
        {isAdmin && (
          <div className="absolute right-0 top-0 mt-2 mr-2 p-2 flex items-center gap-1 bg-green-100 px-2 rounded-full">
            <Unlock className="w-5 h-5 text-green-600" />
            <span className="text-green-600 text-sm font-semibold">Admin</span>
          </div>
        )}
      </div>

      {/* PIN Modal */}
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
              <button className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300" onClick={() => setShowPinPrompt(false)}>Cancel</button>
              <button className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700" onClick={handleAdminLogin}>Submit</button>
            </div>
          </div>
        </div>
      )}

      {/* Video Section */}
      <div className="relative mb-8 max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-lg border border-gray-200">
        <video ref={videoRef} src="/video.mp4" className="w-full" autoPlay loop muted={isMuted} />
        <div className="absolute bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md flex items-center justify-between px-4 py-2 rounded-b-2xl">
          <div className="flex items-center gap-3">
            <button onClick={togglePlay} className="p-2 hover:bg-gray-200 rounded-full transition">{isPlaying ? <Pause className="w-5 h-5 text-black" /> : <Play className="w-5 h-5 text-black" />}</button>
            <button onClick={rewind10} className="p-2 hover:bg-gray-200 rounded-full transition"><RotateCcw className="w-5 h-5 text-black" /></button>
            <button onClick={toggleMute} className="p-2 hover:bg-gray-200 rounded-full transition">{isMuted ? <VolumeX className="w-5 h-5 text-black" /> : <Volume className="w-5 h-5 text-black" />}</button>
          </div>
          <button onClick={toggleFullScreen} className="p-2 hover:bg-gray-200 rounded-full transition"><Maximize2 className="w-5 h-5 text-black" /></button>
        </div>
      </div>

      {/* Admin Post Creator */}
      {isAdmin && (
        <div className="bg-gray-50 border border-gray-300 rounded-2xl p-5 mb-12 shadow-md max-w-4xl mx-auto">
          <h2 className="text-xl font-bold mb-4">Create New Post</h2>
          <input
            type="text"
            placeholder="Post title..."
            value={newPost.title}
            onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
            className="w-full bg-transparent border-b border-gray-300 focus:border-blue-500 outline-none pb-2 text-black text-lg font-semibold mb-3"
          />
          <textarea
            placeholder="What's happening on site?"
            value={newPost.content}
            onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
            className="w-full bg-transparent text-black outline-none resize-none min-h-[80px]"
          />
          {newPost.images.length > 0 && (
            <div className="flex gap-3 flex-wrap mt-3">{newPost.images.map((img,i)=><img key={i} src={img} alt="preview" className="w-24 h-24 rounded-lg object-cover border border-gray-300" />)}</div>
          )}
          <div className="flex justify-between items-center mt-4">
            <label className="flex items-center gap-2 cursor-pointer text-gray-500 hover:text-black">
              <ImageIcon className="w-5 h-5" />
              <span className="text-sm">Add Images</span>
              <input type="file" multiple accept="image/*" className="hidden" onChange={handleImageUpload} />
            </label>
            <button onClick={handleAddPost} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-xl font-semibold text-sm transition">
              <Send className="w-4 h-4" /> Post Update
            </button>
          </div>
        </div>
      )}

      {/* Timeline Feed */}
      <div className="relative max-w-4xl mx-auto">
        <div className="absolute left-5 top-0 bottom-0 w-1 bg-gray-300 rounded-full"></div>
        {posts.map((post) => (
          <div key={post.id} className="flex items-start gap-6 mb-10 relative">
            <div className="z-10 relative"><div className="w-4 h-4 rounded-full bg-blue-600 mt-1"></div></div>
            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5 shadow-md w-full ml-4">
              <h2 className="text-lg font-bold mb-1">{post.title}</h2>
              <p className="text-gray-500 text-sm mb-3">{post.timestamp}</p>
              <p className="text-gray-700 mb-4">{post.content}</p>
              {post.images.length > 0 && <div className="flex gap-3 flex-wrap mb-3">{post.images.map((img,i)=><img key={i} src={img} alt={post.title} className="w-full sm:w-48 rounded-lg object-cover border border-gray-300" />)}</div>}
              <div className="flex gap-6 mt-2 text-gray-600">
                <button className="flex items-center gap-2 hover:text-pink-600 transition" onClick={()=>handleLike(post.id)}><Heart className="w-5 h-5" /> {post.likes}</button>
                <button className="flex items-center gap-2 hover:text-blue-600 transition"><Share2 className="w-5 h-5" /> Share</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
