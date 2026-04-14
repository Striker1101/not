import React, { useState, useEffect } from "react";
import GradientDiv from "./GradientDiv";

const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color1 = "#";
  let color2 = "#";
  for (let i = 0; i < 6; i++) {
    color1 += letters[Math.floor(Math.random() * 16)];
    color2 += letters[Math.floor(Math.random() * 16)];
  }
  return { color1, color2 };
};

const StyledCard = ({ data, card_holder }) => {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="group relative w-full max-w-[300px] rounded-[2.5rem] bg-[#1a1c23] border border-white/5 p-5 transition-all duration-500 hover:scale-[1.02] hover:border-blue-500/30 hover:shadow-2xl hover:shadow-blue-500/20 overflow-hidden cursor-pointer">
      {/* Decorative Glow */}
      <div className="absolute -top-20 -right-20 w-48 h-48 bg-blue-600/10 rounded-full blur-[90px] group-hover:bg-blue-600/20 transition-all duration-500"></div>
      
      {/* Media Container */}
      <div className="relative w-full aspect-square rounded-[2rem] overflow-hidden shadow-2xl mb-6 bg-gray-800/50">
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10 pointer-events-none"></div>
        
        {imgError || !data.content ? (
          <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-gradient-to-br from-gray-800 to-gray-900 text-gray-600">
             <svg className="w-16 h-16 mb-2 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
             <span className="text-[10px] font-black uppercase tracking-widest opacity-40">Media Unavailable</span>
          </div>
        ) : data.type === "image" ? (
          <img 
            src={data.content} 
            onError={() => setImgError(true)}
            className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110" 
            alt={data.collection_name} 
          />
        ) : (
          <video
            src={data.content}
            autoPlay loop muted playsInline
            className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
          ></video>
        )}
        
        {/* Category Badge */}
        <div className="absolute top-5 left-5 z-20">
          <span className="px-4 py-1.5 bg-blue-600/80 backdrop-blur-xl rounded-full text-[10px] font-black uppercase tracking-widest text-white shadow-lg shadow-blue-600/20 border border-white/10">
            {data.category || "GENERAL"}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-5 px-1">
        <div>
          <h3 className="text-xl font-black text-white truncate uppercase tracking-tight group-hover:text-blue-400 transition-colors">
            {data.collection_name || "NEXUS ORIGIN"}
          </h3>
          <div className="flex items-center gap-2 mt-1.5">
            <span className="text-[10px] font-black text-gray-500 uppercase tracking-wider">BY</span>
            <span className="text-xs font-black text-blue-500 uppercase tracking-widest truncate">{data.creator}</span>
          </div>
        </div>

        {/* Pricing Area */}
        <div className="flex items-center justify-between p-4 bg-white/[0.03] rounded-2xl border border-white/5 group-hover:border-blue-500/30 transition-all duration-300">
          <div className="flex flex-col gap-0.5">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">{card_holder || "HIGHEST BID"}</span>
            <div className="flex items-baseline gap-1">
               <span className="text-lg font-black text-white">{data.price}</span>
               <span className="text-[10px] font-black text-blue-500 uppercase">ETH</span>
            </div>
          </div>
          
          <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white shadow-xl shadow-blue-600/30 group-hover:scale-110 transition-all duration-300">
             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3" />
             </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StyledCard;
