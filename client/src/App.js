import Header from './components/header/header';
import HomePage from './pages/Homepage/homepage';   
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/layout';

function App() {
  return (
    <Routes>
      <Route path={"/"} element={<Layout/>} >
      <Route index element={<HomePage/>}/> 
      <Route path={"/login"} element={<div>Login</div>}/> 
      <Route path={"/signup"} element={<div>Signup</div>}/> 
      </Route>
    </Routes>
  );
}

export default App;
