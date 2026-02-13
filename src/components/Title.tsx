import { HoverButton } from './HoverButton';
import ChevronLeft from '@mui/icons-material/ChevronLeft';
import ChevronRight from '@mui/icons-material/ChevronRight';
import NorthWest from '@mui/icons-material/NorthWest';
import { motion } from 'framer-motion';

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
      <div className={'Title__buttons'}>
        {handleBack && (
          <button className={'Title__button'} onClick={handleBack}>
            back
          </button>
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
      <div className={'Title__buttons navigation'}>
        <button
          onClick={handlePrev}
          disabled={handlePrev ? false : true}
          className={'Title__button'}
        >
          prev
        </button>
        <button
          onClick={handleNext}
          disabled={handleNext ? false : true}
          className={'Title__button'}
        >
          next
        </button>
      </div>
    </div>
  );
};

export default Title;
