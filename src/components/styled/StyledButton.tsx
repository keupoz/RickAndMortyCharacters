import styled, { ButtonTheme, css } from "styled-components";

export interface StyledButtonProps {
  variant?: keyof ButtonTheme["styles"];
}

export const StyledButton = styled.button<StyledButtonProps>`
  border: 2px solid;
  border-radius: ${(props) => props.theme.radius};
  font: inherit;
  padding: 8px 16px;

  ${(props) => {
    const style = props.theme.button.styles[props.variant ?? "solid"];

    return css`
      background: ${style.background};
      border-color: ${style.border};
      color: ${style.color};
    `;
  }}

  &:not(:disabled):hover {
    ${(props) => {
      const style = props.theme.button.styles.solid;

      return css`
        background: ${style.background};
        border-color: ${style.border};
        color: ${style.color};
      `;
    }}
  }
`;
