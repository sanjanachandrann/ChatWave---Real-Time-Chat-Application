import React from 'react';

function UserList({ users, currentUser }) {
  const getAvatarColor = (username) => {
    const colors = [
      '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', 
      '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9'
    ];
    let hash = 0;
    for (let i = 0; i < username.length; i++) {
      hash = username.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
  };

  const getInitials = (username) => {
    return username.charAt(0).toUpperCase();
  };

  return (
    <div className="user-list">
      <div className="user-list-header">
        <h3>👥 Online Users</h3>
        <span className="user-count-badge">{users.length}</span>
      </div>
      
      <div className="users-container">
        {users.map((user) => (
          <div 
            key={user.id} 
            className={`user-item ${user.username === currentUser ? 'current-user' : ''}`}
          >
            <div 
              className="user-avatar"
              style={{ backgroundColor: getAvatarColor(user.username) }}
            >
              {getInitials(user.username)}
            </div>
            <div className="user-info">
              <span className="username">
                {user.username}
                {user.username === currentUser && <span className="you-label"> (You)</span>}
              </span>
              <div className="user-status">
                <div className="status-dot online"></div>
                <span>Online</span>
              </div>
            </div>
          </div>
        ))}
        
        {users.length === 0 && (
          <div className="no-users">
            <span>🔍</span>
            <p>No users online</p>
          </div>
        )}
      </div>
      
      <div className="user-list-footer">
        <div className="connection-status">
          <div className="status-dot online"></div>
          <span>Connected</span>
        </div>
      </div>
    </div>
  );
}

export default UserList;
