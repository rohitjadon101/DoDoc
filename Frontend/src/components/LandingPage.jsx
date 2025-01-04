import React from "react";

const LandingPage = () => {

  return (
    <main className="bg-light py-5 px-5 min-vh-100">
      <div>
        {/* Welcome Section */}
        <div className="container text-center">
          <h1 className="display-4 text-dark">Welcome to Your Docs</h1>
          <p className="lead text-muted">
            Create, edit, and collaborate on documents with ease.
          </p>
          <div className="mt-4">
            <a className="btn btn-primary btn-lg me-3" href="/login">
              Get Started
            </a>
            <a className="btn btn-outline-secondary btn-lg" href="#">
              Learn More
            </a>
          </div>
        </div>

        {/* Features Section */}
        <div className="container mt-5" id="services">
          <h2 className="text-center mb-4">Features</h2>
          <div className="row text-center">
            <div className="col-md-4">
              <i className="fas fa-edit fa-3x text-primary mb-3"></i>
              <h5>Rich Text Editing</h5>
              <p className="text-muted">
                Use our intuitive editor to write and format your documents with ease.
              </p>
            </div>
            <div className="col-md-4">
              <i className="fas fa-users fa-3x text-success mb-3"></i>
              <h5>Collaboration</h5>
              <p className="text-muted">
                Invite others to collaborate in real-time on your documents.
              </p>
            </div>
            <div className="col-md-4">
              <i className="fas fa-cloud fa-3x text-warning mb-3"></i>
              <h5>Cloud Storage</h5>
              <p className="text-muted">
                Access your documents anytime, anywhere with secure cloud storage.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default LandingPage;