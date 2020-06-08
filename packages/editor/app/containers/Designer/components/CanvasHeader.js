import React, { useState, memo } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { createStructuredSelector } from "reselect";
import styled from "styled-components";
import { Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import { makeSelectNodes } from "../selectors";

const WrapHeader = styled.div`
  height: 40px;
  display: flex;
  justify-content: space-between;
  align-content: center;
`;

const CanvasHeader = ({ nodes }) => {
  let { id } = useParams();
  const [saving, setSaving] = useState(false);
  const [publishing, setPublishing] = useState(false);

  const handleOnSave = async () => {
    setSaving(true);
    await fetch(`/api/v1/event/${id}`, {
      method: "PUT",
      body: JSON.stringify(nodes),
      headers: {
        "content-type": "application/json",
      },
    });
    setSaving(false);
  };

  const handleOnPublish = async () => {
    setPublishing(true);
    await fetch(`/api/v1/event/new?id=${id}`, {
      headers: {
        "content-type": "application/json",
      },
    });
    setPublishing(false);
  };

  return (
    <WrapHeader>
      <Link to={"/dashboard"}>
        <Button>Back to Dashboard</Button>
      </Link>
      <div>
        <Button disabled={saving} onClick={handleOnSave}>
          {saving ? "Saving..." : "Save"}
        </Button>
        <Button>Preview</Button>
        <Button disabled={publishing} onClick={handleOnPublish}>
          {publishing ? "Publishing..." : "Publish"}
        </Button>
      </div>
    </WrapHeader>
  );
};

const mapStateToProps = createStructuredSelector({
  nodes: makeSelectNodes(),
});

const withConnect = connect(mapStateToProps);

export default compose(
  withConnect,
  memo
)(CanvasHeader);
