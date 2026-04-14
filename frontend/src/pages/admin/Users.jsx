import React, { useEffect, useState } from "react";
import api from "../../api/config";
import Spinner from "../../components/Spinner";

export default function Users() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await api.get("/admin/users");
            if (response.data.status === 200) {
                setUsers(response.data.data);
            }
        } catch (error) {
            console.error("Failed to fetch users", error);
        } finally {
            setLoading(false);
        }
    };

    const filteredUsers = users.filter(u => 
        u.email.toLowerCase().includes(searchTerm.toLowerCase()) || 
        u.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return <Spinner />;

    return (
        <div className="space-y-12">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-2">
                    <h2 className="text-4xl font-black uppercase tracking-tighter">User Base</h2>
                    <p className="text-gray-500 font-medium">Global registry of verified investors and collectors.</p>
                </div>
                
                <div className="relative group">
                    <input 
                        type="text" 
                        placeholder="Search by name or email..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="bg-white/5 border-2 border-white/10 rounded-2xl py-4 px-6 min-w-[300px] outline-none transition-all focus:border-blue-500 text-white font-bold placeholder:text-gray-600"
                    />
                    <svg className="absolute right-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>
            </div>

            <div className="glass-card rounded-[3rem] overflow-hidden border-white/5 shadow-2xl">
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-white/5 border-b border-white/10">
                            <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-gray-500">Identity</th>
                            <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-gray-500">Wealth (ETH)</th>
                            <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-gray-500">Profit (ETH)</th>
                            <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-gray-500 text-right">Registered</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {filteredUsers.map((user) => (
                            <tr key={user.id} className="hover:bg-white/5 transition-colors group">
                                <td className="px-10 py-6">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-2xl bg-gray-800 flex items-center justify-center text-white font-black group-hover:bg-blue-600 transition-colors border border-white/5 shadow-inner uppercase">
                                            {user.name.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="font-black text-white uppercase tracking-tight">{user.name}</p>
                                            <p className="text-xs text-gray-500 font-medium">{user.email}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-10 py-6 font-bold text-lg">{parseFloat(user.balance).toFixed(2)}</td>
                                <td className="px-10 py-6 font-bold text-emerald-500 text-lg">{parseFloat(user.profit).toFixed(2)}</td>
                                <td className="px-10 py-6 text-right">
                                    <p className="text-xs font-black text-gray-400 uppercase tracking-widest">
                                        {new Date(user.created_at).toLocaleDateString()}
                                    </p>
                                    <p className="text-[10px] text-gray-600 font-mono mt-1">{user.uid.slice(0, 16)}...</p>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {filteredUsers.length === 0 && (
                    <div className="p-20 text-center text-gray-600 font-black uppercase tracking-[0.2em] italic">No identities found in this quadrant</div>
                )}
            </div>
        </div>
    );
}
