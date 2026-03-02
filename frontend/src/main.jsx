import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import BlogContextProvider from "./Components/BlogContext/BlogContext.jsx";
import { AuthProvider } from "./AuthContext.jsx"; 
import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode> 
    <AuthProvider> 
      <BlogContextProvider>
        <Router>
          <App />
        </Router>
      </BlogContextProvider>
    </AuthProvider>
  </React.StrictMode>
);