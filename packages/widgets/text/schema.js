const styleProps = {
  schema: {
    type: "object",
    properties: {
      content: {
        type: "string",
        title: "text",
      },
    },
  },
  uiSchema: {},
  formData: {
    content: "demo string",
  },
};

export default { styleProps, settingProps: styleProps, eventProps: styleProps };
