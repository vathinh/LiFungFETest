import React from 'react';
import { Routes, Route, Link } from "react-router-dom";
import PostList from "./components/PostList"
import PostDetail from "./components/PostDetail"
import PostForm from "./components/PostForm"

import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";


function App() {
  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/posts" className="navbar-brand">
          TVT
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/posts"} className="nav-link">
              Posts
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/add"} className="nav-link">
              Add
            </Link>
          </li>
        </div>
      </nav>

      <div className="container mt-3">
        <Routes>
          <Route path="/" element={<PostList/>} />
          <Route path="/posts" element={<PostList/>} />
          <Route path="/add" element={<PostForm/>} />
          <Route path="/posts/:id" element={<PostDetail/>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
