import ArrowUpward from '@mui/icons-material/ArrowUpward';
import { LinkedIn, Instagram, GitHub } from '@mui/icons-material';
import { HoverButton } from '../components/HoverButton';
import IconButton from '../components/IconButton';

export default function ScrollTop({ showLinks = true }: { showLinks: boolean }) {
  const year = new Date().getFullYear();

  return (
    <div className={'ScrollTop'}>
      {showLinks && (
        <div className={'ScrollTop__links'}>
          <a
            href="https://www.instagram.com/dantistador/"
            target="_blank"
            rel="noreferrer"
            className="ScrollTop__link"
          >
            <IconButton>
              <Instagram />
            </IconButton>
          </a>
          <a
            className="ScrollTop__link"
            href="https://www.linkedin.com/in/dante-m-tobar/"
            target="_blank"
            rel="noreferrer"
          >
            <IconButton>
              <LinkedIn />
            </IconButton>
          </a>
          <a
            className="ScrollTop__link"
            href="https://www.github.com/dqnte"
            target="_blank"
            rel="noreferrer"
          >
            <IconButton>
              <GitHub />
            </IconButton>
          </a>
        </div>
      )}
      <div className={'ScrollTop__signature'}>
        COPYRIGHT {year} © DANTE TOBAR
        <br />
        ALL RIGHTS RESERVED
      </div>
      <HoverButton
        direction={'up'}
        text={'top'}
        component={<ArrowUpward />}
        onClick={() => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        className={'ScrollTop__button'}
      />
    </div>
  );
}
