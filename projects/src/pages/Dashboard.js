import { React, useEffect, useState } from "react";
import "./Dashboard.scss";
import ProjectCard from "../components/ProjectCard";
import { useAuthContext } from "../context/AuthContext";

const Dashboard = ({ modalHandlier }) => {
  const { user } = useAuthContext();
  const [userProjects, setUserProjects] = useState([]);

  const getUserProjects = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/user_projects/${user.id}`
      );
      const data = await response.json();
      setUserProjects(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUserProjects();
  }, []);

  return (
    <section>
      <div className="filter-container">
        <span className="title">Filter by:</span>
        <div className="filter-items-wrapper">
          <span className="filter-item">all</span>
          <span className="filter-item">mine</span>
          <span className="filter-item">development</span>
          <span className="filter-item">design</span>
          <span className="filter-item filter-item-last">marketing</span>
        </div>
      </div>
      <div className="projects-container">
        {userProjects.map((project) => {
          return (
            <ProjectCard
              key={project.id}
              id={project.id}
              title={project.name}
              description={project.description}
              status="status"
              type={project.category}
              owner={
                project.members.filter(
                  (member) =>
                    member.user_role == "owner" || member.user_role == "Owner"
                )[0]
              }
              members={project.members}
              date={project.date_created}
              deadline={project.date_due}
              modalHandlier={modalHandlier}
            />
          );
        })}
      </div>
    </section>
  );
};

export default Dashboard;
