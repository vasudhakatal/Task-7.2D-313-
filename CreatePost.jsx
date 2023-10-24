import React, { useEffect, useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db, auth } from "./firebase-config";
import { useNavigate } from "react-router-dom";
import { storage } from "./firebase-config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import "./CreatePost.css";

function CreatePost({ isAuth }) {
  const [selectedType, setSelectedType] = useState("");
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [date, setDate] = useState(""); // New state for the selected date
  const [imageURL, setImageURL] = useState("");
  const [abstract, setAbstract] = useState("");
  const [articleText, setArticleText] = useState("");
  const [tags, setTags] = useState("");

  let navigate = useNavigate();

  const questionsCollectionRef = collection(db, "questions");
  const articlesCollectionRef = collection(db, "articles");

  const createQuestion = async () => {
    await addDoc(questionsCollectionRef, {
      title,
      abstract,
      tags,
      date, 
      image: imageURL,
      author: {
        name: auth.currentUser.displayName,
        id: auth.currentUser.uid,
      },
    });
    navigate("/");
  }

  const createArticle = async () => {
    await addDoc(articlesCollectionRef, {
      title,
      abstract,
      tags,
      date, 
      image: imageURL,
      articleText,
      author: {
        name: auth.currentUser.displayName,
        id: auth.currentUser.uid,
      },
    });
    navigate("/");
  }

  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }
  }, []);

  const uploadImage = () => {
    if (image == null) return;
    const imageRef = ref(storage, `articles/${image.name + v4()}`);
    uploadBytes(imageRef, image)
      .then(() => getDownloadURL(imageRef))
      .then((downloadURL) => {
        setImageURL(downloadURL);
        alert("Image Uploaded");
      })
      .catch((error) => {
        console.error("Error uploading image:", error);
      });
  }

  const handleTypeChange = (e) => {
    setSelectedType(e.target.value);
  }

  const handleImageUpload = (e) => {
    const uploadedImage = e.target.files && e.target.files[0];
    if (uploadedImage) {
      setImage(uploadedImage);
    }
  }

  return (
    <div className="createPostPage">
      <div className="cpContainer">
        <h1>Create New Post</h1>
        <div className="SelectPost">
          <h2>Select Post Type</h2>
          <select value={selectedType} onChange={handleTypeChange}>
            <option value="">Select a post type</option>
            <option value="question">Question</option>
            <option value="article">Article</option>
          </select>
          {selectedType && <p>You selected: {selectedType} post</p>}
        </div>
        {selectedType === "question" && (
          <>
            <div>
              <label>Title:</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div>
              <label>Tags:</label>
              <input
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
              />
            </div>
            <div>
              <label>Date:</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <button onClick={createQuestion}>Submit Question</button>
          </>
        )}
        {selectedType === "article" && (
          <>
            <div>
              <label>Title:</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div>
              <label>Image Upload:</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
              />
              <button onClick={uploadImage}>Upload!</button>
            </div>
            {imageURL && (
              <div>
                <label>Image URL:</label>
                <p>{imageURL}</p>
              </div>
            )}
            <div>
              <label>Date:</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <div>
              <label>Abstract:</label>
              <textarea
                value={abstract}
                onChange={(e) => setAbstract(e.target.value)}
              />
            </div>
            <div>
              <label>Article Text:</label>
              <textarea
                value={articleText}
                onChange={(e) => setArticleText(e.target.value)}
              />
            </div>
            <button onClick={createArticle}>Submit Article</button>
          </>
        )}
      </div>
    </div>
  )
}

export default CreatePost;