// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import WelcomePage from './pages/WelcomePage';
import ProductsPage from './pages/ProductsPage';
import MainLayout from './MainLayout';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <Routes>
        {/* Login page route */}
        <Route
          path="/"
          element={<LoginPage onLogin={() => setIsAuthenticated(true)} />}
        />

        {/* Protected Routes (only accessible if logged in) */}
        {isAuthenticated ? (
          <Route element={<MainLayout />}>
            <Route path="/welcome" element={<WelcomePage />} />
            <Route path="/products" element={<ProductsPage />} />
          </Route>
        ) : (
          <Route path="*" element={<Navigate to="/" />} />
        )}
      </Routes>
    </Router>
  );
}

export default App;
