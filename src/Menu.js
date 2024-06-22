import "./Menu.scss";

import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function Menu(props) {
  const { show, setShowMenu } = props;

  const closeMenu = () => {
    setShowMenu(false);
  };

  const SLIDE_IN = 0.125;
  const TEXT_IN = 0.025;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="Menu"
          initial={{ height: "0vh" }}
          animate={{ height: "100vh", transition: { duration: SLIDE_IN } }}
          exit={{ height: "0vh", transition: { delay: TEXT_IN * 2 } }}
        >
          <motion.div className="Menu_Grid">
            <motion.div
              className="Menu_Grid_Item"
              initial={{ opacity: 0, x: 10 }}
              animate={{
                opacity: 1,
                x: 0,
                transition: { delay: SLIDE_IN + TEXT_IN },
              }}
              exit={{ opacity: 0, x: 10 }}
            >
              <Link to="/photo" className="Menu_Link" onClick={closeMenu}>
                <span className="Menu_Link_Text">photo</span>
              </Link>
            </motion.div>
            <motion.div
              className="Menu_Grid_Item"
              initial={{ opacity: 0 }}
              animate={{
                opacity: 0.8,
                x: 0,
              }}
              exit={{ opacity: 0 }}
            ></motion.div>
            <motion.div
              className="Menu_Grid_Item"
              initial={{ opacity: 0, x: -10 }}
              animate={{
                opacity: 1,
                x: 0,
                transition: { delay: SLIDE_IN + TEXT_IN },
              }}
              exit={{ opacity: 0, x: -10 }}
            >
              <Link to="/about" className="Menu_Link" onClick={closeMenu}>
                <span className="Menu_Link_Text">about</span>
              </Link>
            </motion.div>
            {/* <motion.div */}
            {/*   className="Menu__Socials" */}
            {/*   initial={{ opacity: 0, y: -20 }} */}
            {/*   animate={{ */}
            {/*     opacity: 1, */}
            {/*     y: 0, */}
            {/*     transition: { delay: SLIDE_IN + TEXT_IN + 0.025 }, */}
            {/*   }} */}
            {/*   exit={{ opacity: 0, y: -10 }} */}
            {/* > */}
            {/*   <a */}
            {/*     href="https://www.instagram.com/dantistador/" */}
            {/*     className="Menu__Socials_Link" */}
            {/*   > */}
            {/*     Instagram */}
            {/*   </a> */}
            {/*   <a */}
            {/*     href="https://www.linkedin.com/in/dante-m-tobar/" */}
            {/*     className="Menu__Socials_Link" */}
            {/*   > */}
            {/*     LinkedIn */}
            {/*   </a> */}
            {/* </motion.div> */}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
