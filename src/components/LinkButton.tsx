import { Instagram } from "@mui/icons-material";
import Spotify  from "../icons/Spotify";
import IconButton from "./IconButton";
import { useState } from "react";
import { Link } from "react-router";

const LinkButton = ({
  to,
  text,
  icon,
}: {
  to: string;
  text: string;
  icon: string;
}) => {
  const [hovered, setHovered] = useState(false);

  const icons = {
    instagram: <Instagram />,
    music: <Spotify />,
  };
  const iconComponent = icons[icon];

  return (
    <Link
      to={to}
      target={"_blank"}
      className={"LinkButton"}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {iconComponent && (
        <IconButton hovered={hovered}>{iconComponent}</IconButton>
      )}
      <span>{text}</span>
    </Link>
  );
};

export default LinkButton;

