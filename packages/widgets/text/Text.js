import React from "react";

import schema from "./schema";
import { Wrapper } from "./text.style";

export const Text = ({ content, fontColor }) => {
  return <Wrapper fontColor={fontColor}>{content}</Wrapper>;
};

Text.defaultProps = {
  content: schema.settingProps.formData.content,
};
