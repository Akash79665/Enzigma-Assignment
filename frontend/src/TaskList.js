import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import DeleteConfirm from './DeleteConfirm';

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3000/api/tasks')
      .then(res => setTasks(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleDelete = () => {
    axios.delete(`http://localhost:3000/api/task/${selectedTask.userid}`)
      .then(() => {
        setTasks(tasks.filter(task => task.userid !== selectedTask.userid));
        setSelectedTask(null);
      });
  };

  return (
    <div>
      <h2>Tasks</h2>
      <button onClick={() => navigate('/new')}>New Task</button>
      <table>
        <thead>
          <tr>
            <th>Assigned To</th>
            <th>Status</th>
            <th>Due Date</th>
            <th>Priority</th>
            <th>Comments</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map(task => (
            <tr key={task.userid}>
              <td>{task.username}</td>
              <td>{task.status}</td>
              <td>{new Date(task.due_date).toLocaleDateString()}</td>
              <td>{task.priority}</td>
              <td>{task.comments}</td>
              <td>
                <button onClick={() => navigate(`/edit/${task.userid}`)}>Edit</button>
                <button onClick={() => setSelectedTask(task)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedTask && (
        <DeleteConfirm
          task={selectedTask}
          onConfirm={handleDelete}
          onCancel={() => setSelectedTask(null)}
        />
      )}
    </div>
  );
}

export default TaskList;
