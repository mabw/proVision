import React, { memo } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { createStructuredSelector } from "reselect";
import Widgets from "widgets";
import Form from "react-jsonschema-form";

import {
  makeSelectStyleFormData,
  makeSelectSettingFormData,
  makeSelectEventFormData,
  makeSelectNodes,
  makeSelectSelectedNodeId,
} from "../selectors";
import designerActions from "../actions";

const SettingPanels = ({
  styleFormData,
  settingFormData,
  eventFormData,
  selectedNodeId,
  onChangeStyleForm,
  onChangeSettingForm,
  onChangeEventForm,
  nodes,
}) => {
  const selectedNodeType = nodes[selectedNodeId].type;
  const styleFormSchema = Widgets[selectedNodeType].styleProps.schema;
  const settingFormSchema = Widgets[selectedNodeType].settingProps.schema;
  const eventFormSchema = Widgets[selectedNodeType].eventProps.schema;
  return (
    <>
      <strong>Style setting</strong>
      <Form
        schema={styleFormSchema}
        formData={styleFormData}
        onSubmit={(dateSet) => onChangeStyleForm(dateSet.formData)}
      />
      <strong>Props setting</strong>
      <Form
        schema={settingFormSchema}
        formData={settingFormData}
        onSubmit={(dateSet) => onChangeSettingForm(dateSet.formData)}
      />
      <strong>Event setting</strong>
      <Form
        schema={eventFormSchema}
        formData={eventFormData}
        onSubmit={(dateSet) => onChangeEventForm(dateSet.formData)}
      />
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  styleFormData: makeSelectStyleFormData(),
  settingFormData: makeSelectSettingFormData(),
  eventFormData: makeSelectEventFormData(),
  selectedNodeId: makeSelectSelectedNodeId(),
  nodes: makeSelectNodes(),
});

const mapDispatchToProps = (dispatch) => {
  return {
    onChangeStyleForm: (props) =>
      dispatch(designerActions.setStyleProps(props)),
    onChangeSettingForm: (props) =>
      dispatch(designerActions.setSettingProps(props)),
    onChangeEventForm: (props) =>
      dispatch(designerActions.setEventProps(props)),
  };
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(
  withConnect,
  memo
)(SettingPanels);
