import { useContext, useEffect, useState } from "react";
import "./Post.css";
import { FirebaseContext } from "../../firebase/FirebaseContext";
import { collection, onSnapshot } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/context";

function Posts() {
  const [products, setProducts] = useState([]);
  const { db } = useContext(FirebaseContext);
  const { userD } = useContext(UserContext);
  const navigate = useNavigate();

  //fetching all product data from databse
  useEffect(() => {
    try {
      const productDb = collection(db, "products");
      onSnapshot(productDb, (snapshot) => {
        const productList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        productList ? setProducts(productList) : [];
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const detailedView = (param) => {
    if (userD) {
      navigate(`/viewpost/${param.id}/${param.uid}`);
    } else navigate("/login");
  };
  return (
    <div className="postParentDiv">
      <div className="heading pt-7 ml-3">
        <span>Fresh recommendations</span>
      </div>
      <div className="moreView">
        {products
          ? products.map((product) => {
              return (
                <div
                  className="cards"
                  key={product.id}
                  onClick={() => detailedView(product)}
                >
                  <div className="card">
                    <div className="image">
                      <img src={product.imageUrl} alt="" />
                    </div>
                    <div className="content">
                      <p className="rate">&#x20B9; {product.price}</p>
                      <span className="kilometer">{product.name}</span>
                      <p className="name"> {product.category}</p>
                    </div>
                    <div className="date">
                      <span>{product.createAt}</span>
                    </div>
                  </div>
                </div>
              );
            })
          : null}
      </div>
    </div>
  );
}

export default Posts;
