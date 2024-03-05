import React, { Fragment , useState ,useContext} from 'react';
import './Create.css';
import Header from '../Header/Header';
import FireBaseContext, { AuthContext } from '../../Context/FireBaseContext';
import {useNavigate} from 'react-router-dom'
import Swal from 'sweetalert2';

const Create = () => {
  const history = useNavigate()
  const {FireBaseApp} = useContext(FireBaseContext)
  const {user} = useContext(AuthContext)

  const [name , setName] = useState("")
  const [category , setCategory] = useState("")
  const [price , setPrice] = useState("")
  const [image , setImage] = useState("")
  const date = new Date();
  const handleSubmit = () => {
    

    // validations
    if(!name.trim()){
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Enter Name Filed Cannot Empty",
        footer: '<a href="#">Why do I have this issue?</a>'
      });
      return
    }

    if(!category.trim()){
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Enter Category Filed Cannot Empty",
        footer: '<a href="#">Why do I have this issue?</a>'
      });
      return
    }

    if(!price.trim()){
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Enter Price Filed Cannot Empty",
        footer: '<a href="#">Why do I have this issue?</a>'
      });
      return
    }
    const parsedPrice = parseFloat(price);
    if (isNaN(parsedPrice) || parsedPrice <= 0) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Price must be a valid number greater than 0",
        footer: '<a href="#">Why do I have this issue?</a>'
      });
      return;
    }


 



    FireBaseApp.storage()
      .ref(`/image/${image.name}`)
      .put(image)
      .then((snapshot) => {        
        return snapshot.ref.getDownloadURL();
      })
      .then((url) => {
        FireBaseApp.firestore().collection('products').add({
          name,
          category,
          price,
          image: url,
          userId:user.uid,
          createdAt:date.toDateString(),
        })
        history('/')
      })
      
      .catch((error) => {
        console.error('Error uploading file:', error.message);
       
      })
      .finally(() => {
        console.log('This will always execute.');
      });
  };
  


  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
            <label htmlFor="fname">Name</label>
            <br />
            <input

              className="input"
              type="text"
              id="fname"
              name="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <br />
            <label htmlFor="fname">Category</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              name="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
            <br />
            <label htmlFor="fname">Price</label>
            <br />
            <input 
            className="input"
             type="number" 
             id="fname" 
             name="Price"
             value={price}
             onChange={(e) => setPrice(e.target.value)}
              />
            <br />
          
          <br />
          <img alt="Posts" width="200px" height="200px" src={image ? URL.createObjectURL(image) : ""}></img>
        
            <br />
            <input
             type="file"
             accept="image/*"
             onChange={(e)=>setImage(e.target.files[0]) }
              />
            <br />
            <button onClick={handleSubmit} type='submit' className="uploadBtn">upload and Submit</button>
          
        </div>
      </card>
    </Fragment>
  );
};

export default Create;
