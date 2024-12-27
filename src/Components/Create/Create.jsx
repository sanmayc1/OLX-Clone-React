import React, { Fragment, useContext } from "react";
import "./Create.css";
import { useState } from "react";
import { FirebaseContext } from "../../firebase/FirebaseContext";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";
import { UserContext } from "../../context/context";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const { storage, db } = useContext(FirebaseContext);
  const { userD } = useContext(UserContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    image: null,
  });

  const categories = [
    "Electronics",
    "Vehicles",
    "Property",
    "Furniture",
    "Fashion",
    "Books",
    "Sports",
    "Others",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({
      ...prev,
      image: file,
    }));
  };

  const date = new Date();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.image) {
      const storageRef = ref(storage, `images/${formData.image.name}`);
      try {
        await uploadBytes(storageRef, formData.image);
        const downloadURL = await getDownloadURL(storageRef);
        if (downloadURL) {
          const addProduct = await addDoc(collection(db, "products"), {
            name: formData.name,
            category: formData.category,
            price: formData.price,
            imageUrl: downloadURL,
            createAt: date.toDateString(),
            uid: userD.uid,
          });
          if (addProduct) {
            navigate("/");
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="w-full flex justify-center create-form items-center ">
      <div className="max-w-md p-6 bg-white rounded-lg shadow-md ">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Post Your Ad</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Product Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Price
            </label>
            <div className="relative">
              <span className="absolute left-3 top-2 text-gray-500">$</span>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="w-full pl-7 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <div>
            {formData.image && (
              <img src={URL.createObjectURL(formData.image)} alt="" />
            )}
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Product Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            Post Ad
          </button>
        </form>
      </div>
    </div>
  );
};

export default Create;
