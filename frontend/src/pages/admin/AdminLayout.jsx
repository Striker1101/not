import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAppState } from "../../AppStateContext";

export default function AdminLayout({ children }) {
    const location = useLocation();
    const { islogged } = useAppState();
    
    const menuItems = [
        { name: "Overview", path: "/admin", icon: "M13 10V3L4 14h7v7l9-11h-7z" },
        { name: "User Base", path: "/admin/users", icon: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" },
        { name: "Deposits", path: "/admin/deposits", icon: "M9 11l3-3m0 0l3 3m-3-3v8m0-13a9 9 0 110 18 9 9 0 010-18z" },
        { name: "Withdrawals", path: "/admin/withdrawals", icon: "M15 13l-3 3m0 0l-3-3m3 3V8m0 13a9 9 0 110-18 9 9 0 010 18z" },
        { name: "Back to Site", path: "/dashboard", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" },
    ];

    return (
        <div className="min-h-screen bg-[#0b0f19] text-white flex">
            {/* Sidebar */}
            <div className="w-72 bg-[#111827] border-r border-white/5 flex flex-col fixed h-full z-20">
                <div className="p-10 flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-black shadow-lg shadow-blue-600/20">A</div>
                    <div>
                        <h1 className="text-xl font-black tracking-tighter uppercase leading-none">Command</h1>
                        <span className="text-[10px] text-gray-500 font-bold tracking-[0.3em] uppercase">Control Layer</span>
                    </div>
                </div>

                <nav className="flex-1 px-6 space-y-2">
                    {menuItems.map((item) => (
                        <Link 
                            key={item.path} 
                            to={item.path} 
                            className={`flex items-center gap-4 px-6 py-4 rounded-2xl transition-all font-bold text-sm ${
                                location.pathname === item.path 
                                ? "bg-blue-600 text-white shadow-xl shadow-blue-600/20" 
                                : "text-gray-400 hover:text-white hover:bg-white/5"
                            }`}
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon} />
                            </svg>
                            {item.name}
                        </Link>
                    ))}
                </nav>

                <div className="p-8 border-t border-white/5">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-500 font-black">
                            {islogged.user?.name?.charAt(0) || "A"}
                        </div>
                        <div className="truncate">
                            <p className="text-xs font-black truncate">{islogged.user?.name || "Administrator"}</p>
                            <p className="text-[10px] text-gray-500 truncate">{islogged.user?.email}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 ml-72 p-12">
                <div className="max-w-7xl mx-auto space-y-12">
                    {children}
                </div>
            </div>
        </div>
    );
}
