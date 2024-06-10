import React from "react";
import Container from "../../components/Container";
import grid1 from "../../resources/images/about/grid1.png";
import grid2 from "../../resources/images/about/grid2.png";
import grid3 from "../../resources/images/about/grid3.png";
import grid4 from "../../resources/images/about/grid4.png";
import grid5 from "../../resources/images/about/grid5.png";
import grid6 from "../../resources/images/about/grid6.png";
import kat from "../../resources/images/about/kat.png";
import kat1 from "../../resources/images/about/kat1.png";
import auto from "../../resources/images/about/AUTOMATION.png";
import inv1 from "../../resources/images/about/inv1.jpg";
import inv2 from "../../resources/images/about/inv2.png";
import inv3 from "../../resources/images/about/inv3.png";
import inv4 from "../../resources/images/about/inv4.jpg";
import inv5 from "../../resources/images/about/inv5.png";
import inv6 from "../../resources/images/about/inv6.png";
import { general } from "../../utility/general";

export default function About() {
  return (
    <Container>
      <section className="flex  flex-col md:flex-row" id="about_header">
        <div className="w-fit">
          <h1 className="font-bold text-3xl">The Premier {general.name}</h1>
          <p className="m-2">
            {general.name} is the world’s most trusted marketplace and community
            to discover, buy, and sell authentic NFTs from the world’s leading
            digital creators. We offer digital creators a trusted platform to
            sell their creations directly to fans and collectors worldwide.
          </p>
        </div>
        <div className="flex-2 grid grid-cols-3 gap-4 m-2">
          <div className="col-span-1">
            <img src={grid1} alt={"grid1"} className="w-full h-auto" />
          </div>
          <div className="col-span-1">
            <img src={grid2} alt={"grid2"} className="w-full h-auto" />
          </div>
          <div className="col-span-1">
            <img src={grid3} alt={"grid3"} className="w-full h-auto" />
          </div>
          <div className="col-span-1">
            <img src={grid4} alt="grid4" className="w-full h-auto" />
          </div>
          <div className="col-span-1">
            <img src={grid5} alt="grid5" className="w-full h-auto" />
          </div>
          <div className="col-span-1">
            <img src={grid6} alt="grid3" className="w-full h-auto" />
          </div>
        </div>
      </section>
      <section className="" id="why">
        <h1 className="text-xl font-semibold"> Why NFTS</h1>
        <hr className="m-3" />
        <div>
          <h1 className="text-xl m-3 font-bold">Authentic</h1>
          <p className="m-5">
            Every creation on the market place is immutably verified as the
            unique work of its creator and permanently recorded on the
            blockchain.
          </p>
        </div>
        <div>
          <h1 className="text-xl m-3 font-semibold">Unique</h1>
          <p className="m-5">
            Using blockchain technology, a creator can ensure that only a
            limited number of authentic editions can ever be owned, ensuring
            scarcity and uniqueness of a digital creation.
          </p>
        </div>
        <div>
          <h1 className="text-xl m-3 text-start font-semibold">Ownable</h1>
          <p className="m-5">
            Purchasing an NFT confers ownership and display rights for a unique
            digital creation, which is then transferred and stored in your
            digital wallet for safe-keeping.
          </p>
          <hr className="m-2 w-full" />
          <div className="flex flex-col items-center justify-center">
            <img src={kat} alt="kat" width={400} />
          </div>
        </div>
        <div>
          <h1 className="text-xl font-bold p-3"> A Place for Collectors </h1>
          <h2 className="text-2xl p-5 font-semibold">
            Discover and collect authentic NFTs from the world’s leading digital
            creators.
          </h2>
          <p className="p-5">
            {general.name} verifies every NFT to ensure authenticity and
            provenance before anything is listed or sold..
          </p>
        </div>
        <div className="bg-blue-400 dark:bg-blue-600 p-5">
          <h1 className="text-2xl font-bold p-4">A Place for Collectors</h1>
          <h3 className="text-2xl m-3 font-semibold">
            Create and sell your digital creations as NFTs to our vibrant
            community of 100K+ collectors
          </h3>
          <p className="m-3">
            MakersPlace provides industry-leading tools for creatives of all
            backgrounds to help protect and sell their creations to a global
            audience.
          </p>
          <div className="flex flex-col items-center justify-center">
            <img src={kat1} alt="kat" width={400} />
          </div>
        </div>
        <div className="bg-gray-400 pt-5 m-0 w-full">
          <h1 className="text-4xl font-bold">
            We’re not computer nerds. We’re art nerds with computers.
          </h1>
          <p className="p-4">
            Our team includes builders and creators from a diverse range of
            backgrounds including leaders from Pinterest, Dropbox, Sotheby's,
            Nike, Salesforce, YCombinator and more.
          </p>
          <div className="flex flex-col items-center justify-center">
            <img src={auto} alt="kat" width={400} />
          </div>
        </div>
      </section>
      <section id="values" className="bg-gray-400  m-0 w-full">
        <h4>OUR VALUES</h4>
        <hr />
        <div className="m-4  p-2">
          <h2 className="m-3 text-xl font-bold">We're Mission Obsessed</h2>
          <p className="m-3">
            We're maniacally focused on empowering the world's digital creators,
            and enabling a vibrant future for digital creativity.
          </p>
        </div>
        <div className="m-4  p-2">
          <h2 className="m-3 text-xl font-bold">We're Owners</h2>
          <p className="m-3">
            We're all impassioned owners of achieving this bold and ambitious
            mission.
          </p>
        </div>
        <div className="m-4 p-2">
          <h2 className="m-3 text-xl font-bold">We're Makers</h2>
          <p className="m-3">
            Makers push boundaries and make what may seem like the impossible,
            possible. We're a team of makers enabling the future for makers.
          </p>
        </div>
      </section>
      <section id="investors">
        <h1 className="pl-4 text-xl">Our Investors</h1>
        <hr />
        <div className="flex flex-col items-center justify-center align-middle">
          <img src={inv1} alt="" className="w-60 m-2" />
          <img src={inv2} alt="" className="w-60 m-2" />
          <img src={inv3} alt="" className="w-60 m-2" />
          <img src={inv4} alt="" className="w-60 m-2" />
          <img src={inv5} alt="" className="w-60 m-2" />
          <img src={inv6} alt="" className="w-60 m-2" />
        </div>
      </section>
    </Container>
  );
}
