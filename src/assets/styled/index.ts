import { styled } from "@vue-styled-components/core";
const props = { marginLeft: String };

const MainFrame = styled("div", props)`
  height: 100%;
  padding: 60px;
  margin-left: ${(props) => props.marginLeft || "0px"};
  transition: margin-left 500ms;
`;

export { MainFrame };
