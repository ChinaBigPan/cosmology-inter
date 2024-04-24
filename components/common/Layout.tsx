import { Container } from "@interchain-ui/react";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Container maxWidth="64rem" attributes={{ py: "$14" }}>
      {children}
    </Container>
  );
}
