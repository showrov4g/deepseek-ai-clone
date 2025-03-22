import { assets } from "@/assets/assets";
import Image from "next/image";
import React, { useState } from "react";

const PromptBox = ({ setIsLoading, isLoading }) => {
  const [prompt, setPrompt] = useState("");

  return (
    <div className="w-full flex justify-center mt-4">
      <form
        className="w-full max-w-xl bg-[#404045] p-3 rounded-2xl shadow-lg border border-gray-600"
      >
        <textarea
          rows={2}
          placeholder="Message DeepSeek"
          required
          className="w-full bg-transparent text-white outline-none resize-none p-2 text-sm"
          onChange={(e) => setPrompt(e.target.value)}
          value={prompt}
        ></textarea>
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 text-xs text-gray-300 bg-gray-700 px-3 py-1 rounded-full hover:bg-gray-600 transition">
              <Image className="h-4 w-4" src={assets.deepthink_icon} alt="" />
              DeepThink (R1)
            </button>
            <button className="flex items-center gap-2 text-xs text-gray-300 bg-gray-700 px-3 py-1 rounded-full hover:bg-gray-600 transition">
              <Image className="h-4 w-4" src={assets.search_icon} alt="" />
              Search
            </button>
          </div>
          <div className="flex items-center gap-2">
            <Image
              className="w-4 cursor-pointer opacity-80 hover:opacity-100"
              src={assets.pin_icon}
              alt="Pin"
            />
            <button className={`${prompt ? "bg-blue-500" : "bg-gray-600"} rounded-full p-3 flex items-center justify-center transition-all hover:opacity-90`}
              disabled={!prompt}
            >
              <Image
                className="w-4 h-4"
                src={prompt ? assets.arrow_icon : assets.arrow_icon_dull}
                alt="Send"
              />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PromptBox;
