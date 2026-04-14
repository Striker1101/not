import React from "react";
import Container from "../../components/Container";
import AutoCard from "../../components/AutoCard";

export default function Explore() {
  return (
    <Container>
      <section id="artwork">
        <h1 className="text-3xl font-bold  mb-8">Explore ArtWork</h1>
        <hr />
        <div className=" mx-auto bg-white dark:bg-gray-800 rounded-lg overflow-hidden p-4">
          <AutoCard name={"explore"} />
        </div>
      </section>
    </Container>
  );
}
