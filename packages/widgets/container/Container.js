import React from "react";
import schema from "./schema";

export const Container = ({ children }) => {
  return <div>{children}</div>;
};

Container.defaultProps = {
  content: schema.settingProps.formData.content,
};
