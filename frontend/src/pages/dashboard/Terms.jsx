import React from "react";
import Container from "../../components/Container";
import termsImg from "../../resources/images/dashboard/tandc/TC.png.webp";
import { general } from "../../utility/general";
import { Link } from "react-router-dom";
export default function Terms() {
  return (
    <Container title={"Terms and Condition"}>
      <div className="p-5 pb-10">
        <div className="flex  items-center gap-3 p-3">
          <img src={termsImg} alt="" width={80} />
          <div>
            <h1>TERMS AND CONDITION</h1>
            <p>Please read these terms carefully!!!</p>
          </div>
        </div>

        <p className="p-4 text-lg">
          By accessing or using the Services, you agree that you have read,
          understood, and accept all of the terms and conditions contained in
          this Agreement, as well as our Privacy Policy, Cookie Policy, API
          Agreement, Law Enforcement Policy, and Trading Principles
          (collectively, “Supplemental Agreements”). These additional agreements
          are incorporated by reference to this Agreement (meaning you also
          agree to these Supplement Agreements).
        </p>
        <h1 className="font-semibold text-xl p-4">THE WALLET</h1>
        <p className="p-4 text-lg">
          The following terms apply to your use of Wallet (also known as the
          “Private Key Wallet”). By using Wallet, you agree to this Section
          Wallet is provided to you exclusively by the blockchain.com entity
          outlined above.
        </p>
        <p className="p-4 text-lg">
          The Wallet is only capable of supporting certain Digital Assets, as
          designated by us. You may not attempt to store any Digital Assets in
          your Wallet which we do not support.
        </p>

        <h5 className="p-4 text-lg font-medium">
          When you create a Wallet, the Wallet software generates a
          cryptographic private and public key pair that you may use to send and
          receive any supported Digital Assets via the relevant Digital Assets
          network.
        </h5>

        <p className="p-4 text-lg">
          It is imperative that you keep a backup of all Wallet credentials,
          including your passphrases, identifiers, backup phases, private keys
          and network addresses (and you keep this backup outside of the
          Services). If you do not maintain a backup of your Wallet data outside
          of the Services, you will not be able to access Digital Assets
          previously accessed using your Wallet in the event that we discontinue
          or no longer offer some or all of the Services, or you may otherwise
          lose access to Digital Assets. We are not responsible for maintaining
          this information on your behalf.
        </p>

        <h3 className="p-4 text-lg font-bold">NO PASSWORD/PHRASE RETRIEVAL.</h3>

        <p className="p-4 text-lg">
          With respect to the Wallet,{general.name} does not receive or store
          your Wallet password, nor any keys, network addresses or transaction
          history. We cannot assist you with Wallet password retrieval. You are
          solely responsible for remembering, storing and keeping secret your
          Wallet password. Any Digital Assets you have associated with such
          Wallet may become inaccessible if you do not know or keep secret your
          Wallet password. Any third party with knowledge of one or more of your
          credentials (including, without limitation, a backup phrase, wallet
          identifier or password) can dispose of Digital Assets in your Wallet.
        </p>
        <Link
          to={"/dashboard/wallet"}
          className="rounded-2xl border-2 border-green-600 bg-green-400 p-3"
        >
          I Agree To Link
        </Link>
        <p className="p-4 text-lg font-bold">
          Copyright © {general.name} {new Date().getFullYear().toString()}
        </p>
      </div>
    </Container>
  );
}
