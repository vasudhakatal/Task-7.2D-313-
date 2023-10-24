import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase-config";
import "./ArticlePage.css"; // Make sure to import your CSS file here

function ArticlePage() {
  const [articleList, setArticleList] = useState([]);

  useEffect(() => {
    const getArticles = async () => {
      const articleCollectionRef = collection(db, "articles");
      const articleData = await getDocs(articleCollectionRef);
      setArticleList(
        articleData.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    };

    getArticles();
  }, []);

  return (
    <div className="articlePage">
      <h1>Articles</h1>
      {articleList.map((article) => (
        <div className="article" key={article.id}>
          <h2>{article.title}</h2>
          <div className="articleAbstract">{article.abstract}</div>
          {article.image && (
            <img src={article.image} alt="Article Image" />
          )}
          <div className="articleText">{article.articleText}</div>
          {article.author && (
            <h3>@{article.author.name}</h3>
          )}
        </div>
      ))}
    </div>
  );
}

export default ArticlePage;
