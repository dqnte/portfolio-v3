import ArrowUpward from '@mui/icons-material/ArrowUpward';
import { HoverButton } from '../components/HoverButton';

export default function ScrollTop() {
  return (
    <div className={'ScrollTop'}>
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
