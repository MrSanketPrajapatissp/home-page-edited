import React, { useEffect, useState } from "react";
import { getAllQuestions } from "../../../utils/QuizService";
import { Link, useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import styled from "styled-components";

const Pallate = () => {
  const [questions, setQuestions] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState("");
  const [selectedQuestionId, setSelectedQuestionId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const data = await getAllQuestions();
      setQuestions(data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleQuestionClick = (question, id) => {
    setSelectedQuestion(question);
    setSelectedQuestionId(id);
  };

  const handleSolveClick = () => {
    if (selectedQuestionId !== null) {
      navigate(`/compiler/${selectedQuestionId}`);
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <StyledSection>
      <div className="header">
        <h4>All Quiz Questions</h4>
        <Link to={"/create-quiz"}>
          <FaPlus /> Add Question
        </Link>
      </div>
      <div className="question-container">
        <textarea
          className="question-details"
          value={selectedQuestion}
          readOnly
        />
        <button
          className="solve-button"
          onClick={handleSolveClick}
          disabled={selectedQuestionId === null}
        >
          Solve Question
        </button>
      </div>
      <div className="grid-container">
        {questions.map((question) => (
          <button
            key={question.id}
            className="question-button"
            onClick={() => handleQuestionClick(question.question, question.id)}
          >
            {question.id}
          </button>
        ))}
      </div>
    </StyledSection>
  );
};

const StyledSection = styled.section`
  padding: 20px;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;

    h4 {
      color: GrayText;
    }

    a {
      font-size: 1.2em;
      color: #007bff;
      text-decoration: none;
      display: flex;
      align-items: center;
    }

    a svg {
      margin-right: 8px;
    }
  }

  .question-container {
    margin-bottom: 20px;
  }

  .question-details {
    width: 100%;
    height: 100px;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ced4da;
    font-size: 1em;
    resize: none;
    margin-bottom: 10px;
  }

  .solve-button {
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 10px;
    font-size: 1em;
    cursor: pointer;
    text-align: center;
    margin-bottom: 20px;
  }

  .solve-button:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }

  .grid-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
    gap: 10px;
  }

  .question-button {
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 10px;
    font-size: 1em;
    cursor: pointer;
    text-align: center;
  }

  .question-button:hover {
    background-color: #0056b3;
  }
`;

export default Pallate;
