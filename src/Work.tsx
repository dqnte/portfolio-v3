import { useEffect, useState } from 'react';
import PhotoGrid from './components/PhotoGrid';
import { useLocation } from 'react-router';
import { useNavigate } from 'react-router';
import Image from './components/Image';
import LinkButton from './components/LinkButton';
import { IProject, fetchProjectManifest, findAlbumFromLocation } from './utilities';
import { Link } from 'react-router';
import Riser from './components/Riser';
import Title from './components/Title';
import ScrollTop from './components/ScrollTop';
import { AnimatePresence } from 'framer-motion';
import { useBreakpoint } from './hooks';

const WorkPreview = ({ albums }: { albums: IProject[] }) => {
  const [hovered, setHovered] = useState(null);
  const breakpoint = useBreakpoint();
  const numPhotos = breakpoint === 'mobile' ? 1 : breakpoint === 'tablet' ? 2 : 3;

  return (
    <div className={'WorkPreview'}>
      {albums.map(album => (
        <Link
          to={`/work/${album.key}`}
          key={album.key}
          className={'WorkPreview__card'}
          onMouseEnter={() => setHovered(album.key)}
          onMouseLeave={() => setHovered(null)}
        >
          <div className={`WorkPreview__card_text ${hovered === album.key && 'selected'}`}>
            {breakpoint === 'mobile' ? <h4>{album.title}</h4> : <h3>{album.title}</h3>}
          </div>
          {album.photos.slice(0, numPhotos).map(photo => (
            <Image
              key={photo.smallUrl}
              sizeOn={'w'}
              photo={photo}
              className={`WorkPreview__card_image`}
            />
          ))}
        </Link>
      ))}
    </div>
  );
};

const Work = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [work, setWork] = useState<IProject[]>([]);
  const [selectedProject, setSelectedProject] = useState<IProject | null>();

  const breakpoint = useBreakpoint();
  const numCols = breakpoint === 'mobile' ? 1 : breakpoint === 'tablet' ? 3 : 4;

  useEffect(() => {
    fetchProjectManifest().then(data => {
      setWork(data);
    });
  }, []);

  useEffect(() => {
    if (location.pathname === '/work') {
      setSelectedProject(null);
    } else {
      const currentProject = findAlbumFromLocation(location, work);
      setSelectedProject(currentProject);
    }

    window.scrollTo(0, 0);
  }, [location, work]);

  const handleBack = () => {
    navigate('/work');
  };

  const currentIndex = work.indexOf(selectedProject);
  const handleNext = () => {
    const nextProject = work[currentIndex + 1];
    navigate(`/work/${nextProject?.key}`);
  };

  const handlePrev = () => {
    const prevProject = work[currentIndex - 1];
    navigate(`/work/${prevProject?.key}`);
  };

  return (
    <AnimatePresence>
      <Riser motionKey={selectedProject ? 'single' : ''}>
        <div className={'Work'}>
          {selectedProject ? (
            <>
              <Title
                text={selectedProject.title}
                handleBack={handleBack}
                handlePrev={currentIndex > 0 && handlePrev ? handlePrev : undefined}
                handleNext={currentIndex < work.length - 1 && handleNext ? handleNext : undefined}
              />
              <Riser motionKey={selectedProject.key}>
                <div className={'Work__description'}>
                  <p className={'Work__description_text'}>{selectedProject.description}</p>
                  {selectedProject.links?.length && (
                    <div className={'Work__description_links'}>
                      {selectedProject.links.map(link => (
                        <LinkButton key={link.to} to={link.to} text={link.text} icon={link.type} />
                      ))}
                    </div>
                  )}
                </div>
                <div className={'Work__grid'}>
                  <PhotoGrid photos={selectedProject.photos} numCols={numCols} />
                </div>
              </Riser>
            </>
          ) : (
            <WorkPreview albums={work} />
          )}
        </div>
        <ScrollTop />
      </Riser>
    </AnimatePresence>
  );
};

export default Work;
