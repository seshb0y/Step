import React from "react";
import LikeBtn from "../components/LikeBtn";
import Counter from "../components/Counter";

const Posts = async () => {
  const response = await fetch("https://api.vercel.app/blog");
  const data = await response.json();

  return (
    <div>
      {data.map((item: { title: string; content: string }) => (
        <div key={item.title}>
          <h2>{item.title}</h2>
          <p>{item.content}</p>
          <LikeBtn />
        </div>
      ))}
      <Counter/>
    </div>
  );
};

export default Posts;
