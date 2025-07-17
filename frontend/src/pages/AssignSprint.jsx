import React, { useEffect, useState } from 'react';
import axios from 'axios';

 const AssignSprint = () => {
  const [developers, setDevelopers] = useState([]);
  const [form, setForm] = useState({
    title: '',
    goal: '',
    assignedTo: '',
    startDate: '',
    endDate: '',
    points: '',
  });

  // Fetch developer list
  useEffect(() => {
    const fetchDevelopers = async () => {
      try {
        const res = await axios.get('/api/users?role=developer', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setDevelopers(res.data);
      } catch (err) {
        alert('Error fetching developers');
      }
    };

    fetchDevelopers();
  }, []);

  // Handle form submission
  const handleAssign = async () => {
    const { title, goal, assignedTo, startDate, endDate, points } = form;

    if (!title || !goal || !assignedTo || !startDate || !endDate || !points) {
      return alert('All fields are required');
    }

    try {
      await axios.post(
        '/api/sprints',
        { title, goal, assignedTo, startDate, endDate, points },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      alert('Sprint assigned successfully!');
      setForm({
        title: '',
        goal: '',
        assignedTo: '',
        startDate: '',
        endDate: '',
        points: '',
      });
    } catch (err) {
      alert('Error assigning sprint: ' + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div>
      <h2>Assign New Sprint</h2>

      <input
        type="text"
        placeholder="Sprint Title"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />
      <input
        type="text"
        placeholder="Goal"
        value={form.goal}
        onChange={(e) => setForm({ ...form, goal: e.target.value })}
      />

      <select
        value={form.assignedTo}
        onChange={(e) => setForm({ ...form, assignedTo: e.target.value })}
      >
        <option value="">Select Developer</option>
        {developers.map((dev) => (
          <option key={dev._id} value={dev._id}>
            {dev.name} ({dev.email})
          </option>
        ))}
      </select>

      <input
        type="date"
        value={form.startDate}
        onChange={(e) => setForm({ ...form, startDate: e.target.value })}
      />
      <input
        type="date"
        value={form.endDate}
        onChange={(e) => setForm({ ...form, endDate: e.target.value })}
      />
      <input
        type="number"
        placeholder="Points"
        value={form.points}
        onChange={(e) => setForm({ ...form, points: e.target.value })}
      />

      <button onClick={handleAssign}>Assign Sprint</button>
    </div>
  );
};
export default AssignSprint