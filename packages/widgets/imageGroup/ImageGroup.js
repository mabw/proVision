import React from "react";

import { Wrapper } from "./imageGroup.style";
import schema from "./schema";

export const Images = ({ formData }) => {
  const handleOnClick = () => {
    if (link) {
      window.location.href = link;
    }
  };
  const { items } = formData;
  console.log("items: ", items);

  return (
    <Wrapper onClick={handleOnClick}>
      <div>123123</div>
      <img src={""} />
    </Wrapper>
  );
};

Images.defaultProps = {
  formData: schema.settingProps.formData,
};
