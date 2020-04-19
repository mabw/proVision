import React from "react";
import schema from "./schema";

export const Text = ({ content }) => {
  return <div>{content}</div>;
};

Text.defaultProps = {
  content: schema.settingProps.formData.content,
};
