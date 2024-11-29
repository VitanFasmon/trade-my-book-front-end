import Header from "../components/header/Header";
import CTA from "../components/CTA/CTA";
import HowItWorks from "../components/howItWorks/HowItWorks";
import WhyUs from "../components/whyUs/WhyUs";
import FAQs from "../components/FAQs/FAQs";
import CtaSmall from "../components/CTAsmall/CTAsmall";
import useAuthStore from "../store/useAuthStore";

const Home = () => {
  const { isAuthenticated } = useAuthStore();
  return (
    <section className="bg-lightGray">
      <Header />
      {!isAuthenticated && <CTA />}
      <div className="flex flex-col  bg-lightGray">
        <HowItWorks hideSignUp={isAuthenticated} />
        <div className="flex justify-end">
          <WhyUs />
        </div>
        <FAQs />
        {!isAuthenticated && <CtaSmall />}
      </div>
    </section>
  );
};

export default Home;
