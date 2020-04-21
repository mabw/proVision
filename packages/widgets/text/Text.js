import React from "react";
import schema from "./schema";

export const Text = ({ content }) => {
  return <div onClick={() => console.log("33333")}>{content}</div>;
};

Text.defaultProps = {
  content: schema.settingProps.formData.content,
};
