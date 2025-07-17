import React, { useEffect, useReducer, useRef, useState } from 'react';
import axios from 'axios';

const reducer = (state, action) => {
  if (action.type === 'TOGGLE') {
    return { ...state, showCompletedOnly: !state.showCompletedOnly };
  }
  return state;
};

const SprintOverview = () => {
  const [sprints, setSprints] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const topRef = useRef(null);
  const itemsPerPage = 5;

  const [state, dispatch] = useReducer(reducer, { showCompletedOnly: false });

  const fetchSprints = async () => {
    try {
      const res = await axios.get(
        `/api/sprints?completed=${state.showCompletedOnly}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      setSprints(res.data);
    } catch (err) {
      alert('Failed to fetch sprints');
    }
  };

  useEffect(() => {
    fetchSprints();
  }, [state.showCompletedOnly]);

  useEffect(() => {
    topRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [currentPage]);

  const displayed = sprints.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const totalPages = Math.ceil(sprints.length / itemsPerPage);

  return (
    <div>
      <div ref={topRef}></div>
      <h2>Sprint Overview</h2>
      <button onClick={() => dispatch({ type: 'TOGGLE' })}>
        {state.showCompletedOnly ? 'Show All' : 'Show Completed Only'}
      </button>
      <ul>
        {displayed.map((sprint) => (
          <li key={sprint._id}>
            <strong>{sprint.title}</strong> ({sprint.startDate} - {sprint.endDate}) —{' '}
            {sprint.completed ? '✅ Completed' : '⏳ In Progress'} | Points: {sprint.points}
          </li>
        ))}
      </ul>
      <div>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            disabled={i + 1 === currentPage}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SprintOverview;
