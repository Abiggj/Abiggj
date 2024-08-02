import React from 'react';

const HobbyCard = ({ hobby, description }) => (
  <div className="hobby-card">
    <h3>{hobby}</h3>
    <p>{description}</p>
  </div>
);

const Hobbies = () => {
  const hobbies = [
    { hobby: 'Reading', description: 'I love reading sci-fi novels.' },
    { hobby: 'Hiking', description: 'I enjoy exploring nature trails.' },
    // Add more hobbies as needed
  ];

  return (
    <div className="hobbies">
      <h2>My Hobbies</h2>
      <div className="hobby-list">
        {hobbies.map((hobby, index) => (
          <HobbyCard key={index} {...hobby} />
        ))}
      </div>
    </div>
  );
};

export default Hobbies;