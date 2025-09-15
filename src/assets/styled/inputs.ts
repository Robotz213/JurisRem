import styled from "@vue-styled-components/core";
import { BInput } from "bootstrap-vue-next";

const InputForm = styled(BInput)`
  overflow: hidden; /* Ensures the content is not revealed until the animation */
  border-right: 0.15em solid orange; /* The typwriter cursor */
  white-space: nowrap; /* Keeps the content on a single line */
  margin: 0 auto; /* Gives that scrolling effect as the typing happens */
  letter-spacing: 0.15em; /* Adjust as needed */
`;

export { InputForm };
