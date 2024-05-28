import {  useNavigate } from 'react-router-dom';

function Home() {
  const Navigate = useNavigate();  

  const handleNavigate = () => {
    Navigate('/View');
  };

  const toLogin = () => {
    Navigate('/login');
  }
  
  const toRegister=()=>{
    Navigate('/register')
  }

  return (
    <div>
      <h1>Home</h1>
      <button onClick={handleNavigate}>Doctor View</button>
      <button onClick={toLogin}>Sign In</button>
      <button onClick={toRegister}>Register New User</button>
    </div>
  );
}

export default Home;
