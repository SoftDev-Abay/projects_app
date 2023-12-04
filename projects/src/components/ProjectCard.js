import { React, useState } from "react";
import "./ProjectCard.scss";

const ProjectCard = ({
  id,
  title,
  description,
  status,
  type,
  owner,
  members,
  date,
  modalHandlier,
}) => {
  const [descriptionFull, setDescriptionFull] = useState(false);

  return (
    <div
      className="project-card "
      onClick={() => {
        modalHandlier({
          id,
          title,
          description,
          status,
          type,
          owner,
          members,
          date,
        });
      }}
    >
      <div>
        <h4 className="title">{title}</h4>
        <span className="date">{date}</span>
        <p
          className={`description ${descriptionFull ? "description-full" : ""}`}
        >
          {description}
        </p>
        {description.length > 255 && !descriptionFull && (
          <span
            className="read-more"
            onClick={(e) => {
              e.stopPropagation();
              setDescriptionFull(true);
            }}
          >
            Read more
          </span>
        )}
        {description.length > 255 && descriptionFull && (
          <span
            className="read-more"
            onClick={(e) => {
              e.stopPropagation();
              setDescriptionFull(false);
            }}
          >
            Read less
          </span>
        )}
      </div>
      <div className="members">
        {members.map((member, index) => {
          let random_id = Math.floor(Math.random() * 100);
          return (
            <img
              src={`https://randomuser.me/api/portraits/men/${random_id}.jpg`}
              alt={member}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ProjectCard;
