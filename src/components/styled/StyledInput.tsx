import styled from "styled-components";

export const StyledInput = styled.input`
  background: ${(props) => props.theme.colors.white};
  border: 2px solid ${(props) => props.theme.colors.black};
  border-radius: ${(props) => props.theme.radius};
  font: inherit;
  padding: 8px 16px;

  width: auto;
`;
