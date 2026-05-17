import React, { useEffect, useState } from 'react';

const API_BASE = process.env.REACT_APP_CODESPACE_NAME
  ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api`
  : 'http://localhost:8000/api';

const getDisplayValue = (item) => {
  if (!item || typeof item !== 'object') return String(item);
  return (
    item.name ||
    item.title ||
    item.activity ||
    item.type ||
    item.username ||
    item.id ||
    item.pk ||
    JSON.stringify(item)
  );
};

function Activities() {
  const endpoint = `${API_BASE}/activities/`;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    console.log('Fetching Activities from', endpoint);
    fetch(endpoint)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Fetch failed: ${response.status} ${response.statusText}`);
        }
        return response.json();
      })
      .then((json) => {
        console.log('Activities response:', json);
        const results = Array.isArray(json) ? json : json.results ?? [];
        setData(results);
      })
      .catch((err) => {
        console.error('Activities fetch error:', err);
        setError(err.message);
      })
      .finally(() => setLoading(false));
  }, [endpoint]);

  const filteredData = data.filter((item) =>
    getDisplayValue(item).toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="entity-section">
      <div className="card bg-white bg-opacity-10 border-0 shadow-sm">
        <div className="card-body">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3 mb-3">
            <div>
              <h2 className="h4 text-white">Activities</h2>
              <p className="text-muted mb-0">Loaded from: <code>{endpoint}</code></p>
            </div>
            <button type="button" className="btn btn-sm btn-outline-light" onClick={() => setModalOpen(true)}>
              API details
            </button>
          </div>
          <form className="row g-2 align-items-center mb-3" onSubmit={(e) => e.preventDefault()}>
            <div className="col-auto flex-fill">
              <input
                type="search"
                className="form-control form-control-sm bg-dark text-white border-secondary"
                placeholder="Search activities"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="col-auto">
              <button type="submit" className="btn btn-sm btn-primary">
                Filter
              </button>
            </div>
          </form>
          {loading ? (
            <div className="text-muted">Loading activities…</div>
          ) : error ? (
            <div className="alert alert-danger">Error loading activities: {error}</div>
          ) : filteredData.length === 0 ? (
            <div className="alert alert-info mb-0">No activity data found.</div>
          ) : (
            <div className="table-responsive">
              <table className="table table-dark table-striped table-hover align-middle mb-0">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Activity</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((item, index) => (
                    <tr key={item.id ?? item.pk ?? index}>
                      <td>{index + 1}</td>
                      <td>{getDisplayValue(item)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
      {modalOpen && (
        <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0, 0, 0, 0.55)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content bg-dark text-white border-0">
              <div className="modal-header border-secondary">
                <h5 className="modal-title">Activities API info</h5>
                <button type="button" className="btn-close btn-close-white" aria-label="Close" onClick={() => setModalOpen(false)} />
              </div>
              <div className="modal-body">
                <p className="mb-2">Endpoint: <code>{endpoint}</code></p>
                <p className="mb-0">Rows loaded: {data.length}</p>
              </div>
              <div className="modal-footer border-secondary">
                <button type="button" className="btn btn-secondary" onClick={() => setModalOpen(false)}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default Activities;
