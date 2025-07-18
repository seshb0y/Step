"use client";
import React from "react";

const Search = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };
  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="search" />
    </form>
  );
};

export default Search;
