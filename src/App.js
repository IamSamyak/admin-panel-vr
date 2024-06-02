import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AddProject from './pages/AddProject';
import HomePage from './pages/HomePage';
import LoginRegister from './pages/LoginAndRegister';
import darkTheme from './config/theme';
import { ThemeProvider } from '@emotion/react';

function App() {
  return (
    // <ThemeProvider theme={darkTheme}>
    <Router>
      <Routes>
        <Route path="/" element={<LoginRegister />} />
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/addproject" element={<AddProject />} />
      </Routes>
    </Router>
  // </ThemeProvider>
  );
}

export default App;
