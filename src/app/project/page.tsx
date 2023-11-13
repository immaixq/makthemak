"use client"
import React, { useState } from "react";
import { motion } from "framer-motion";

const ProjectPage = () => {
    const [projects, setProjects] = useState([
      {
        title: "Project 1",
        description: "This is a description of Project 1.",
        // image: "https://images.unsplash.com/photo-1616091238212-aca6808e3cf0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHByb2plY3QlMjBwYWdlfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
        id: 0
      }]);

      return (
        <div>
          <h1 className="font-bold text-5xl font-serif mb-8">Projects</h1>
          <ul>
            {projects.map((project) => (
              <li key={project.id}>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                <h2>{project.title}</h2>
                  {/* <a href={project.image}>
                    <img src={project.image} alt={project.title} />
                  </a> */}
                  <p>{project.description}</p>
                </motion.div>
              </li>
            ))}
          </ul>
        </div>
      );
    };

    export default ProjectPage;
