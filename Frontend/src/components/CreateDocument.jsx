import React from "react";

const CreateDocument = () => {
  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8 col-md-10">
          {/* Page Header */}
          <div className="mb-4 text-center">
            <h2 className="fw-bold text-primary">Create New Document</h2>
            <p className="text-muted">Fill in the details below to create a new document.</p>
          </div>

          {/* Form */}
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <form>
                {/* Document Title */}
                <div className="mb-4">
                  <label htmlFor="documentTitle" className="form-label fw-bold">
                    Document Title
                  </label>
                  <input
                    type="text"
                    id="documentTitle"
                    className="form-control"
                    placeholder="Enter document title"
                  />
                </div>

                {/* Document Content */}
                <div className="mb-4">
                  <label htmlFor="documentContent" className="form-label fw-bold">
                    Document Content
                  </label>
                  <textarea
                    id="documentContent"
                    className="form-control"
                    rows="10"
                    placeholder="Start typing your document here..."
                  ></textarea>
                </div>

                {/* Action Buttons */}
                <div className="d-flex justify-content-end mt-4">
                  <button type="button" className="btn btn-secondary me-3">
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Save Document
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateDocument;