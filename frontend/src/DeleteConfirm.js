import React from 'react';

function DeleteConfirm({ task, onConfirm, onCancel }) {
  return (
    <div className="modal delete">
      <div className="modal-content">
        <h2 style={{ color: 'white', backgroundColor: '#d9534f', padding: '10px' }}>Delete</h2>
        <p style={{ padding: '10px' }}>
          Do you want to delete task <strong>{task.username}</strong>?
        </p>
        <div className="modal-actions">
          <button onClick={onCancel} style={{ backgroundColor: '#ccc' }}>No</button>
          <button onClick={onConfirm} style={{ backgroundColor: '#d9534f', color: 'white' }}>Yes</button>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirm;
