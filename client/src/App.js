import HomePage from './pages/Homepage/homepage'; 
import LoginPage from './pages/LoginPage/loginPage';
import SignupPage from './pages/SignupPage/SignupPage';  
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/layout';

function App() {
  return (
    <Routes>
      <Route path={"/"} element={<Layout/>} >
      <Route index element={<HomePage/>}/> 
      <Route path={"/login"} element={<LoginPage/>}/> 
      <Route path={"/signup"} element={<SignupPage/>}/> 
      </Route>
    </Routes>
  );
}

export default App;
