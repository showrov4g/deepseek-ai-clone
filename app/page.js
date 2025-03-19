"use client";
import { assets } from "@/assets/assets";
import Image from "next/image";
import { useState } from "react";


export default function Home() {
  // state variables
  const [expand, setExpend]= useState(false);
  const [messages, setMessages]= useState([]);
  const [isLoading, setIsLoading]= useState(false);


  return (
   <div>
        <div className="flex h-full"> 
            {/* sidebar  */}
            <div>
              <div>
                <Image className="rotate-180" src={assets} />
              </div>
            </div>
        </div>
   </div>
  );
}
