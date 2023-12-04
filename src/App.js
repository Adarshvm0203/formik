// App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MyForm from './Components/Form';
import View from './Components/View';
import "./App.css"

function App() {
  const [submittedData, setSubmittedData] = useState(null);

  const handleFormSubmit = (formData) => {
    setSubmittedData(formData);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<MyForm onSubmit={handleFormSubmit} />}
        />
        <Route
          path="/view"
          element={<View submittedData={submittedData} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
