import React from "react";

import { Wrapper } from "./imageGroup.style";
import schema from "./schema";

export const Images = ({ items, columns }) => {
  const handleOnClick = (link) => {
    if (link) {
      window.location.href = link;
    }
  };

  return (
    <Wrapper columns={columns}>
      {items.map((item, index) => (
        <img
          key={item.source + `${index}`}
          src={item.source}
          onClick={() => handleOnClick(item.link)}
        />
      ))}
    </Wrapper>
  );
};

Images.defaultProps = {
  items: schema.settingProps.formData.items,
  columns: schema.settingProps.formData.columns,
};
