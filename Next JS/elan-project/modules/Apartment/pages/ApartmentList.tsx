import React from "react";
import SearchBar from "../components/SearchBar";
import Card from "../components/Card";

const ApartmentList = () => {
  return (
    <div className="mx-auto max-w-screen-xl">
      <SearchBar></SearchBar>
      <div className="mt-6 flex flex-wrap justify-between gap-y-7">
        {Array(20)
            .fill(0)
            .map((_, i) => (
            <Card key={i} />
            ))}

      </div>
    </div>
  );
};

export default ApartmentList;
