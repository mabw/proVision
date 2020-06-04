import React, { memo } from "react";
import useSWR from "swr";

import { Container, Row, Col, Button } from "react-bootstrap";

const Dashboard = () => {
  return (
    <Container>
      <h1>Dashboard</h1>
      <Row>
        <Col>
          <Button>Create + </Button>
        </Col>
      </Row>
      <Row>
        <Col />
      </Row>
    </Container>
  );
};

export default memo(Dashboard);
