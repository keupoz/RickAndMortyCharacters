import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import styled, { DefaultTheme, ThemeProvider } from "styled-components";

import { Characters } from "./Characters";

const black = "#1b1b1b";
const white = "#ffffff";

const theme: DefaultTheme = {
  colors: {
    black,
    white,
  },

  radius: "6px",

  button: {
    styles: {
      solid: {
        background: black,
        border: black,
        color: white,
      },

      outline: {
        background: "transparent",
        border: black,
        color: black,
      },

      ghost: {
        background: "transparent",
        border: "transparent",
        color: black,
      },
    },
  },
};

const queryClient = new QueryClient();

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <AppContainer>
          <h1>Rick and Morty Characters</h1>

          <Characters />
        </AppContainer>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

const AppContainer = styled.div`
  padding: 16px;
  margin: 0 auto;

  max-width: 1024px;

  display: flex;
  flex-direction: column;
  gap: 16px;
`;
