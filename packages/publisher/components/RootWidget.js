import React from "react";
import styled from "styled-components";

const WrapRoot = styled.div`
  width: 414px;
  height: 736px;
  background: white;
  margin: 0 auto;
  position: relative;
`;

const styleProps = {
  schema: {
    type: "object",
    properties: {
      content: {
        type: "string",
        title: "text",
        default: "default",
      },
    },
  },
  uiSchema: {},
  formData: {
    content: "root string",
  },
};

const RootWidget = ({ children }) => {
  return <WrapRoot>{children}</WrapRoot>;
};

const Root = {
  template: RootWidget,
  styleProps,
  settingProps: styleProps,
  eventProps: styleProps,
};

export { Root };
