import { datas } from "../../utility/dashboardIndexData";
import { useAppState } from "../../AppStateContext";
import Container from "../../components/Container";
import { ReactComponent as MoneyImg } from "../../resources/images/dashboard/index/money-check-dollar-svgrepo-com.svg";
import { ReactComponent as ProfitImg } from "../../resources/images/dashboard/index/profit-svgrepo-com.svg";
import { ReactComponent as AccountImg } from "../../resources/images/dashboard/index/account-arrows-svgrepo-com.svg";
import { Link } from "react-router-dom";

export default function IndexPage() {
  const { islogged, randomSelector } = useAppState();
  
  // Safe extraction of user data
  const userData = islogged.userData?.users?.[0] || { balance: 0, profit: 0 };
  const verify = islogged.user?.emailVerified || false;

  const stats = [
    {
      title: "Total Balance",
      value: `${userData.balance.toFixed(2)} ETH`,
      icon: <MoneyImg className="w-6 h-6 text-blue-500" />,
      color: "from-blue-500/20 to-blue-600/5",
      borderColor: "border-blue-500/20"
    },
    {
      title: "Total Profit",
      value: `${userData.profit.toFixed(2)} ETH`,
      icon: <ProfitImg className="w-6 h-6 text-emerald-500" />,
      color: "from-emerald-500/20 to-emerald-600/5",
      borderColor: "border-emerald-500/20"
    },
    {
      title: "Account Status",
      value: verify ? "Verified" : "Unverified",
      icon: <AccountImg className="w-6 h-6 text-purple-500" />,
      color: "from-purple-500/20 to-purple-600/5",
      borderColor: "border-purple-500/20",
      link: "/dashboard/profile"
    }
  ];

  return (
    <Container title="Dashboard Overview">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Header Section / CTA */}
        <section className="relative overflow-hidden rounded-3xl p-8 glass-card border-none bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-2xl shadow-blue-500/20">
          <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="space-y-2 text-center md:text-left">
              <h2 className="text-3xl font-extrabold tracking-tight">Connect Your Wallet</h2>
              <p className="text-blue-100 max-w-lg">
                Securely link your blockchain assets to authorize transactions and manage your NFT portfolio directly from your dashboard.
              </p>
            </div>
            <Link
              to="/dashboard/terms"
              className="px-8 py-3 bg-white text-blue-600 font-bold rounded-2xl hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Sign Terms & Conditions
            </Link>
          </div>
          {/* Decorative background elements */}
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-64 h-64 bg-blue-400/20 rounded-full blur-3xl"></div>
        </section>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, idx) => (
            <div key={idx} className={`relative overflow-hidden rounded-3xl p-6 glass-card border ${stat.borderColor} group`}>
              {stat.link ? (
                <Link to={stat.link} className="block space-y-4">
                  <div className="flex justify-between items-start">
                    <div className="p-3 rounded-2xl bg-white/50 dark:bg-gray-800/50 shadow-inner group-hover:scale-110 transition-transform">
                      {stat.icon}
                    </div>
                    <span className={`text-xs font-bold px-3 py-1 rounded-full ${verify ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'}`}>
                      {stat.title === "Account Status" ? (verify ? "ACTIVE" : "PENDING") : "+12.5%"}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">{stat.title}</p>
                    <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
                  </div>
                </Link>
              ) : (
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <div className="p-3 rounded-2xl bg-white/50 dark:bg-gray-800/50 shadow-inner group-hover:scale-110 transition-transform">
                      {stat.icon}
                    </div>
                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-500/10 text-blue-500">
                      LIVE
                    </span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">{stat.title}</p>
                    <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
                  </div>
                </div>
              )}
              {/* Subtle background glow */}
              <div className={`absolute -right-4 -bottom-4 w-24 h-24 bg-gradient-to-br ${stat.color} rounded-full blur-2xl opacity-50`}></div>
            </div>
          ))}
        </div>

        {/* Market Table Section */}
        <div className="glass-card rounded-3xl overflow-hidden shadow-sm">
          <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center">
            <h3 className="text-lg font-bold">Trending Collections</h3>
            <button className="text-sm text-blue-500 font-semibold hover:underline">View All Market</button>
          </div>
          <div className="overflow-x-auto">
            <table className="dashboard-table">
              <thead>
                <tr>
                  <th>Collection</th>
                  <th>Contact Address</th>
                  <th>Market Cap</th>
                  <th>Floor Price</th>
                  <th>Volume</th>
                  <th>Owners</th>
                </tr>
              </thead>
              <tbody>
                {randomSelector(datas, 10).map((data, index) => (
                  <tr key={index}>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 bg-gray-100 dark:bg-gray-800">
                          {data.nft ? (
                            <img src={data.nft} alt={data.name} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">NFT</div>
                          )}
                        </div>
                        <span className="font-bold text-gray-900 dark:text-white">{data.name}</span>
                      </div>
                    </td>
                    <td>
                      <span className="font-mono text-xs text-gray-500 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                        {data.contact_address.slice(0, 6)}...{data.contact_address.slice(-4)}
                      </span>
                    </td>
                    <td className="font-medium">{data.market_cap}</td>
                    <td>
                      <span className="text-emerald-500 font-bold">{data.floor_price}</span>
                    </td>
                    <td>{data.total_volume}</td>
                    <td>
                      <div className="flex flex-col">
                        <span>{data.NOW}</span>
                        <div className="w-16 h-1 bg-gray-100 dark:bg-gray-800 rounded-full mt-1 overflow-hidden">
                          <div className="h-full bg-blue-500 rounded-full" style={{ width: '65%' }}></div>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </Container>
  );
}
