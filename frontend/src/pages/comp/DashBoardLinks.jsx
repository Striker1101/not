
import { ReactComponent as HomeImg } from "../../resources/images/dashboard/nav/house-solid.svg";
import { ReactComponent as UploadImg } from "../../resources/images/dashboard/nav/file-export-solid.svg";
import { ReactComponent as MintedImg } from "../../resources/images/dashboard/nav/magnifying-glass-dollar-solid.svg";
import { ReactComponent as DepositImg } from "../../resources/images/dashboard/nav/money-bill-transfer-solid.svg";
import { ReactComponent as WithdrawImg } from "../../resources/images/dashboard/nav/house-flood-water-circle-arrow-right-solid.svg";
import { ReactComponent as BuyImg } from "../../resources/images/dashboard/nav/coins-solid.svg";
import { ReactComponent as ProfileImg } from "../../resources/images/dashboard/nav/user-pen-solid.svg";
import { ReactComponent as LogoutImg } from "../../resources/images/dashboard/nav/right-from-bracket-solid.svg";
import { logout } from "../../api/auth";
import { Link } from "react-router-dom";

export default function DashBoardLinks({ toggleSidebar }) {
  const links = [
    { to: "/dashboard/", label: "Dashboard", Icon: HomeImg },
    { to: "/dashboard/upload", label: "Upload NFTs", Icon: UploadImg },
    { to: "/dashboard/minted", label: "Minted NFTs", Icon: MintedImg },
    { to: "/dashboard/deposit", label: "Deposit", Icon: DepositImg },
    { to: "/dashboard/withdraw", label: "Withdraw", Icon: WithdrawImg },
    { to: "/dashboard/buy", label: "Buy NFT", Icon: BuyImg },
    { to: "/dashboard/bids", label: "Auction Board", Icon: BuyImg },
    { to: "/dashboard/wallet/view", label: "Linked Wallets", Icon: MintedImg },
    { to: "/dashboard/profile", label: "My Profile", Icon: ProfileImg },
  ];

  return (
    <div className="flex flex-col h-full bg-white dark:bg-[#0f172a]">
      <div className="p-6 space-y-2 flex-grow overflow-y-auto">
        {links.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            onClick={toggleSidebar}
            className="flex items-center gap-4 px-4 py-3 rounded-2xl text-gray-600 dark:text-gray-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200 group"
          >
            <link.Icon className="w-5 h-5 transition-transform group-hover:scale-110" />
            <span className="font-semibold">{link.label}</span>
          </Link>
        ))}
      </div>

      <div className="p-6 border-t border-gray-100 dark:border-gray-800">
        <button
          onClick={logout}
          className="flex items-center gap-4 w-full px-4 py-3 rounded-2xl text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors duration-200"
        >
          <LogoutImg className="w-5 h-5" />
          <span className="font-semibold">Log Out</span>
        </button>
      </div>
    </div>
  );
}
