// import React, { useEffect, useState } from "react";
import PostElement from "./PostElement";

type Post = {
  id: number;
  title: string;
};

type Props = {
  posts: Post[];
};

const Counter: React.FC<Props> = ({ posts = [] }) => {
  //   const [count, setCount] = useState(0);
  //   const [title, setTitle] = useState("Welcome");
  //   const [page, setPage] = useState(1);
  //   const changeTitle = () => {
  //     setTitle("Another title");
  //   };

  //   //component did mount
  //   useEffect(() => {
  //     console.log("did mount");
  //   }, []);

  //   //component will mount

  //   useEffect(() => {
  //     return console.log("test");
  //   });

  //   useEffect(() => {
  //     return () => {
  //       console.log("updating only on count change");
  //     };
  //   }, [title, page]);

  //   console.log("props", props);
  return (
    <ul>
      {posts.map((post) => {
        return <PostElement key={post.id} post={post.title} />;
      })}
    </ul>
  );
};

export default Counter;
