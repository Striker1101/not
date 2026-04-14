import React, { useEffect, useState } from "react";
import api from "../../api/config";
import Spinner from "../../components/Spinner";

export default function Withdrawals() {
    const [withdrawals, setWithdrawals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState(null);

    useEffect(() => {
        fetchWithdrawals();
    }, []);

    const fetchWithdrawals = async () => {
        try {
            const response = await api.get("/admin/withdrawals");
            if (response.data.status === 200) {
                setWithdrawals(response.data.data);
            }
        } catch (error) {
            console.error("Failed to fetch withdrawals", error);
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateStatus = async (id, status) => {
        setActionLoading(id);
        try {
            const response = await api.put(`/admin/withdrawals/${id}`, { status });
            if (response.data.status === 200) {
                fetchWithdrawals();
            }
        } catch (error) {
            console.error("Action failed", error);
            alert("Audit failed.");
        } finally {
            setActionLoading(null);
        }
    };

    if (loading) return <Spinner />;

    return (
        <div className="space-y-12">
            <div className="space-y-2">
                <h2 className="text-4xl font-black uppercase tracking-tighter">Outflow Audits</h2>
                <p className="text-gray-500 font-medium">Review and authorize liquidity exits and capital distribution requests.</p>
            </div>

            <div className="glass-card rounded-[3rem] overflow-hidden border-white/5 shadow-2xl">
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-white/5 border-b border-white/10">
                            <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-gray-500">Investor</th>
                            <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-gray-500">Destination</th>
                            <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-gray-500">Amount (ETH)</th>
                            <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-gray-500">Status</th>
                            <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-gray-500 text-right">Audit Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {withdrawals.map((item) => (
                            <tr key={item.id} className="hover:bg-white/5 transition-colors group">
                                <td className="px-10 py-6">
                                    <p className="font-black text-white uppercase tracking-tight">{item.User?.name || "Unknown Identity"}</p>
                                    <p className="text-xs text-gray-500">{item.User?.email}</p>
                                </td>
                                <td className="px-10 py-6">
                                    <div className="p-3 bg-white/5 rounded-xl border border-white/5 w-fit">
                                        <p className="text-[10px] font-mono text-blue-400 break-all max-w-[200px]">{item.address}</p>
                                        <p className="text-[9px] font-black text-gray-600 uppercase mt-1 tracking-widest">{item.network}</p>
                                    </div>
                                </td>
                                <td className="px-10 py-6 text-xl font-black text-white">{parseFloat(item.amount).toFixed(3)}</td>
                                <td className="px-10 py-6">
                                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border ${
                                        item.status === "completed" ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" :
                                        item.status === "failed" ? "bg-red-500/10 text-red-500 border-red-500/20" :
                                        "bg-amber-500/10 text-amber-500 border-amber-500/20"
                                    }`}>
                                        {item.status}
                                    </span>
                                </td>
                                <td className="px-10 py-6 text-right">
                                    {item.status === "pending" ? (
                                        <div className="flex justify-end gap-3">
                                            <button 
                                                onClick={() => handleUpdateStatus(item.id, "completed")}
                                                disabled={actionLoading === item.id}
                                                className="px-6 py-3 bg-blue-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-blue-500/20 hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
                                            >
                                                Finalize
                                            </button>
                                            <button 
                                                onClick={() => handleUpdateStatus(item.id, "failed")}
                                                disabled={actionLoading === item.id}
                                                className="px-6 py-3 bg-red-600/10 hover:bg-red-600/20 text-red-500 rounded-xl text-[10px] font-black uppercase tracking-widest border border-red-500/20 transition-all active:scale-95 disabled:opacity-50"
                                            >
                                                Fail
                                            </button>
                                        </div>
                                    ) : (
                                        <p className="text-[10px] font-black italic text-gray-600 uppercase tracking-widest">Transaction Sealed</p>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {withdrawals.length === 0 && (
                    <div className="p-20 text-center text-gray-600 font-black uppercase tracking-[0.2em] italic">No distribution requests documented</div>
                )}
            </div>
        </div>
    );
}
