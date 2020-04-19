import React, { memo } from "react";

import { Grid, Row, Col } from "react-bootstrap";
import HTMLBackend from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";

import { useInjectReducer } from "utils/injectReducer";
import reducer from "./reducer";

import { WidgetsPool } from "./components/WidgetsPool";
import Canvas from "./components/Canvas";
import SettingPanels from "./components/SettingPanels";

const key = "designer";

const HomePage = () => {
  useInjectReducer({ key, reducer });

  return (
    <DndProvider backend={HTMLBackend}>
      <Grid fluid>
        <Row className="show-grid">
          <Col md={3}>
            <WidgetsPool />
          </Col>
          <Col md={6}>
            <Canvas />
          </Col>
          <Col md={3}>
            <SettingPanels />
          </Col>
        </Row>
      </Grid>
    </DndProvider>
  );
};

export default memo(HomePage);
