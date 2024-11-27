import Header from "../components/header/Header";
import CTA from "../components/CTA/CTA";
import HowItWorks from "../components/howItWorks/HowItWorks";
import WhyUs from "../components/whyUs/WhyUs";
import FAQs from "../components/FAQs/FAQs";
import CtaSmall from "../components/CTAsmall/CTAsmall";
import Separator from "../components/Separator";
import useAuthStore from "../store/useAuthStore";

const Home = () => {
  const { user } = useAuthStore();
  return (
    <section className="bg-lightGray">
      <Header />
      {!user && <CTA />}
      <div className="flex flex-col  bg-lightGray">
        <HowItWorks hideSignUp={user ? true : false} />
        <Separator />
        <div className="flex justify-end">
          <WhyUs />
        </div>
        <FAQs />
        {!user && <CtaSmall />}
      </div>
    </section>
  );
};

export default Home;
