"use client";
import { assets } from "@/assets/assets";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  // state variables
  const [expand, setExpend] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div>
      <div className="flex h-full">
        {/* sidebar  */}
        <div className="flex-1 flex flex-col items-center justify-center px-4 pb-8  bg-[#292a2d] text-white relative">
          <div className="md:hidden absolute top-6 px-4 flex items-center justify-between w-full">
            <Image
              onClick={() => (expand ? setExpend(false) : setExpend(true))}
              className="rotate-180"
              src={assets.menu_icon}
              alt=""
            />
            <Image className="opacity-70" src={assets.chat_icon} alt="" />
          </div>
          {messages.length === 0 ? (
            <>
              <div>
                <Image  src={assets.logo_icon} alt="" className="h-16" />
                <p className="text-2xl font-medium">Hi, i am DeepSeek</p>
              </div>
              <p className="text-sm mt-2">How can i help you today</p>
            </>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </div>
  );
}
