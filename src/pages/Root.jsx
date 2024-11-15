// eslint-disable-next-line no-unused-vars
import React from "react";
import Hero from "../components/Hero";
import Services from "../components/Services";
import Steps from "../components/Steps";
import Testimonials from "../components/Testimonials";
import About from "../components/About";

function Root() {
  return (
    <div>
      <Hero />
      <About />

      <Services />
      <Steps />
      <Testimonials />
    </div>
  );
}

export default Root;
