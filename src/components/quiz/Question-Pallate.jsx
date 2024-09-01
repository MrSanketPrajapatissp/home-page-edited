import React, { useEffect, useState } from "react";
import { getAllQuestions } from "../../../utils/QuizService";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";

const Pallate = () => {
  const [questions, setQuestions] = useState([
    { id: "", question: "", correctAnswers: "", choices: [] },
  ]);
  const [isLoading, setIsLoading] = useState(true);

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

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <section className="container">
      <div className="row mt-5">
        <div className="col-md-6 mb-2 md-mb-0" style={{ color: "GrayText" }}>
          <h4>All Quiz Questions</h4>
        </div>
        <div className="col-md-4 d-flex justify-content-end">
          <Link to={"/create-quiz"}>
            <FaPlus /> Add Question
          </Link>
        </div>
      </div>
      <hr />
      {questions.map((question, index) => (
        <div key={question.id}>
          <h4 style={{ color: "GrayText" }}>{`${index + 1}. ${question.question}`}</h4>
          <Link to={`/compiler`}>
            <button className="btn btn-sm btn-outline-primary">Solve</button>
          </Link>
          <hr />
        </div>
      ))}
    </section>
  );
};

export default Pallate;
