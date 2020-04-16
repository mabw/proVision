/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React, { useState } from "react";
import { FormattedMessage } from "react-intl";
import { BasicImage } from "widgets";
import Form from "react-jsonschema-form";

import messages from "./messages";

export default function HomePage() {
  const { schema, formData } = BasicImage.schema;
  const [dataSet, setData] = useState(formData);
  const handleOnChange = (dataSet) => {
    setData(dataSet.formData);
  };

  return (
    <h1>
      <BasicImage.template source={dataSet.valuesInFormData.scalar} />
      <FormattedMessage {...messages.header} />
      <Form schema={schema} formData={dataSet} onChange={handleOnChange} />
    </h1>
  );
}
