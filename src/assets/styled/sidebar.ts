import { styled } from "@vue-styled-components/core";

const props = { width: String, translatepx: String };
const SideBar = styled("div", props)`
  width: ${(props) => props.width};
  height: 100%;
  position: fixed;
  background-color: var(--base03);
  top: 0;
  left: 0;
  transform: translateX(${(props) => props.translatepx});
  overflow-x: hidden;
  transition: all 350ms;
`;

export default SideBar;
