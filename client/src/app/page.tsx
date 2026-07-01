import {
  CTA,
  Hero,
  Features,
  Testimonials,
  HowItWorks,
} from "@/features/landing-page";

const Home = () => {
  return (
    <main>
      <article>
        <Hero />
        <Features />
        <HowItWorks />
        <Testimonials />
        <CTA />
      </article>
    </main>
  );
};
export default Home;
