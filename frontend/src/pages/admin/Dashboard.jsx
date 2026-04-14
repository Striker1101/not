import React, { useEffect, useState } from "react";
import api from "../../api/config";
import Spinner from "../../components/Spinner";

export default function Dashboard() {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            const response = await api.get("/admin/stats");
            if (response.data.status === 200) {
                setStats(response.data.data);
            }
        } catch (error) {
            console.error("Failed to fetch stats", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <Spinner />;

    const statCards = [
        { name: "Total Investors", value: stats?.userCount || 0, color: "blue", icon: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" },
        { name: "Global Assets", value: stats?.nftCount || 0, color: "purple", icon: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" },
        { name: "Total Inflow (ETH)", value: parseFloat(stats?.totalDeposits || 0).toFixed(2), color: "emerald", icon: "M9 11l3-3m0 0l3 3m-3-3v8m0-13a9 9 0 110 18 9 9 0 010-18z" },
        { name: "Pending Audits", value: stats?.pendingWithdrawals || 0, color: "amber", icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" },
    ];

    return (
        <div className="space-y-12">
            <div className="space-y-2">
                <h2 className="text-4xl font-black uppercase tracking-tighter">System Pulse</h2>
                <p className="text-gray-500 font-medium">Global activity oversight and administrative analytics.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {statCards.map((card) => (
                    <div key={card.name} className="glass-card rounded-[2.5rem] p-8 border-white/5 shadow-2xl space-y-4">
                        <div className={`w-12 h-12 rounded-2xl bg-${card.color}-500/10 flex items-center justify-center text-${card.color}-500 border border-${card.color}-500/20`}>
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={card.icon} />
                            </svg>
                        </div>
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">{card.name}</p>
                            <p className="text-4xl font-black mt-1">{card.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Quick Actions or Charts could go here */}
            <div className="glass-card rounded-[3rem] p-12 border-white/5 shadow-2xl bg-gradient-to-br from-blue-600/5 to-transparent relative overflow-hidden">
                <div className="relative z-10 space-y-4 max-w-xl">
                    <h3 className="text-2xl font-black uppercase tracking-tight">Financial Health Protocol</h3>
                    <p className="text-gray-400 font-medium leading-relaxed">
                        Securely audit and verify incoming decentralized capital. All pending withdrawals require manual authorization from the compliance layer to ensure liquidity protection.
                    </p>
                    <div className="flex gap-4 pt-4">
                        <button className="px-8 py-4 bg-blue-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-blue-600/20 hover:scale-105 transition-all">Audit Transactions</button>
                    </div>
                </div>
                <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px]"></div>
            </div>
        </div>
    );
}
