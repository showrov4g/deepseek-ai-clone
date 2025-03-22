import { assets } from "@/assets/assets";
import Image from "next/image";
import React from "react";

const PromptBox = () => {
  return (
    <div>
      <form
        action=""
        className={`w-full ${
          false ? "max-w-3xl" : "max-w-2xl"
        }bg-[#404045] p-4 rounded-3xl mt-4 transition-all`}
      >
        <textarea
          name=""
          id=""
          rows={2}
          placeholder="Message DeepSeek"
          required
          className="outline-none w-full bg-transparent text-white overflow-hidden break-words resize-none"
        ></textarea>
        <div>
          <div>
            <p className="flex items-center gap-2 text-xs border-gray-300/40 px-2 py-1 rounded-full cursor-pointer hover:bg-gray-500/20 transition ">
              <Image className="h-5" src={assets.deepthink_icon} alt="" />
              DeepThink (R1)
            </p>
            <p className="flex items-center gap-2 text-xs border-gray-300/40 px-2 py-1 rounded-full cursor-pointer hover:bg-gray-500/20 transition ">
              <Image className="h-5" src={assets.deepthink_icon} alt="" />
              DeepThink (R1)
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PromptBox;
