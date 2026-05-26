import {CTA ,Hero ,Features ,Testimonials ,HowItWorks} from "@/features/home";
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
