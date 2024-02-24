/// <reference types="vite/client" />
import "styled-components";

declare module "styled-components" {
  export interface ButtonStyleTheme {
    background: string;
    border: string;
    color: string;
  }

  export interface ButtonTheme {
    styles: {
      solid: ButtonStyleTheme;
      outline: ButtonStyleTheme;
      ghost: ButtonStyleTheme;
    };
  }

  export interface DefaultTheme {
    colors: {
      black: string;
      white: string;
    };

    radius: string;

    button: ButtonTheme;
  }
}
