import { useState } from "react";
import { UserContext ,ProductContext} from "./context";


export const UserContextProvider = ({ children }) => {
    const [userD, setUserD] = useState("");
  
    return (
      <UserContext.Provider value={{ userD, setUserD }}>
        {children}
      </UserContext.Provider>
    );
  };

export const ProductContextProvider = ({children})=>{
  const [product,setProduct]= useState({});

  return(

    <ProductContext.Provider value={{product , setProduct}}>
      {children}
    </ProductContext.Provider>
    
  )

}