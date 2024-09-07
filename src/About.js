import { motion, AnimatePresence } from "framer-motion";

import { Mail } from "@mui/icons-material";
import { LinkedIn, Instagram } from "@mui/icons-material";

import "./About.scss";

import { page } from "./transitions";
export default function About() {
  return (
    <AnimatePresence>
      <motion.div
        initial={page.initial}
        animate={page.animate}
        exit={page.exit}
      >
        <div className="About">
          <img className="About__image" src="/F17.jpg" />
          <div className="About__text">
            <div className="About__bio">
              <p>I'M AM DANTE TOBAR, AN ENGINEER/PHOTOGRAPHER.</p>
              <p>
                I SHOOT BOTH FILM AND DIGITAL. MOST OF MY PHOTOS ARE CANDIDS,
                BUT THERE ARE SOME POSED EXCEPTIONS.
              </p>
              <p>
                CURRENTLY, I WORK AT{" "}
                <a
                  href="https://www.fabrichealth.com/about"
                  target="_blank"
                  rel="noreferrer"
                >
                  FABRIC
                </a>{" "}
                AS A FULLSTACK ENGINEER.
              </p>
              <p>IF YOU WANT TO GET IN CONTACT, FEEL FREE TO EMAIL OR DM ME.</p>
            </div>
            <div className="About__socials">
              <div className="About__socials_link">
                <Mail />
                dante.m.tobar@gmail.com
              </div>
              <a
                href="https://www.instagram.com/dantistador/"
                target="_blank"
                rel="noreferrer"
                className="About__social_link"
              >
                <Instagram />
                @dantistador
              </a>
              <a
                className="About__social_link"
                href="https://www.linkedin.com/in/dante-m-tobar/"
                target="_blank"
                rel="noreferrer"
              >
                <LinkedIn />
                dante-m-tobar
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
