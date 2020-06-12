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
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  .btn-link {
    color: white;
  }
  background: #444444;
  z-index: 3;
`;

const CanvasHeader = ({ nodes, eventName }) => {
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

  const handleOnPreview = () => {
    window.open(
      `http://localhost:3001/${eventName}?env=sta`,
      `${eventName}`,
      "height=736, width=414, top=0, left=0, toolbar=no, menubar=no, scrollbars=no,location=no, status=no"
    );
  };

  return (
    <WrapHeader>
      <Link to={"/dashboard"}>
        <Button variant="link" size="sm">
          Back to Dashboard
        </Button>
      </Link>
      <div>
        <Button
          variant="link"
          size="sm"
          disabled={saving}
          onClick={handleOnSave}
        >
          {saving ? "Saving..." : "Save"}
        </Button>
        <Button variant="link" size="sm" onClick={handleOnPreview}>
          Preview
        </Button>
        <Button
          variant="link"
          size="sm"
          disabled={publishing}
          onClick={handleOnPublish}
        >
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
