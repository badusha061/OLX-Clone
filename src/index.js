import React,{useEffect} from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import FireBaseApp from './FireBase/config'; 
import FireBaseContext, { Context } from './Context/FireBaseContext';
import Post from './Context/PostContext';




ReactDOM.render(
    <Post>

    <FireBaseContext.Provider value={{ FireBaseApp }} >
        <Context> 
            <App />
        </Context>           
    </FireBaseContext.Provider>

    </Post>

, document.getElementById('root'));
