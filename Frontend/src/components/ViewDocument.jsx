import React from "react";

const ViewDocument = () => {
  // Sample document data (replace with dynamic data)
  const document = {
    title: "Sample Document Title",
    lastModified: "December 28, 2024",
    content: `
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed egestas orci at urna interdum, a hendrerit lectus tristique.
      Ut interdum lacus vel vehicula fermentum. Curabitur fringilla, lorem ac suscipit aliquet, erat sapien consequat turpis,
      non vehicula nunc erat a tortor.
    `,
  };

  return (
    <div className="container py-5">
      {/* Document Header */}
      <div className="row mb-4">
        <div className="col">
          <div className="d-flex justify-content-between align-items-center">
            <h1 className="fw-bold text-primary">{document.title}</h1>
            <div>
              <button className="btn btn-secondary me-2">
                <i className="bi bi-arrow-left"></i> Back to List
              </button>
              <button className="btn btn-warning me-2">
                <i className="bi bi-pencil"></i> Edit
              </button>
              <button className="btn btn-danger">
                <i className="bi bi-trash"></i> Delete
              </button>
            </div>
          </div>
          <p className="text-muted fs-6">Last modified on {document.lastModified}</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="row">
        <div className="col">
          <div className="card shadow-lg border-0 mb-4">
            <div className="card-body p-4">
              <p className="text-dark fs-5 lh-lg">{document.content}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewDocument;