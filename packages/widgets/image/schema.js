const styleProps = {
  schema: {
    type: "object",
    properties: {
      source: {
        type: "string",
        title: "background",
      },
    },
  },
  uiSchema: {},
  formData: {
    source:
      "//m.360buyimg.com/babel/s2002x392_jfs/t1/87496/32/17224/122060/5e845caaE6b28e1d0/0b5102c16c08ad84.jpg!q70.dpg",
  },
};

const eventProps = {
  schema: {
    type: "object",
    properties: {
      link: {
        type: "string",
        title: "Link to",
      },
    },
  },
  uiSchema: {},
  formData: {
    link: "",
  },
};

export default { styleProps, eventProps };
