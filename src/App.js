import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import LandingPage from './pages/LandingPage';
import MainLayout from './layouts/MainLayout';
import PublicRoute from './routes/PublicRoutes';
import PrivateRoute from './routes/PrivateRoutes';
import Dashboard from './pages/Dashboard';
import Practices from './pages/Practices';
import TheoryPlayground from './pages/TheoryPlayground';
import CodePlayground from './pages/CodePlayground';
import MockInterviews from './pages/MockInterviews';
import Progress from './pages/Progress';
import Result from './pages/Result';
import InterviewRoom from './pages/InterviewRoom';


export default function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route element={<PublicRoute />}>
            <Route path="/" element={<LandingPage />} />
          </Route>
          <Route element={<PrivateRoute />}>
            <Route element={<MainLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/practice" element={<Practices />} />
              <Route path="/practice/result" element={<Result />} />
              <Route path="/theory/:practiceId" element={<TheoryPlayground />} />
              <Route path="/code/:practiceId" element={<CodePlayground />} />
              <Route path="/mock-interviews" element={<MockInterviews />} />
              <Route path="/interview-room" element={<InterviewRoom />} />
              <Route path='/progress' element={<Progress />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </Provider>
  );
}