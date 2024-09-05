import React, { useEffect, useState } from "react";
import { getQuestionsBySetId } from "../../../utils/QuizService";
import { Link, useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import styled from "styled-components";

const Pallate = () => {
  const [questions, setQuestions] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState("");
  const [selectedQuestionId, setSelectedQuestionId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [questionSetId, setQuestionSetId] = useState("");

  useEffect(() => {
    promptForSetId();
  }, []);

  const promptForSetId = () => {
    const id = prompt("Please enter the question set ID:");
    if (id) {
      setQuestionSetId(id);
      fetchQuestions(id);
    } else {
      setError("No question set ID provided.");
      setIsLoading(false);
    }
  };

  const fetchQuestions = async (id) => {
    setIsLoading(true);
    try {
      const data = await getQuestionsBySetId(id);
      setQuestions(data);
      setIsLoading(false);
    } catch (error) {
      setError("Error fetching questions. Please try again later.");
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
      {error && <p className="error-message">{error}</p>}
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
            key={`${question.questionSetId}-${question.questionNo}`} // Ensure uniqueness of key
            className="question-button"
            onClick={() => handleQuestionClick(question.question, `${question.questionSetId}-${question.questionNo}`)}
          >
            {question.questionNo}
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

  .error-message {
    color: red;
    margin-bottom: 20px;
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
