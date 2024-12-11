import logo from './logo.svg';
// import './App.css';

import React, { useState } from "react";
import TaskBoard from "./components/TaskBoard";


const App = () => {
  
  return (
    <div className=''>
      {/* <h3 className='text-primary'>My Task Tracker</h3> */}
      <TaskBoard/>
    </div>
  );
};

export default App;