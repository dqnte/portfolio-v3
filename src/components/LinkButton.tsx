import { Instagram } from '@mui/icons-material';
import Spotify from '../icons/Spotify';
import IconButton from './IconButton';
import { useState } from 'react';
import { Link } from 'react-router';

const LinkButton = ({ to, text, icon }: { to: string; text: string; icon: string }) => {
  const icons = {
    instagram: <Instagram />,
    music: <Spotify />,
  };
  const iconComponent = icons[icon];

  return (
    <Link to={to} target={'_blank'} className={'LinkButton'}>
      {iconComponent && <div className={'LinkButton__icon'}>{iconComponent}</div>}
      <span>{text}</span>
    </Link>
  );
};

export default LinkButton;
