import React from "react";

const ArrowDown = ({className = ""}: {className: string}) => {
  return (
    <svg className={className}
      width="14"
      height="9"
      viewBox="0 0 14 9"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0.898438 1.18359L6.89844 7.18359L12.8984 1.18359"
        stroke="#FFDF42"
        strokeWidth="2"
      />
    </svg>
  );
};

export default ArrowDown;
