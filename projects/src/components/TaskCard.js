import React from "react";
import "./TaskCard.scss";
import { FaEllipsisH, FaFlag, FaComment, FaPaperclip } from "react-icons/fa";
import { Draggable } from "react-beautiful-dnd";

const TaskCard = ({
  id,
  title,
  project,
  description,
  status,
  members,
  date,
  modalHandlier,
  index,
}) => {
  return (
    <Draggable draggableId={`${id}`} key={id} index={index}>
      {(provided, snapshot) => (
        <div
          className="task-card"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
        >
          <div>
            <div className="task-card-header">
              <span>{project}</span>
              <FaEllipsisH
                className="icon"
                style={{ cursor: "pointer" }}
                onClick={(e) => {
                  e.stopPropagation();
                  modalHandlier({
                    id,
                    title,
                    project,
                    description,
                    status,
                    members,
                    date,
                  });
                }}
              />
            </div>
            <div className="taks-card-name">
              <p>{title}</p>
            </div>
          </div>
          <div className="task-card-footer">
            <span>
              <FaFlag className="icon" />
              {date}
            </span>
            <span>
              <FaComment className="icon" />3
            </span>
            <span>
              <FaPaperclip className="icon" />1
            </span>
          </div>
          {provided.placeholder}
        </div>
      )}
    </Draggable>
  );
};

export default TaskCard;
