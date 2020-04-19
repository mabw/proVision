import React from "react";

export const Image = ({ source }) => {
  return (
    <div>
      <img src={source} />
      <p>123</p>
    </div>
  );
};

Image.defaultProps = {
  source:
    "//m.360buyimg.com/babel/s2002x392_jfs/t1/87496/32/17224/122060/5e845caaE6b28e1d0/0b5102c16c08ad84.jpg!q70.dpg",
};
