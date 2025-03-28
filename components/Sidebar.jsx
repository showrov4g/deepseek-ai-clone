"use client";
import { assets } from "@/assets/assets";
import Image from "next/image";
import React, { useState } from "react";
import { useClerk, UserButton } from "@clerk/nextjs";
import { useAppContext } from "@/context/AppContext";
import ChatLable from "./ChatLable";

const Sidebar = ({ expand, setExpand }) => {
  const { openSignIn } = useClerk();
  const {user} = useAppContext();
  // state variable 
  const [openMenu, setOpenMenu] = useState({id:0, open:false})

  return (
    <div
      className={`flex flex-col items-center bg-[#212327] pt-7 transition-all z-50 max-md:absolute max-md:h-screen ${
        expand ? "p-4 w-64" : "w-0 md:w-20 max-md:overflow-hidden"
      } h-full overflow-visible`}
    >
      {/* Top Section */}
      <div className="flex flex-col flex-grow w-full">
        <div>
          {/* Sidebar Toggle Button */}
          <div
            onClick={() => setExpand(!expand)}
            className={`flex ${expand ? "flex-row gap-10" : "flex-col items-center gap-8"}`}
          >
            <Image
              className={`${expand ? "w-32" : "w-10"}`}
              src={expand ? assets.logo_text : assets.logo_icon}
              alt="Logo"
            />
            <div className="group relative flex items-center justify-center hover:bg-gray-500/20 transition-all duration-300 h-9 w-9 aspect-square rounded-lg cursor-pointer">
              <Image src={assets.menu_icon} alt="Menu" className="md:hidden" />
              <Image
                src={expand ? assets.sidebar_close_icon : assets.sidebar_icon}
                alt="Toggle"
                className="hidden md:block w-7"
              />
            </div>
          </div>

          {/* New Chat Button */}
          <button
            className={`mt-8 flex items-center justify-center cursor-pointer ${
              expand
                ? "bg-primary hover:opacity-90 rounded-2xl gap-2 p-2.5 w-max"
                : "group relative h-9 w-9 mx-auto hover:bg-gray-500/30 rounded-lg"
            }`}
          >
            <Image className={expand ? "w-6" : "w-7"} src={expand ? assets.chat_icon : assets.chat_icon_dull} alt="Chat" />
            {expand && <p className="text-white text font-medium">New Chat</p>}
          </button>

          {/* Recent Chats */}
          <div className={`mt-8 text-white/25 text-sm ${expand ? "block" : "hidden"}`}>
            <p className="my-1">Recents</p>
            <ChatLable openMenu={openMenu} setOpenMenu={setOpenMenu} />
          </div>
        </div>
      </div>

      {/* App Download Section (Fixed at Bottom) */}
      <div className="mt-auto relative w-full">
        <div
          className={`flex items-center cursor-pointer group relative ${
            expand
              ? "gap-1 text-white/80 text-sm p-2.5 border border-primary rounded-lg hover:bg-white/10"
              : "h-10 w-10 mx-auto hover:bg-gray-500/30 rounded-lg"
          }`}
        >
          <Image className={expand ? "w-5" : "w-6.5 mx-auto"} src={expand ? assets.phone_icon : assets.phone_icon_dull} alt="App" />

          {/* QR Code Hover (Fixed to Stay Inside Sidebar) */}
          <div
            className="absolute -top-48 right-0 w-max p-3 bg-black text-white text-sm rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none"
          >
            <Image className="w-44" src={assets.qrcode} alt="QR Code" />
            <p className="text-center mt-2">Scan to get the app</p>
            
            {/* Tooltip Arrow */}
            <div className="absolute w-3 h-3 bg-black rotate-45 right-4 -bottom-1.5"></div>
          </div>

          {expand && (
            <>
              <span>Get APP</span>
              <Image alt="New" src={assets.new_icon} />
            </>
          )}
        </div>
          {/* ------------------- */}
          <div onClick={user ? null:openSignIn} className={`flex items-center ${expand ? "hover:bg-white/10 rounded-lg ": "justify-center w-full"} gap-3 `}>
          {
            user ? <UserButton /> :  <Image src={assets.profile_icon} className="w-7" alt=""/>
          }
           
            {
              expand && <span>My Profile</span> 
            }
          </div>

      </div>
    </div>
  );
};

export default Sidebar;
