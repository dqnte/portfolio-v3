import { useEffect, useState } from "react";
import PhotoGrid from "./components/PhotoGrid";
import { useLocation } from "react-router";
import { useNavigate } from "react-router";
import Image from "./components/Image";
import LinkButton from "./components/LinkButton";
import {
  IProject,
  fetchProjectManifest,
  findAlbumFromLocation,
} from "./utilities";
import { Link } from "react-router";
import Riser from "./components/Riser";
import Title from "./components/Title";
import ScrollTop from "./components/ScrollTop";
import { AnimatePresence } from "framer-motion";
import { useBreakpoint } from "./hooks";

const ProjectsPreview = ({ albums }: { albums: IProject[] }) => {
  const breakpoint = useBreakpoint();
  const numPhotos =
    breakpoint === "mobile" ? 1 : breakpoint === "tablet" ? 2 : 3;

  return (
    <div className={"ProjectsPreview"}>
      {albums.map((album) => (
        <Link
          to={`/projects/${album.key}`}
          key={album.key}
          className={"ProjectsPreview__card"}
        >
          <div className={"ProjectsPreview__card_text"}>
            {breakpoint === "mobile" ? (
              <h4>{album.title}</h4>
            ) : (
              <h3>{album.title}</h3>
            )}
          </div>
          {album.photos.slice(0, numPhotos).map((photo) => (
            <Image
              sizeOn={"w"}
              photo={photo}
              className={`ProjectsPreview__card_image`}
            />
          ))}
        </Link>
      ))}
    </div>
  );
};

const Projects = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [projects, setProjects] = useState<IProject[]>([]);
  const [selectedProject, setSelectedProject] = useState<IProject | null>();

  const breakpoint = useBreakpoint();
  const numCols = breakpoint === "mobile" ? 1 : breakpoint === "tablet" ? 3 : 4;

  useEffect(() => {
    fetchProjectManifest().then((data) => {
      setProjects(data);
    });
  }, []);

  useEffect(() => {
    if (location.pathname === "/projects") {
      setSelectedProject(null);
    } else {
      const currentProject = findAlbumFromLocation(location, projects);
      setSelectedProject(currentProject);
    }

    window.scrollTo(0, 0);
  }, [location, projects]);

  const handleBack = () => {
    navigate("/projects");
  };

  const currentIndex = projects.indexOf(selectedProject);
  const handleNext = () => {
    const nextProject = projects[currentIndex + 1];
    navigate(`/projects/${nextProject?.key}`);
  };

  const handlePrev = () => {
    const prevProject = projects[currentIndex - 1];
    navigate(`/projects/${prevProject?.key}`);
  };

  return (
    <AnimatePresence>
      <Riser motionKey={selectedProject ? "single" : ""}>
        <div className={"Projects"}>
          {selectedProject ? (
            <>
              <Title
                text={selectedProject.title}
                handleBack={handleBack}
                handlePrev={currentIndex > 0 && handlePrev}
                handleNext={currentIndex < projects.length - 1 && handleNext}
              />
              <Riser motionKey={selectedProject.key}>
                <div className={"Projects__description"}>
                  <p className={"Projects__description_text"}>
                    {selectedProject.description}
                  </p>
                  {selectedProject.links?.length && (
                    <div className={"Projects__description_links"}>
                      {selectedProject.links.map((link) => (
                        <LinkButton
                          to={link.to}
                          text={link.text}
                          icon={link.type}
                        />
                      ))}
                    </div>
                  )}
                </div>
                <div className={"Projects__grid"}>
                  <PhotoGrid
                    photos={selectedProject.photos}
                    numCols={numCols}
                  />
                </div>
              </Riser>
            </>
          ) : (
            <ProjectsPreview albums={projects} />
          )}
        </div>
        <ScrollTop />
      </Riser>
    </AnimatePresence>
  );
};

export default Projects;
