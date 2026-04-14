import React, { useEffect, useState } from "react";
import api from "../../api/config";
import Spinner from "../../components/Spinner";

export default function Deposits() {
    const [deposits, setDeposits] = useState([]);
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState(null);

    useEffect(() => {
        fetchDeposits();
    }, []);

    const fetchDeposits = async () => {
        try {
            const response = await api.get("/admin/deposits");
            if (response.data.status === 200) {
                setDeposits(response.data.data);
            }
        } catch (error) {
            console.error("Failed to fetch deposits", error);
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateStatus = async (id, status) => {
        setActionLoading(id);
        try {
            const response = await api.put(`/admin/deposits/${id}`, { status });
            if (response.data.status === 200) {
                fetchDeposits();
            }
        } catch (error) {
            console.error("Action failed", error);
            alert("Audit failed. Check system logs.");
        } finally {
            setActionLoading(null);
        }
    };

    if (loading) return <Spinner />;

    return (
        <div className="space-y-12">
            <div className="space-y-2">
                <h2 className="text-4xl font-black uppercase tracking-tighter">Inflow Audits</h2>
                <p className="text-gray-500 font-medium">Review and verify incoming capital injections from external chains.</p>
            </div>

            <div className="glass-card rounded-[3rem] overflow-hidden border-white/5 shadow-2xl">
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-white/5 border-b border-white/10">
                            <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-gray-500">Investor</th>
                            <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-gray-500">Amount (ETH)</th>
                            <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-gray-500">Log Timestamp</th>
                            <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-gray-500">Status</th>
                            <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-gray-500 text-right">Audit Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {deposits.map((dep) => (
                            <tr key={dep.id} className="hover:bg-white/5 transition-colors group">
                                <td className="px-10 py-6">
                                    <p className="font-black text-white uppercase tracking-tight">{dep.User?.name || "Unknown Identity"}</p>
                                    <p className="text-xs text-gray-500">{dep.User?.email}</p>
                                </td>
                                <td className="px-10 py-6">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                                        <p className="text-xl font-black text-white">{parseFloat(dep.amount).toFixed(3)}</p>
                                    </div>
                                </td>
                                <td className="px-10 py-6 text-xs font-bold text-gray-500">
                                    {new Date(dep.created_at).toLocaleString()}
                                </td>
                                <td className="px-10 py-6">
                                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border ${
                                        dep.status === "approved" ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" :
                                        dep.status === "rejected" ? "bg-red-500/10 text-red-500 border-red-500/20" :
                                        "bg-blue-500/10 text-blue-500 border-blue-500/20"
                                    }`}>
                                        {dep.status}
                                    </span>
                                </td>
                                <td className="px-10 py-6 text-right">
                                    {dep.status === "pending" ? (
                                        <div className="flex justify-end gap-3">
                                            <button 
                                                onClick={() => handleUpdateStatus(dep.id, "approved")}
                                                disabled={actionLoading === dep.id}
                                                className="px-6 py-3 bg-emerald-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-emerald-500/20 hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
                                            >
                                                Approve
                                            </button>
                                            <button 
                                                onClick={() => handleUpdateStatus(dep.id, "rejected")}
                                                disabled={actionLoading === dep.id}
                                                className="px-6 py-3 bg-white/5 hover:bg-white/10 text-red-500 rounded-xl text-[10px] font-black uppercase tracking-widest border border-white/10 transition-all active:scale-95 disabled:opacity-50"
                                            >
                                                Reject
                                            </button>
                                        </div>
                                    ) : (
                                        <p className="text-[10px] font-black italic text-gray-600 uppercase tracking-widest">Audit Finalized</p>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {deposits.length === 0 && (
                    <div className="p-20 text-center text-gray-600 font-black uppercase tracking-[0.2em] italic">No inflow data reported</div>
                )}
            </div>
        </div>
    );
}
