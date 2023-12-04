import { React, useRef, useState } from "react";
import "./TaskModal.scss";
import {
  FaGgCircle,
  FaCircle,
  FaCircleNotch,
  FaEllipsisH,
  FaFlag,
  FaComment,
  FaPaperclip,
} from "react-icons/fa";
import Comments from "../components/Comments";

import { FiCircle } from "react-icons/fi";
import { ImageConfig } from "../config/ImageConfig";

const TaskModal = ({ isOpen, modalHandlier }) => {
  let taskInfo = {
    id: "",
    title: "",
    project: "",
    description: "",
    status: "",
    members: [],
    date: "",
  };
  if (isOpen === true);
  else {
    taskInfo = isOpen;
  }

  const { id, title, project, description, status, members, date } = taskInfo;

  const [fileList, setFileList] = useState([]);

  const wrapperRef = useRef(null);

  const onDragOver = () => {
    wrapperRef.current.classList.add("dragover");
  };
  const onDragLeave = () => {
    wrapperRef.current.classList.remove("dragover");
  };
  const onDrop = () => {
    wrapperRef.current.classList.add("dragover");
  };

  const onFileDrop = (e) => {
    const newFile = e.target.files[0];
    console.log(newFile, newFile.type, newFile.type.split("/")[1]);
    if (newFile) {
      const updatedFileList = [...fileList, newFile];
      setFileList(updatedFileList);
    }
  };

  const fileRemove = (file) => {
    const updatedFileList = [...fileList];
    updatedFileList.splice(fileList.indexOf(file), 1);
    setFileList(updatedFileList);
    // console.log(file,fileList,"file removeed list");
  };
  return (
    <>
      {isOpen && (
        <div className="task-modal">
          <div className="modal">
            <div className="modal-sandbox"></div>
            <div className="modal-box">
              <div className="modal-header">
                <div
                  className="close-modal"
                  onClick={() => {
                    modalHandlier(false);
                  }}
                >
                  &#10006;
                </div>
                <h1>{title}</h1>
              </div>
              <div className="modal-body">
                <div className="modal-body-header">
                  <div className="tags">
                    <span>
                      <strong>{status}</strong>
                    </span>
                    <span>
                      <strong>{project}</strong>
                    </span>
                  </div>
                  <span className="project-modal-date">{date}</span>
                </div>
                <p>{description}</p>
                <div className="members">
                  {members?.map((member, index) => {
                    let random_id = Math.floor(Math.random() * 100);
                    return (
                      <img
                        src={`https://randomuser.me/api/portraits/men/${random_id}.jpg`}
                        alt={member}
                      />
                    );
                  })}
                </div>

                <br />
                <div className="subtasks-container">
                  <h3>Subtasks</h3>
                  <div className="subtasks-list">
                    <li className="subtask-item">
                      <FiCircle className="icon" />
                      <input type="text" />
                    </li>
                  </div>
                </div>
                <div className="task-modal-attachments">
                  <h3>Attachments</h3>
                  <div className="attachments-list">
                    {fileList?.map((item, index) => {
                      return (
                        <div className="attachment-item" key={index}>
                          <img
                            src={
                              ImageConfig[item.type.split("/")[1]] ||
                              ImageConfig["default"]
                            }
                            alt=""
                          />
                          <div className="attachment-item-info">
                            <p>{item.name}</p>
                            <p>{item.size}B</p>
                          </div>
                          <span
                            className="attachment-item-del"
                            onClick={() => fileRemove(item)}
                          >
                            &#10006;
                          </span>
                        </div>
                      );
                    })}
                  </div>
                  <div
                    ref={wrapperRef}
                    onDragOver={onDragOver}
                    onDragLeave={onDragLeave}
                    onDrop={onDrop}
                    className="drop-file-input"
                  >
                    <div className="drop-file-input_label">
                      <p>Click to add / drop your files here</p>
                    </div>
                    <input type="file" value="" onChange={onFileDrop} />
                  </div>
                </div>
                <Comments />
                <button
                  className="modal-button close-modal"
                  onClick={() => {
                    modalHandlier(false);
                  }}
                >
                  Close!
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TaskModal;
