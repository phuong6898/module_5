import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BookList from "./component/BookList";
import BookCreate from "./component/BookCreate";
import BookEdit from "./component/BookEdit";
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<BookList />} />
          <Route path="/create" element={<BookCreate />} />
          <Route path="/edit/:id" element={<BookEdit />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
