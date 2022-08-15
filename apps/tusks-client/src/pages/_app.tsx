import { ChakraProvider } from '@chakra-ui/react';
// import { ReactQueryDevtools } from "react-query/devtools"
import { QueryClient, QueryClientProvider } from 'react-query';
import {
  AuthContextProvider,
  GlobalContextProvider,
  ThemeProvider,
} from '../lib/providers';
import Layout from '../components/layout';

const queryClient = new QueryClient();

const AppComponent = ({ Component, pageProps }: any) => {
  return (
    <ThemeProvider>
      <ChakraProvider>
        <AuthContextProvider>
          <GlobalContextProvider>
            <QueryClientProvider client={queryClient}>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </QueryClientProvider>
          </GlobalContextProvider>
        </AuthContextProvider>
      </ChakraProvider>
    </ThemeProvider>
  );
};

export default AppComponent;
