/**
 * page.jsx
 */

import Footer from "@/components/footer/footer";
import CardGroup from "@/components/home/card-group";
import Grid from "@/components/home/grid";
import Title from "@/components/home/title";

export default async function Home() {
  return (
    <main className="flex h-full w-full flex-col">
      <Grid />
      <Title />
      <CardGroup />
      <Footer />
    </main>
  );
}
