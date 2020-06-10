import React from "react";
import { Wrapper } from "./image.style";

export const Image = ({ source, link }) => {
  const handleOnClick = () => {
    if (link) {
      window.location.href = link;
    }
  };

  return (
    <Wrapper onClick={handleOnClick}>
      <img src={source} />
    </Wrapper>
  );
};

Image.defaultProps = {
  source:
    "//m.360buyimg.com/babel/s2002x392_jfs/t1/87496/32/17224/122060/5e845caaE6b28e1d0/0b5102c16c08ad84.jpg!q70.dpg",
};
