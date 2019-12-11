import React from "react";
import GitHub from "@material-ui/icons/GitHub";
import "./styles/GitHubLink.css";

export const GitHubLink = () => (
  <a
    aria-label="Project GitHub page"
    className="GitHubLink"
    href="https://github.com/voliev/font-blender"
    rel="noopener noreferrer"
    target="_blank"
  >
    <GitHub fontSize="large" />
  </a>
);

export default React.memo(GitHubLink);
