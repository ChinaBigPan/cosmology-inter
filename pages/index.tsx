import { Divider } from "@interchain-ui/react";
import { Layout, ChainList } from "@/components";


export default function Home() {
  return (
      <Layout>
        <Divider mt="$16" mb="$16" />
        <ChainList />
        <Divider mb="$16" mt="$16" />
      </Layout>
  );
}
