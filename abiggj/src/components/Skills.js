import React from 'react';

const SkillBar = ({ skill, level }) => (
  <div className="skill-bar">
    <span>{skill}</span>
    <div className="bar">
      <div className="fill" style={{ width: `${level}%` }}></div>
    </div>
  </div>
);

const Skills = () => {
  const skills = [
    { skill: 'Python', level: 90 },
    { skill: 'Machine Learning', level: 85 },
    { skill: 'Deep Learning', level: 80 },
    // Add more skills as needed
  ];

  return (
    <div className="skills">
      <h2>My Skills</h2>
      {skills.map((skill, index) => (
        <SkillBar key={index} {...skill} />
      ))}
    </div>
  );
};

export default Skills;