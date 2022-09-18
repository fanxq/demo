import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './App.less';
import Layout from './components/Layout';


function App() {
  let navigate = useNavigate()
  let location = useLocation()
  useEffect(() => {
    if (location.pathname === '/') {
      navigate('/login', {replace: true})
    }
  }, [])
  return (
    <Layout />
  )
};

export default App;
