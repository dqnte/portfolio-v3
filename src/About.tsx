import { AnimatePresence } from "framer-motion";

import { LinkedIn, Instagram, GitHub } from "@mui/icons-material";
import { useEffect } from "react";
import Riser from "./components/Riser";

const Socials = () => {
  return (
    <div className="Socials">
      <span className="Socials__topline" />
      <div className="Socials__links">
        <a
          href="https://www.instagram.com/dantistador/"
          target="_blank"
          rel="noreferrer"
          className="Socials--link"
        >
          <Instagram />
        </a>
        <a
          className="Socials--link"
          href="https://www.linkedin.com/in/dante-m-tobar/"
          target="_blank"
          rel="noreferrer"
        >
          <LinkedIn />
        </a>
        <a
          className="Socials--link"
          href="https://www.github.com/dqnte"
          target="_blank"
          rel="noreferrer"
        >
          <GitHub />
        </a>
      </div>
    </div>
  );
};

const Bio = () => {
  return (
    <div className="Bio">
      <h1 className="Bio__name">Dante Tobar</h1>
      <p className="Bio__text">
        I'm an engineer & photographer. I shoot both film and digital. Most of
        my photos are candids, but there are some posed exceptions. Currently, I
        work at{" "}
        <a
          href="https://www.fabrichealth.com/about"
          target="_blank"
          rel="noreferrer"
          className="Bio--link"
        >
          fabric
        </a>{" "}
        as a fullstack engineer. If you want to get in contact, feel free to dm
        me.
      </p>
    </div>
  );
};

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <AnimatePresence>
      <div className={"About"}>
        <Riser>
          <div className="About__container">
            <div className="About__image">
              <span>need to take this...</span>
            </div>
            <div className="About__text">
              <Bio />
              <Socials />
            </div>
          </div>
        </Riser>
      </div>
    </AnimatePresence>
  );
};

export default About;
