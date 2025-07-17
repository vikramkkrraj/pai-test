import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SkillManager = () => {
  const [skills, setSkills] = useState([]);
  const [name, setName] = useState('');
  const [level, setLevel] = useState(1);

  const fetchSkills = async () => {
    try {
      const res = await axios.get('/api/skills/me', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setSkills(res.data);
    } catch (err) {
      alert('Failed to fetch skills');
    }
  };

  const addSkill = async () => {
    try {
      await axios.post(
        '/api/skills',
        { name, level },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      setName('');
      setLevel(1);
      fetchSkills();
    } catch (err) {
      alert('Failed to add skill');
    }
  };

  const deleteSkill = async (id) => {
    try {
      await axios.delete(`/api/skills/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      fetchSkills();
    } catch (err) {
      alert('Failed to delete skill');
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  return (
    <div>
      <h2>My Skills</h2>
      <ul>
        {skills.map((skill) => (
          <li key={skill._id}>
            {skill.name} (Level {skill.level})
            <button onClick={() => deleteSkill(skill._id)}>Delete</button>
          </li>
        ))}
      </ul>
      <h3>Add Skill</h3>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Skill name"
      />
      <input
        type="number"
        min="1"
        max="5"
        value={level}
        onChange={(e) => setLevel(Number(e.target.value))}
      />
      <button onClick={addSkill}>Add</button>
    </div>
  );
};

export default SkillManager;
