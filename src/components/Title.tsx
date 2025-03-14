import { HoverButton } from "./HoverButton";
import ChevronLeft from "@mui/icons-material/ChevronLeft";
import ChevronRight from "@mui/icons-material/ChevronRight";
import NorthWest from "@mui/icons-material/NorthWest";
import { motion } from "framer-motion";

const Title = ({
  text,
  handleBack,
  handlePrev,
  handleNext,
}: {
  text?: string;
  handlePrev?: () => void;
  handleNext?: () => void;
  handleBack?: () => void;
}) => {
  return (
    <div className={`Title`}>
      <div className={"Title__buttons"}>
        {handleBack && (
          <HoverButton
            direction={"up"}
            text={"back"}
            component={<NorthWest />}
            onClick={handleBack}
            disabled={false}
            className={"Title__button"}
          />
        )}
      </div>
      <motion.div
        key={text}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 0.2 } }}
        exit={{ opacity: 0 }}
      >
        <h2>{text}</h2>
      </motion.div>
      <div className={"Title__buttons navigation"}>
        <HoverButton
          direction={"left"}
          text={"prev"}
          component={<ChevronLeft />}
          onClick={handlePrev}
          disabled={handlePrev ? false : true}
          className={"Title__button"}
        />
        <HoverButton
          direction={"right"}
          text={"next"}
          component={<ChevronRight />}
          onClick={handleNext}
          disabled={handleNext ? false : true}
          className={"Title__button"}
        />
      </div>
    </div>
  );
};

export default Title;
