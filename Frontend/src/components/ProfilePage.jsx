import React from "react";

const ProfilePage = () => {
  // Sample user data (only for Temporary use)
  const user = {
    name: "Rohit Jadon",
    email: "xyz@example.com",
    recentDocs: [
      { id: 1, title: "Title 1", lastModified: "2024-12-18" },
      { id: 2, title: "Title 2", lastModified: "2024-12-19" },
      { id: 3, title: "Title 3", lastModified: "2024-12-20" },
    ],
  };

  return (
    <div className="container py-5">
      {/* User Information */}
      <div className="row">
        <div className="col-md-4 text-center">
          <img
            src="https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png"
            alt="Avatar"
            className="rounded-circle mb-3 w-25"
          />
          <h3>{user.name}</h3>
          <p className="text-muted">{user.email}</p>
          <button className="btn btn-primary">Edit Profile</button>
        </div>

        {/* Recent Documents */}
        <div className="col-md-8">
          <h2 className="mb-4">Recent Documents</h2>
          {user.recentDocs.length > 0 ? (
            <ul className="list-group">
              {user.recentDocs.map((doc) => (
                <li
                  key={doc.id}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  <span>{doc.title}</span>
                  <small className="text-muted">
                    Last modified: {doc.lastModified}
                  </small>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted">No recent documents available.</p>
          )}

          {/* Button to Create New Document */}
          <div className="mt-4">
            <button className="btn btn-success btn-lg">
              + Create New Document
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;