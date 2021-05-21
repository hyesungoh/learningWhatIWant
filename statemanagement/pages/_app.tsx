import React from "react";
import type { AppProps } from "next/app";

import { ChakraProvider } from "@chakra-ui/react";

import { RecoilRoot } from "recoil";

import { ReactQueryDevtools } from "react-query/devtools";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <RecoilRoot>
            <QueryClientProvider client={queryClient}>
                <ChakraProvider>
                    <Component {...pageProps} />
                </ChakraProvider>
                <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
        </RecoilRoot>
    );
}

export default MyApp;
