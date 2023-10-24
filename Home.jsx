import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase-config";
import "./Home.css";

function Home() {
  const [questionList, setQuestionList] = useState([]);
  const [articleList, setArticleList] = useState([]);

  useEffect(() => {
    const getQuestions = async () => {
      const questionCollectionRef = collection(db, "questions");
      const questionData = await getDocs(questionCollectionRef);
      setQuestionList(
        questionData.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    };

    const getArticles = async () => {
      const articleCollectionRef = collection(db, "articles");
      const articleData = await getDocs(articleCollectionRef);
      setArticleList(
        articleData.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    };

    getQuestions();
    getArticles();
  }, []);

  return (
    <div className="homePage">
      <h1>Questions</h1>
      {questionList.map((question) => (
        <div className="question" key={question.id}>
          <h2>{question.title}</h2>
          <div className="questionText">{question.text}</div>
          <h3>Tags: {question.tags}</h3>
          <h3>@{question.author?.name}</h3> {/* Use optional chaining here */}
        </div>
      ))}

      <h1>Articles</h1>
      {articleList.map((article) => (
        <div className="article" key={article.id}>
          <h2>{article.title}</h2>
          <div className="articleAbstract">{article.abstract}</div>
          {article.image && (
            <img src={article.image} alt="Article Image" />
          )}
          <div className="articleText">{article.articleText}</div>
          <h3>@{article.author?.name}</h3> {/* Use optional chaining here */}
        </div>
      ))}
    </div>
  );
}

export default Home;
