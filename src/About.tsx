import { AnimatePresence } from "framer-motion";

// import { Mail } from "@mui/icons-material";
import { LinkedIn, Instagram, GitHub } from "@mui/icons-material";
import Riser from "./components/Riser";

import "./About.scss";

export default function About() {
  return (
    <AnimatePresence>
      <div className={"About"}>
        <Riser>
          <div className="About__container">
            {/* <img className="About__image" src="" /> */}
            <div className="About__image">
              <span>need to take this...</span>
            </div>
            <div className="About__text">
              <div className="About__bio">
                <h1 className="About__name">Dante Tobar</h1>
                <p>
                  I'm an engineer & photographer. I shoot both film and digital.
                  Most of my photos are candids, but there are some posed
                  exceptions. Currently, I work at{" "}
                  <a
                    href="https://www.fabrichealth.com/about"
                    target="_blank"
                    rel="noreferrer"
                  >
                    fabric
                  </a>{" "}
                  as a fullstack engineer. If you want to get in contact, feel
                  free to dm me.
                </p>
              </div>
              <div className="About__socials">
                <span className="About__socials_topline" />
                <div className="About__socials_links">
                  <a
                    href="https://www.instagram.com/dantistador/"
                    target="_blank"
                    rel="noreferrer"
                    className="About__social_link"
                  >
                    <Instagram />
                  </a>
                  <a
                    className="About__social_link"
                    href="https://www.linkedin.com/in/dante-m-tobar/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <LinkedIn />
                  </a>
                  <a
                    className="About__social_link"
                    href="https://www.github.com/dqnte"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <GitHub />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Riser>
      </div>
    </AnimatePresence>
  );
}
