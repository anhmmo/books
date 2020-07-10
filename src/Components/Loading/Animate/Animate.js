import React from "react";

function Animate({ cx = "6", begin = "0.1" }) {
  return (
    <circle fill="#f08a5d" stroke="none" cx={cx} cy="50" r="6">
      <animate
        attributeName="opacity"
        dur="1s"
        values="0;1;0"
        repeatCount="indefinite"
        begin={begin}
      />
    </circle>
  );
}

export default Animate;
