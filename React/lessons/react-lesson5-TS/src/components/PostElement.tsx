import React from "react";

type Props = {
  post: string;
};

const PostElement: React.FC<Props> = (props) => {
  return <li>{props.post}</li>;
};

export default PostElement;
