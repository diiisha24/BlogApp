import HomePage from './pages/Homepage/homepage'; 
import LoginPage from './pages/LoginPage/loginPage';
import SignupPage from './pages/SignupPage/SignupPage';  
import CreatePost from './pages/CreatePost/createPost';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { UserContextProvider } from './context/userContext';
import Layout from './components/layout';

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path={"/"} element={<Layout/>} >
        <Route index element={<HomePage/>}/> 
        <Route path={"/login"} element={<LoginPage/>}/> 
        <Route path={"/signup"} element={<SignupPage/>}/>
        <Route path={"/create"} element={<CreatePost/>}/>
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
