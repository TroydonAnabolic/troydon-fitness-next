"use client";
import React, { useEffect, useRef, useState } from "react";
import ListItem from "./ListItem";
import Image from "next/image";
import SignupModal from "./Modals/SignupModal";
import { useSession } from "next-auth/react";
import { BlogPost } from "@/types";

interface PostsProps {
  posts: BlogPost[]; // Define the prop for posts
}

const Posts: React.FC<PostsProps> = ({ posts }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const { data: session } = useSession();

  const filteredPosts = posts.filter((post) =>
    post.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const modalRef = useRef<HTMLDialogElement | null>(null);

  const openModal = () => {
    if (modalRef.current) {
      modalRef.current.showModal();
    }
  };

  useEffect(() => {
    if (!session) {
      if (modalRef.current) {
        modalRef.current.showModal();
      }
    }
  }, [session]);

  return (
    <div>
      <div className="mb-10 w-full">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search Posts"
          className="border border-gray-300 p-2 rounded"
        />
      </div>
      <div className="flex flex-col md:flex-row gap-12">
        <div className="max-h-[500px] overflow-y-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 no-scrollbar relative">
          {filteredPosts.map((post) => (
            <ListItem key={post.id} post={post} session={session} />
          ))}
          <SignupModal closeModal={openModal} modalRef={modalRef} />
        </div>

        <div className="md:w-1/2 m-12 relative">
          <Image
            src="/gym-black-and-white.jpg"
            alt="Gym Image"
            width={800}
            height={500}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Posts;
