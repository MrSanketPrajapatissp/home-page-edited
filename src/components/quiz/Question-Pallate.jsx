import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Pallate = ({ questionSetId }) => {
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedQuestion, setSelectedQuestion] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await axios.get('http://localhost:8080/codingQuestions/allCodingQuestions', {
                    params: {
                        questionSetId: questionSetId || 'BTCOCOC505' // Use the prop or default value
                    }
                });
                setQuestions(response.data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchQuestions();
    }, [questionSetId]);

    const handleQuestionClick = (question) => {
        setSelectedQuestion(question);
    };

    const handleSolveClick = () => {
        navigate('/compiler'); // Navigate to /compiler
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error fetching questions: {error.message}</p>;

    return (
        <StyledSection>
            <div className="header">
                <h4>50 QUESTIONS OF C</h4>
            </div>
            {error && <p className="error-message">{error.message}</p>}
            <div className="text-area-container">
                <textarea
                    className="question-textarea"
                    value={selectedQuestion}
                    readOnly
                />
                <button className="solve-button" onClick={handleSolveClick}>
                    Solve
                </button>
            </div>
            <div className="grid-container">
                {questions.map((question, index) => (
                    <button
                        key={index}
                        className="question-button"
                        onClick={() => handleQuestionClick(question)} // Update selected question on click
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </StyledSection>
    );
};

const StyledSection = styled.section`
  padding: 20px;

  .header {
    margin-bottom: 20px;

    h4 {
      color: GrayText;
    }
  }

  .error-message {
    color: red;
    margin-bottom: 20px;
  }

  .text-area-container {
    margin-bottom: 20px;
    font-size: 1.25em; 
    font-weight: bold; 
}

  .question-textarea {
    width: 100%;
    height: 100px;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    resize: none;
    font-size: 1em;
  }

  .solve-button {
    display: block;
    padding: 15px 49%; /* Smaller button */
    margin-top: 10px;
    background-color: #007bff; /* Blue color */
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 0.8em; /* Smaller font size */
    cursor: pointer;
  }
    .solve-button:hover {
      background-color: green;
    
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
