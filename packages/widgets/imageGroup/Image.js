import React from "react";

import { Wrapper } from "./image.style";
import schema from "./schema";

export const Image = ({ formData }) => {
  const handleOnClick = () => {
    if (link) {
      window.location.href = link;
    }
  };
  const { items } = formData;

  return (
    <Wrapper onClick={handleOnClick}>
      <img src={source} />
    </Wrapper>
  );
};

Image.defaultProps = {
  formData: schema.settingProps.formData,
};
