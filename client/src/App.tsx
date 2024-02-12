import React from 'react';
import './App.css'
import Navbar from './components/Navbar';
import Board from './components/Board';
import AllBoards from './components/AllBoards';
import { BrowserRouter , Routes, Route } from 'react-router-dom';


function App() {
  return (
    <div className=''>
        <BrowserRouter>
          <Navbar/>
          <Routes>
          <Route path='/' element={<AllBoards/>} index></Route>
          <Route path='/board/:id' element={<Board/>} ></Route>
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
