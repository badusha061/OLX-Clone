import React,{useState,useContext,useEffect} from 'react';

import './View.css';
import { PostContext } from '../../Context/PostContext';
import FireBaseContext from '../../Context/FireBaseContext';
function View() {
  const [userdetails , setUserDetails] = useState()
  const {postDetails}  = useContext(PostContext)
  const {FireBaseApp} = useContext(FireBaseContext)


  useEffect(() => {
    if (postDetails) {
      const { userId } = postDetails;
      const usersCollection = FireBaseApp.firestore().collection('users');
      console.log(usersCollection,'collection');
      if (usersCollection) {
        usersCollection.where('id', '==', userId).get().then((res) => {
          console.log('res',res);
          res.forEach(doc => {
            setUserDetails(doc.data());
          });
        });
      }
    }
  },);
  
  
  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img
          src= {postDetails.image}
          alt=""
        />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {postDetails.price} </p>
          <span> {postDetails.name} </span>
          <p> {postDetails.category} </p>
          <span> {postDetails.createdAt} </span>
        </div>
      {userdetails  &&  <div className="contactDetails">
          <p>Seller details</p>
          <p> {userdetails.username} </p>
          <p> {userdetails.phone} </p>
        </div>}
      </div>
    </div>
  );
}
export default View;
