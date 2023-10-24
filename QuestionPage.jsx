import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase-config";
import "./QuestionPage.css"; // Make sure to import your CSS file here

function QuestionPage() {
  const [filterDate, setFilterDate] = useState(""); // Updated state variable name
  const [questionList, setQuestionList] = useState([]);
  const [TitleFilter, setTitleFilter] = useState(''); // Updated state variable name
  const [Filter_Tags, setFilterTags] = useState(''); // Updated state variable name
  const [filteredQuestions, setFilteredQuestions] = useState([]); // Added filteredQuestions state
  const [Expand_Index, setExpandedIndex] = useState(null);
  const [date, setdate] = useState("")

  useEffect(() => {
    const getQuestions = async () => {
      const questionCollectionRef = collection(db, "questions");
      const questionData = await getDocs(questionCollectionRef);
      setQuestionList(
        questionData.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
      setFilteredQuestions(
        questionData.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    };

    getQuestions();
  }, []);

  const handleFilter = () => {
    const filteredQuestions = questionList.filter(
      (question) =>
        question.title.toLowerCase().includes(TitleFilter.toLowerCase()) &&
        question.tags.toLowerCase().includes(Filter_Tags.toLowerCase()) 
       // &&(filterDate === "" || question.date.includes(filterDate)) // Include date filtering
    );

    const dateMatch = 
    
    setFilteredQuestions(filteredQuestions);
  };

  const handleDeleteQuestion = async (id) => { // Added the "async" keyword and fixed the arrow function syntax
    const updatedQuestions = filteredQuestions.filter((question) => question.id !== id);
    setFilteredQuestions(updatedQuestions);
};

  const handleExpand = (index) => {
    setExpandedIndex(index === Expand_Index ? null : index);
  };

  return (
    <div className="QuestionPage">
      <h1>Questions</h1>
      <div className="filters">
        <input
          type="text"
          placeholder="Filter by title"
          value={TitleFilter}
          onChange={(e) => setTitleFilter(e.target.value)}
        />
        <input
          type="text"
          placeholder="Filter by tags"
          value={Filter_Tags}
          onChange={(e) => setFilterTags(e.target.value)}
        />
        <input
          type="date"
          placeholder="Filter by date"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
        />
        <button onClick={handleFilter}>Apply Filters</button>
      </div>
      {filteredQuestions.map((question, index) => ( // Use filteredQuestions here
        <div className="question" key={question.id}>
          <h2>{question.title}</h2>
          <div className="questionText">{question.text}</div>
          <h3>Tags: {question.tags}</h3>
          <h3>@{question.author.name}</h3>
          <button onClick={() => handleDeleteQuestion(question.id)}>Delete</button>
          {/* <button onClick={() => handleExpand(index)}>Expand</button> */}
          <button onClick={() => handleExpand(index)}>
            {Expand_Index === index ? 'Collapse' : 'Expand'}
            </button>
          {Expand_Index=== index && (
            <div>
              <h3>More Details:</h3>
              <p>Tag: {question.tag}</p>
              <p>Date: {question.date}</p>
            </div>
          )}
          
          {Expand_Index === index && 
          <div>Expanded content</div>}
        </div>
      ))}
    </div>
  );
}

export default QuestionPage;