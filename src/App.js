import React , {useContext , useEffect}from 'react';
import './App.css';
import {BrowserRouter , Route , Routes} from 'react-router-dom'
import {AuthContext} from './Context/FireBaseContext'


/**
 * ?  =====Import Components=====
 */

import Home from './Pages/Home';
import Login from './Components/Login/Login';
import Signup from './Pages/Signup';
import FireBaseContext from './Context/FireBaseContext';
import Create from './Pages/Create'
import View from './Pages/ViewPost'


function App() {

  const {setUser} = useContext(AuthContext)
  const {FireBaseApp}   = useContext(FireBaseContext)

  useEffect(() => {
 

    const unsubscribe = FireBaseApp.auth().onAuthStateChanged((user) => {
      
      setUser(user);
    });
  
    return () => {
    
      unsubscribe();  
    };
  }, []);
  


  return (
    <div>

    <BrowserRouter>
        <Routes >      
          <Route  path='/'  element={<Home />} />
          <Route path='signup' element={<Signup />} />
          <Route path='login' element={ <Login /> } />
          <Route path='create' element={ <Create /> } />
          <Route path='viewpost' element={ <View /> } />
        </Routes>
      </BrowserRouter>
      
  
    </div>
  );
}

export default App;
