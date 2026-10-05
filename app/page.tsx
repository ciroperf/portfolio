import About from "@/components/home/About";
import Experience from "@/components/home/Experience";
import Hero from "@/components/home/Hero";
import Stack from "@/components/home/Stack";
import Stats from "@/components/home/Stats";
import Work from "@/components/home/Work";
import Writing from "@/components/home/Writing";

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <About />
      <Stack />
      <Work />
      <Experience />
      <Writing />
    </>
  );
}
