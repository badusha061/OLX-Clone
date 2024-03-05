import React , {useContext ,useEffect, useState} from 'react';

import './Header.css';
import OlxLogo from '../../assets/OlxLogo';
import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow';
import SellButton from '../../assets/SellButton';
import SellButtonPlus from '../../assets/SellButtonPlus';
import FireBaseContext, { AuthContext } from '../../Context/FireBaseContext';
import { useNavigate } from 'react-router-dom';




function Header({onSearch}) {
  

  const history = useNavigate()
  
  const {user} = useContext(AuthContext)

  useEffect(() =>{
    if(user !== null){
      console.log(user);
    }else{
      console.log('this is the null value');
    }
  },[user])
  const {FireBaseApp} = useContext(FireBaseContext)

  const handleSell = () => {
  
    console.log('handle is working');
    history('create ')
  }



  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName">
          <OlxLogo></OlxLogo>
        </div>
        <div className="placeSearch">
          <Search></Search>
          <input 
          type="text"
    
           />
          <Arrow></Arrow>
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car,mobile phone and more..."
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff"></Search>
          </div>
        </div>
        <div className="language">
          <span> ENGLISH </span>
          <Arrow></Arrow>
        </div>
         
        <div className="loginPage">
          <span>{user ? user.displayName : "Login"}</span>
          <hr />
        </div>

        { user && <span onClick={()=>{
          FireBaseApp.auth().signOut();
          history('login')
        }}> Logout </span>}

        <div className="sellMenu">
          <SellButton></SellButton>
          <div className="sellMenuContent">
            <SellButtonPlus></SellButtonPlus>
            <span onClick={handleSell}>SELL</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
