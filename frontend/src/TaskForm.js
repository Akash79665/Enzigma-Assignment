import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function TaskForm() {
  const [task, setTask] = useState({
    userid: '',
    username: '',
    status: 'Not Started',
    due_date: '',
    priority: 'Normal',
    comments: ''
  });

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      axios.get('http://localhost:3000/api/tasks')
        .then(res => {
          const found = res.data.find(t => t.userid === parseInt(id));
          if (found) setTask(found);
        });
    }
  }, [id]);

  const handleChange = e => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    const url = id ? `http://localhost:3000/api/task/${id}` : 'http://localhost:3000/api/task';
    const method = id ? axios.put : axios.post;

    method(url, task)
      .then(() => navigate('/'))
      .catch(err => console.error(err));
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Edit Task</h2>
        <form onSubmit={handleSubmit}>
          {!id && (
            <div>
              <label>Assigned To *</label>
              <input
                type="text"
                name="userid"
                value={task.userid}
                onChange={handleChange}
                required
              />
            </div>
          )}
          <div>
            <label>Assigned To *</label>
            <input
              type="text"
              name="username"
              value={task.username}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Status *</label>
            <select name="status" value={task.status} onChange={handleChange}>
              <option>Not Started</option>
              <option>In Progress</option>
              <option>Completed</option>
            </select>
          </div>
          <div>
            <label>Due Date</label>
            <input
              type="date"
              name="due_date"
              value={task.due_date.split('T')[0]}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Priority *</label>
            <select name="priority" value={task.priority} onChange={handleChange}>
              <option>Low</option>
              <option>Normal</option>
              <option>High</option>
            </select>
          </div>
          <div>
            <label>Description</label>
            <textarea
              name="comments"
              value={task.comments}
              onChange={handleChange}
            />
          </div>
          <div className="modal-actions">
            <button type="button" onClick={() => navigate('/')}>Cancel</button>
            <button type="submit">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TaskForm;
