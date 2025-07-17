import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SkillManager = () => {
  const [skills, setSkills] = useState([]);
  const [name, setName] = useState('');
  const [level, setLevel] = useState(1);

  const fetchSkills = async () => {
    const res = await axios.get('/api/skills/me', {
      headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
    });
    setSkills(res.data);
  };

  const addSkill = async () => {
    await axios.post('/api/skills', { name, level }, {
      headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
    });
    setName('');
    setLevel(1);
    fetchSkills();
  };

  const deleteSkill = async (id) => {
    await axios.delete('/api/skills/' + id, {
      headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
    });
    fetchSkills();
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  return (
    <div>
      <h2>My Skills</h2>
      <ul>
        {skills.map(skill => (
          <li key={skill._id}>
            {skill.name} (Level {skill.level})
            <button onClick={() => deleteSkill(skill._id)}>Delete</button>
          </li>
        ))}
      </ul>
      <h3>Add New Skill</h3>
      <input value={name} onChange={e => setName(e.target.value)} placeholder="Skill Name" />
      <input type="number" value={level} onChange={e => setLevel(Number(e.target.value))} min="1" max="5" />
      <button onClick={addSkill}>Add</button>
    </div>
  );
};

export default SkillManager;
