import './App.css';
import { NavLink, Routes, Route } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';
import logo from './octofitapp-small.svg';

function Home() {
  return (
    <>
      <section className="hero py-4">
        <div className="row gx-4 gy-4">
          <div className="col-lg-7">
            <div className="card bg-dark text-white shadow-sm h-100 border-0">
              <div className="card-body">
                <h2 className="card-title display-6">Welcome to OctoFit</h2>
                <p className="card-text text-white-75">Track workouts, compare teams, and stay motivated with clean dashboards.</p>
                <div className="d-flex flex-wrap gap-2 mt-4">
                  <NavLink to="/activities" className="btn btn-primary btn-lg">
                    Get Started
                  </NavLink>
                  <NavLink to="/leaderboard" className="btn btn-outline-light btn-lg">
                    View Leaderboard
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-5">
            <div className="card bg-secondary text-white shadow-sm h-100 border-0">
              <div className="card-body">
                <h3 className="card-title">Weekly goal</h3>
                <p className="card-text">Hit 150 active minutes this week and unlock your team badge.</p>
                <NavLink to="/workouts" className="btn btn-outline-light">
                  View Progress
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="stats-section my-4">
        <div className="card bg-white bg-opacity-10 border-0 shadow-sm">
          <div className="card-body">
            <h2 className="h4 text-white mb-3">Today’s Overview</h2>
            <div className="table-responsive">
              <table className="table table-dark table-striped table-hover align-middle mb-0">
                <thead>
                  <tr>
                    <th>Metric</th>
                    <th>Value</th>
                    <th>Trend</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Active minutes</td>
                    <td>98</td>
                    <td>Up 12%</td>
                  </tr>
                  <tr>
                    <td>Calories burned</td>
                    <td>1,420</td>
                    <td>Up 8%</td>
                  </tr>
                  <tr>
                    <td>Team rank</td>
                    <td>#4</td>
                    <td>Stable</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
      <section className="link-section my-4">
        <div className="card bg-white bg-opacity-10 border-0 shadow-sm">
          <div className="card-body">
            <h2 className="h4 text-white mb-3">Quick links</h2>
            <div className="d-flex flex-wrap gap-2">
              <NavLink to="/activities" className="btn btn-outline-light">
                Log Activity
              </NavLink>
              <NavLink to="/teams" className="btn btn-outline-light">
                Manage Teams
              </NavLink>
              <NavLink to="/users" className="btn btn-outline-light">
                Profile Settings
              </NavLink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function NotFound() {
  return (
    <section className="entity-section">
      <div className="card bg-white bg-opacity-10 border-0 shadow-sm">
        <div className="card-body">
          <h2 className="h4 text-white">Page not found</h2>
          <p className="text-muted mb-0">The selected page is not available. Use the navigation menu to choose a valid section.</p>
        </div>
      </div>
    </section>
  );
}

function App() {
  return (
    <div className="App">
      <nav className="navbar navbar-dark bg-primary shadow-sm">
        <div className="container-fluid px-4 py-3 d-flex flex-wrap align-items-center justify-content-between">
          <NavLink to="/" className="navbar-brand d-flex align-items-center gap-3 mb-2 mb-lg-0 text-white">
            <img src={logo} className="App-logo" alt="OctoFit logo" />
            <div>
              <div className="fs-5 fw-bold mb-0">OctoFit Tracker</div>
              <div className="small text-white-75">Fitness progress for teams and champions.</div>
            </div>
          </NavLink>
          <div className="d-flex flex-wrap gap-2">
            <NavLink to="/" className={({ isActive }) => `nav-link text-white${isActive ? ' active' : ''}`} end>
              Home
            </NavLink>
            <NavLink to="/activities" className={({ isActive }) => `nav-link text-white${isActive ? ' active' : ''}`}>
              Activities
            </NavLink>
            <NavLink to="/leaderboard" className={({ isActive }) => `nav-link text-white${isActive ? ' active' : ''}`}>
              Leaderboard
            </NavLink>
            <NavLink to="/teams" className={({ isActive }) => `nav-link text-white${isActive ? ' active' : ''}`}>
              Teams
            </NavLink>
            <NavLink to="/users" className={({ isActive }) => `nav-link text-white${isActive ? ' active' : ''}`}>
              Users
            </NavLink>
            <NavLink to="/workouts" className={({ isActive }) => `nav-link text-white${isActive ? ' active' : ''}`}>
              Workouts
            </NavLink>
          </div>
        </div>
      </nav>
      <main className="App-main container py-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
