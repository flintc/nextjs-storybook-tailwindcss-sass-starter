import { RecoilRoot } from "recoil";
import { QueryClient, QueryClientProvider } from "react-query";

import "../src/styles/globals.scss";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

export const decorators = [
  (Story, { args: {} }) => {
    const queryClient = new QueryClient();
    return (
      <RecoilRoot>
        <QueryClientProvider client={queryClient}>
          <Story />
        </QueryClientProvider>
      </RecoilRoot>
    );
  },
];
