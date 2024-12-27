import { useContext, useEffect, useState } from "react";
import Heart from "../../assets/Heart";
import "./Post.css";
import { FirebaseContext } from "../../firebase/FirebaseContext";
import { collection, onSnapshot } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { ProductContext, UserContext } from "../../context/context";

function Posts() {
  const [data, setData] = useState([]);
  const { db } = useContext(FirebaseContext);
  const { userD } = useContext(UserContext);
  const {setProduct,product} = useContext(ProductContext);
  
  const navigate = useNavigate();

  useEffect(() => {
  
    try {
      const productDb = collection(db, "products");
    
      const unsubscribe = onSnapshot(productDb, (snapshot) => {
        const productList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setData(productList);
      });
      
    } catch (error) {
      console.log(error);
    }

  }, []);

  const detailedView = (param) => {
    if (userD){
      setProduct(param);
       navigate("/viewpost");
    }
    else navigate("/login");
  };
  return (
    <div className="postParentDiv">
      <div className="heading p-10">
        <span>Quick Menu</span>
        <span>View more</span>
      </div>
      <div className="moreView">
        {data
          ? data.map((product) => {
              return (
                <div className="cards" key={product.id} onClick={()=>detailedView(product)}>
                  <div className="card">
                    <div className="favorite">
                      <Heart></Heart>
                    </div>
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
      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="cards">
          <div className="card">
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src="../../../Images/R15V3.jpg" alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; 250000</p>
              <span className="kilometer">Two Wheeler</span>
              <p className="name"> YAMAHA R15V3</p>
            </div>
            <div className="date">
              <span>10/5/2021</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Posts;
