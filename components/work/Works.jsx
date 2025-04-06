/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { projectsData, projectsNav } from './Data';
import WorksItems from './WorksItems';

const Works = () => {
    const [item, setItem] = useState({ name: 'all' });
    const [projects, setProjects] = useState([]);
    const [active, setActive] = useState(0); // Default to "All"

    useEffect(() => {
        if (item.name === "all") {
            setProjects(projectsData);
        } else {
            const newProjects = projectsData.filter((project) => project.category === item.name);
            setProjects(newProjects);
        }
    }, [item]);

    const handleClick = (e, index) => {
        setItem({ name: e.target.textContent.toLowerCase() });
        setActive(index);
    };

    return (
        <div>
            <div className="work__filters">
                {projectsNav.map((item, index) => (
                    <span
                        onClick={(e) => handleClick(e, index)}
                        className={`work__item ${active === index ? 'active-work' : ''}`} 
                        key={index}
                    >
                        {item.name}
                    </span>
                ))}
            </div>

            <div className="work__container container grid">
                {projects.map((item) => (
                    <WorksItems item={item} key={item.id} />
                ))}
            </div>
        </div>
    );
};

export default Works;
