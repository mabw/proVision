import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-content: center;
  flex-wrap: wrap;
  img {
    width: ${(props) => 100 / props.columns}%;
  }
`;
