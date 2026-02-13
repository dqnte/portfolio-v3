import { IAlbum, findAlbumFromLocation } from '../utilities';
import PhotoMobile from './Mobile';
import { useLocation } from 'react-router';
import AlbumPreview from './AlbumPreview';
import { AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useBreakpoint } from '../hooks';
import Riser from '../components/Riser';
import Title from '../components/Title';
import PhotoGrid from '../components/PhotoGrid';
import ScrollTop from '../components/ScrollTop';
import { useNavigate } from 'react-router';

const Photo = ({ albums }: { albums: IAlbum[] }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const [selectedAlbum, setAlbum] = useState(findAlbumFromLocation(location, albums));

  useEffect(() => {
    window.scrollTo(0, 0);
    if (location.pathname === '/photo') {
      setAlbum(null);
    } else {
      const currentAlbum = findAlbumFromLocation(location, albums);
      setAlbum(currentAlbum);
    }
  }, [location, albums]);

  const displayableAlbums = albums.filter(album => album.display === 'all' || !album.display);

  const breakpoint = useBreakpoint();

  const handleBack = () => {
    navigate('/');
  };

  const nextAlbum = displayableAlbums[displayableAlbums.indexOf(selectedAlbum) + 1];
  const handleNext = () => {
    if (nextAlbum) {
      navigate(`/photo/${nextAlbum.key}`);
    }
  };

  const prevAlbum = displayableAlbums[displayableAlbums.indexOf(selectedAlbum) - 1];
  const handlePrev = () => {
    if (prevAlbum) {
      navigate(`/photo/${prevAlbum.key}`);
    }
  };

  return (
    <AnimatePresence key={'Photo'}>
      <Riser style={{ minHeight: '100vh' }} motionKey={selectedAlbum ? 'preview' : 'album'}>
        {breakpoint === 'mobile' ? (
          <PhotoMobile albums={displayableAlbums} />
        ) : (
          <AnimatePresence key={'PhotoDesktop'} initial={false}>
            {!['/', '/photo'].includes(location.pathname) ? (
              <div className={'Photo'}>
                <Title
                  text={selectedAlbum?.location}
                  handleBack={handleBack}
                  handlePrev={prevAlbum && handlePrev}
                  handleNext={nextAlbum && handleNext}
                />
                <Riser motionKey={selectedAlbum?.key}>
                  <div className={'Photo-container'}>
                    <PhotoGrid photos={selectedAlbum?.photos ?? []} numCols={2} />
                  </div>
                </Riser>
              </div>
            ) : (
              <div className={'PhotoPreview'}>
                <h1 className={'PhotoPreview__title'}>Dante Tobar</h1>
                <AlbumPreview albums={displayableAlbums} selectedAlbum={selectedAlbum} />
              </div>
            )}
          </AnimatePresence>
        )}
      </Riser>
      <ScrollTop key={'photo'} />
    </AnimatePresence>
  );
};

export default Photo;
