import { AnimatePresence } from "framer-motion";

// import { Mail } from "@mui/icons-material";
import { LinkedIn, Instagram } from "@mui/icons-material";
import Riser from "./components/Riser";

import "./About.scss";

export default function About() {
  return (
    <AnimatePresence>
      <div className={"About"}>
        <Riser>
          <div className="About__container">
            <img className="About__image" src="/F17.jpg" />
            <div className="About__text">
              <div className="About__bio">
                <p>
                  I'm Dante Tobar, an engineer & photographer. I shoot both film
                  and digital. Most of my photos are candids, but there are some
                  posed exceptions. Currently, I work at{" "}
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
              <span className="About__divider" />
              <div className="About__socials">
                {/* <div className="About__socials_link"> */}
                {/*   <Mail /> */}
                {/*   {/1* dante.m.tobar@gmail.com *1/} */}
                {/* </div> */}
                <a
                  href="https://www.instagram.com/dantistador/"
                  target="_blank"
                  rel="noreferrer"
                  className="About__social_link"
                >
                  <Instagram />
                  {/* @dantistador */}
                </a>
                <a
                  className="About__social_link"
                  href="https://www.linkedin.com/in/dante-m-tobar/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <LinkedIn />
                  {/* dante-m-tobar */}
                </a>
              </div>
            </div>
          </div>
        </Riser>
      </div>
    </AnimatePresence>
  );
}
