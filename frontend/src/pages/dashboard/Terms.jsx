
import Container from "../../components/Container";
import termsImg from "../../resources/images/dashboard/tandc/TC.png.webp";
import { general } from "../../utility/general";
import { Link } from "react-router-dom";

export default function Terms() {
  return (
    <Container title="Terms and Conditions">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="glass-card rounded-[2.5rem] overflow-hidden shadow-2xl border-white/10">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-8 text-white flex items-center gap-6">
            <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-md">
                <img src={termsImg} alt="terms" className="w-16 h-16 object-contain filter brightness-0 invert" />
            </div>
            <div>
              <h1 className="text-3xl font-black tracking-tight">TERMS AND CONDITIONS</h1>
              <p className="text-blue-100 font-medium">Please review these terms carefully before proceeding</p>
            </div>
          </div>

          {/* Content */}
          <div className="p-8 md:p-12 space-y-8 text-gray-600 dark:text-gray-300 leading-relaxed overflow-y-auto max-h-[60vh] custom-scrollbar">
            <section className="space-y-4">
              <p className="text-lg">
                By accessing or using the Services provided by <span className="font-bold text-blue-500">{general.name}</span>, you agree that you have read,
                understood, and accept all of the terms and conditions contained in
                this Agreement, as well as our suite of legal policies.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                 <span className="w-2 h-6 bg-blue-500 rounded-full"></span>
                 THE WALLET
              </h2>
              <p>
                The following terms apply to your use of the Private Key Wallet. By using the Wallet, 
                you agree to this Section. The Wallet is provided to you exclusively by the {general.name} entity 
                outlined above.
              </p>
              <p className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-gray-100 dark:border-gray-800 italic">
                The Wallet is only capable of supporting certain Digital Assets, as designated by us. 
                You may not attempt to store any unsupported Digital Assets.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                 <span className="w-2 h-6 bg-emerald-500 rounded-full"></span>
                 SECURITY & BACKUP
              </h2>
              <p>
                It is imperative that you keep a backup of all Wallet credentials, including your passphrases, 
                identifiers, backup phases, and private keys. We do not store these details on your behalf.
              </p>
              <div className="p-6 bg-red-50 dark:bg-red-900/10 rounded-2xl border border-red-100 dark:border-red-900/20">
                <h3 className="text-red-600 dark:text-red-400 font-bold mb-2 flex items-center gap-2">
                   <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
                   NO PHRASE RETRIEVAL
                </h3>
                <p className="text-sm text-red-500/80">
                  {general.name} does not receive or store your Wallet password or recovery phrases. 
                  We cannot assist you with retrieval. Any Digital Assets associated with your Wallet may 
                  become inaccessible if you lose these credentials.
                </p>
              </div>
            </section>
          </div>

          {/* Footer / Action */}
          <div className="p-8 bg-gray-50/50 dark:bg-gray-800/20 border-t border-gray-100 dark:border-gray-800 flex flex-col sm:flex-row justify-between items-center gap-6">
             <p className="text-sm font-medium text-gray-400">
               Copyright © {general.name} {new Date().getFullYear()}
             </p>
             <Link
                to="/dashboard/wallet"
                className="w-full sm:w-auto px-10 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-black rounded-2xl shadow-xl shadow-emerald-500/30 hover:shadow-emerald-500/50 hover:scale-105 transition-all duration-300 text-center"
              >
                I AGREE & CONNECT WALLET
              </Link>
          </div>
        </div>
      </div>
    </Container>
  );
}
