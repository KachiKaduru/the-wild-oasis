import styled, { css } from "styled-components";

const Heading = styled.h1`
  line-height: 1.4;

  ${(props) =>
    props.as === "h1" &&
    css`
      font-size: 3rem;
      font-weight: 700;
      text-transform: capitalize;
    `}
  ${(props) =>
    props.as === "h2" &&
    css`
      font-size: 2rem;
      font-weight: 600;
      text-transform: capitalize;
    `}
  ${(props) =>
    props.as === "h3" &&
    css`
      font-size: 1.5rem;
      font-weight: 600;
      text-transform: capitalize;
    `}
`;

export default Heading;
