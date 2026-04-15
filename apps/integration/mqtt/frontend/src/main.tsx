import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ErrorBoundary } from "react-error-boundary";
import { Container, Heading, Stack, Text } from "@vibe-architecture/react";
import { StudyProject } from "./app/StudyProject";
import "@vibe-architecture/css/all.css";
import "./styles.css";

const queryClient = new QueryClient();

function ErrorFallback() {
  return (
    <Container>
      <Stack gap="var(--va-space-12)">
        <Heading level={1}>Project runtime error</Heading>
        <Text>프론트엔드 렌더링 중 오류가 발생했습니다.</Text>
      </Stack>
    </Container>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <QueryClientProvider client={queryClient}>
        <StudyProject />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ErrorBoundary>
  </React.StrictMode>,
);
