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

const settingProps = {
  schema: {
    type: "object",
    properties: {
      items: {
        type: "array",
        items: {
          type: "object",
          allOf: [
            {
              properties: {
                source: {
                  type: "string",
                },
              },
            },
            {
              properties: {
                link: {
                  type: "string",
                },
              },
            },
          ],
        },
      },
    },
  },
  uiSchema: {},
  formData: {
    items: [
      {
        source:
          "//m.360buyimg.com/babel/s2002x392_jfs/t1/87496/32/17224/122060/5e845caaE6b28e1d0/0b5102c16c08ad84.jpg!q70.dpg",
        link: "http://www.baidu.com",
      },
    ],
  },
};

export default { styleProps, settingProps };
