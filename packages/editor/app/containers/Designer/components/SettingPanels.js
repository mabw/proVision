import React, { memo } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { createStructuredSelector } from "reselect";
import Widgets from "widgets";
import Form from "react-jsonschema-form";
import { isEmpty } from "lodash";

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
  const settingForm =
    Widgets[selectedNodeType].settingProps &&
    Widgets[selectedNodeType].settingProps.schema;
  const eventForm =
    Widgets[selectedNodeType].eventProps &&
    Widgets[selectedNodeType].eventProps.schema;

  return (
    <>
      <div>
        <strong>Widget information</strong>
        <p>Widget id: {selectedNodeId} </p>
      </div>
      {!isEmpty(styleFormSchema) && (
        <>
          <strong>Style setting</strong>
          <Form
            tagName="div"
            schema={styleFormSchema}
            formData={styleFormData}
            onChange={(dateSet) => onChangeStyleForm(dateSet.formData)}
          >
            <button type="submit" className="d-none" />
          </Form>
        </>
      )}
      {!isEmpty(settingForm) && (
        <>
          <strong>Props setting</strong>
          <Form
            schema={settingForm}
            formData={settingFormData}
            onChange={(dateSet) => onChangeSettingForm(dateSet.formData)}
          >
            <button type="submit" className="d-none" />
          </Form>
        </>
      )}
      {!isEmpty(eventForm) && (
        <>
          <strong>Event setting</strong>
          <Form
            schema={eventForm}
            formData={eventFormData}
            onChange={(dateSet) => onChangeEventForm(dateSet.formData)}
          >
            <button type="submit" className="d-none" />
          </Form>
        </>
      )}
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
