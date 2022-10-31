import './App.scss';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/pages/Home';
import SignUp from './components/pages/SignUp';
import Login from './components/pages/Login';
import EditProfile from './components/pages/EditProfile';
import Order from './components/pages/Order';
import MyTopAppBar from './components/TopAppBar';
import History from './components/pages/History';
import Payment from './components/pages/Payment';
import Credit from './components/pages/Credit';

function App() {
  return (
    <div>
      <MyTopAppBar />
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/login' element={<Login />} />
          <Route path='/edit_profile' element={<EditProfile />} />
          <Route path='/order' element={<Order />} />
          <Route path='/payment' element={<Payment />} />
          <Route path='/history' element={<History />} />
          <Route path='/credit' element={<Credit />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
