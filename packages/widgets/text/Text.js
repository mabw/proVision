import React from "react";
import schema from "./schema";

export const Text = ({ text }) => {
  return <div>{text}</div>;
};

Text.defaultProps = {
  text: schema.settingProps.formData.content,
};
