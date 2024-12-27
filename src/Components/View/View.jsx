import React, { useContext, useEffect, useState } from "react";
import "./View.css";
import { useParams } from "react-router-dom";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

import { FirebaseContext } from "../../firebase/FirebaseContext";
import ReactLoading from "react-loading"

function View() {
  const [product, setProduct] = useState({});
  const [seller, setSeller] = useState({});
  const [loading, setLoading] = useState(true);
  const { db } = useContext(FirebaseContext);
  const pId = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const docRef = doc(db, "products", pId.id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setProduct(docSnap.data());
          const docRef2 = collection(db, "user");
          const idQurey = query(docRef2, where("id", "==", pId.uid));
          const docSnap2 = await getDocs(idQurey);

          if (docSnap2) {
            docSnap2.forEach((doc) => {
              setLoading(false);
              setSeller(doc.data());
            });
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchProduct();
  }, []);

  if (loading) {
    return (
      <div className=" text-black text-center mt-52 flex w-full h-full justify-center">
        <ReactLoading type="balls" color="#000"/>
      </div>
    );
  }

  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img src={product.imageUrl} alt="" />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {product.price}</p>
          <span>{product.name}</span>
          <p>{product.category}</p>
          <span>{product.createAt}</span>
        </div>
        <div className="contactDetails">
          <p>Seller Details</p>
          <p>Name: {seller.username}</p>
          <p>Phone: {seller.phone}</p>
        </div>
      </div>
    </div>
  );
}
export default View;
