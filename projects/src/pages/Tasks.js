import "./Tasks.scss";
import TaskCard from "../components/TaskCard";
import { FaEllipsisH, FaPlus } from "react-icons/fa";
import TaskModal from "../modals/TaskModal";
import { useState } from "react";
import CreateTaskModal from "../modals/CreateTaskModal";
import { DragDropContext } from "react-beautiful-dnd";
import TasksColumn from "../components/TasksColumn";
import { globalTasks } from "../assets";

const Tasks = () => {
  const [isOpenTaskModal, setIsOpenTaskModal] = useState(false);
  const TaskModalHandlier = (value) => {
    setIsOpenTaskModal(value);
  };
  const [isOpenCreateTaskModal, setIsOpenCreateTaskModal] = useState(false);
  const CreateTaskModalHandlier = (value) => {
    setIsOpenCreateTaskModal(value);
  };

  const [tasksReady, setTasksReady] = useState(
    globalTasks.filter((task) => task.status === "ready")
  );
  const [tasksInProgress, setTasksInProgress] = useState(
    globalTasks.filter((task) => task.status === "in-progress")
  );
  const [tasksNeedsReview, setTasksNeedsReview] = useState(
    globalTasks.filter((task) => task.status === "needs-review")
  );
  const [tasksDone, setTasksDone] = useState(
    globalTasks.filter((task) => task.status === "done")
  );

  const handleDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (destination == null) return;

    if (source.droppableId === destination.droppableId) return;

    // find task being dragged
    const task = globalTasks.find((task) => task.id == draggableId);

    // remove from source array
    switch (source.droppableId) {
      case "ready":
        let updatedTasksReady = tasksReady.filter(
          (task) => task.id != draggableId
        );
        setTasksReady(updatedTasksReady);
        break;
      case "in-progress":
        let updatedTasksInProgress = tasksInProgress.filter(
          (task) => task.id != draggableId
        );
        setTasksInProgress(updatedTasksInProgress);
        break;
      case "needs-review":
        let updatedTasksNeedsReview = tasksNeedsReview.filter(
          (task) => task.id != draggableId
        );
        setTasksNeedsReview(updatedTasksNeedsReview);
        break;
      case "done":
        let updatedTasksDone = tasksDone.filter(
          (task) => task.id != draggableId
        );
        setTasksDone(updatedTasksDone);
        break;
      default:
        break;
    }

    // add to destination array
    switch (destination.droppableId) {
      case "ready":
        let updatedTasksReady = [...tasksReady];
        updatedTasksReady.splice(destination.index, 0, task);
        setTasksReady(updatedTasksReady);
        break;
      case "in-progress":
        let updatedTasksInProgress = [...tasksInProgress];
        updatedTasksInProgress.splice(destination.index, 0, task);
        setTasksInProgress(updatedTasksInProgress);
        break;
      case "needs-review":
        let updatedTasksNeedsReview = [...tasksNeedsReview];
        updatedTasksNeedsReview.splice(destination.index, 0, task);
        setTasksNeedsReview(updatedTasksNeedsReview);
        break;
      case "done":
        let updatedTasksDone = [...tasksDone];
        updatedTasksDone.splice(destination.index, 0, task);
        setTasksDone(updatedTasksDone);
        break;
      default:
        break;
    }
  };
  return (
    <>
      <TaskModal isOpen={isOpenTaskModal} modalHandlier={TaskModalHandlier} />
      <CreateTaskModal
        isOpen={isOpenCreateTaskModal}
        modalHandlier={CreateTaskModalHandlier}
      />
      <DragDropContext onDragEnd={handleDragEnd}>
        <section className="section-tasks">
          <div className="section-tasks-header">
            <h1>Tasks</h1>
            <FaPlus
              className="icon"
              onClick={() => {
                CreateTaskModalHandlier(true);
              }}
            />
          </div>
          <div className="tasks-container">
            <TasksColumn
              status="Ready"
              tasks={tasksReady}
              id="ready"
              modalHandlier={TaskModalHandlier}
            />
            <TasksColumn
              status="In progress"
              tasks={tasksInProgress}
              id="in-progress"
              modalHandlier={TaskModalHandlier}
            />
            <TasksColumn
              status="Review"
              tasks={tasksNeedsReview}
              id="needs-review"
              modalHandlier={TaskModalHandlier}
            />
            <TasksColumn
              status="Done"
              tasks={tasksDone}
              id="done"
              modalHandlier={TaskModalHandlier}
            />
          </div>
        </section>
      </DragDropContext>
    </>
  );
};

export default Tasks;
