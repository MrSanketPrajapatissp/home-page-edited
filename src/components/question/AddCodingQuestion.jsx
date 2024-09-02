import React, { useState } from "react";
import { Link } from "react-router-dom";
import { createQuestion } from "../../../utils/QuizService";

const AddCodingQuestion = ({ testId }) => {
  const [question, setQuestion] = useState("");
  const [testCases, setTestCases] = useState([{ input: "", output: "" }]);

  const handleAddTestCase = () => {
    setTestCases([...testCases, { input: "", output: "" }]); // Add a new empty test case
  };

  const handleRemoveTestCase = (index) => {
    setTestCases(testCases.filter((_, i) => i !== index)); // Remove the specified test case
  };

  const handleTestCaseChange = (index, field, value) => {
    setTestCases(
      testCases.map((testCase, i) =>
        i === index ? { ...testCase, [field]: value } : testCase
      )
    ); // Update the test case with the new value
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formattedTestCases = testCases.filter(
        (testCase) => testCase.input.trim() !== "" && testCase.output.trim() !== ""
      ); // Ensure valid test cases are submitted

      const result = {
        testId, // Use the test ID passed from the parent component
        question,
        testCases: formattedTestCases, // Store the test cases
      };

      console.log("Data to be submitted:", result);

      await createQuestion(result); // Call the service to save the question

      // Reset the form fields
      setQuestion("");
      setTestCases([{ input: "", output: "" }]);
    } catch (error) {
      console.error("Error saving the question:", error);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6 mt-5">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title">Add Coding Question</h5>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit} className="p-2">
                <div className="mb-3">
                  <label htmlFor="question-text" className="form-label text-info">
                    Coding Question
                  </label>
                  <textarea
                    className="form-control"
                    rows={4}
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    required
                  ></textarea>
                </div>

                <div className="mb-3">
                  <label htmlFor="test-cases" className="form-label text-primary">
                    Test Cases
                  </label>
                  {testCases.map((testCase, index) => (
                    <div key={index} className="input-group mb-3">
                      <input
                        type="text"
                        placeholder="Input"
                        value={testCase.input}
                        onChange={(e) => handleTestCaseChange(index, "input", e.target.value)}
                        className="form-control"
                      />
                      <input
                        type="text"
                        placeholder="Expected Output"
                        value={testCase.output}
                        onChange={(e) => handleTestCaseChange(index, "output", e.target.value)}
                        className="form-control"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveTestCase(index)}
                        className="btn btn-outline-danger"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={handleAddTestCase}
                    className="btn btn-outline-primary"
                  >
                    Add Test Case
                  </button>
                </div>

                {!testCases.length && <p>Please enter at least one test case.</p>}

                <div className="btn-group">
                  <button type="submit" className="btn btn-outline-success mr-2">
                    Save Question
                  </button>
                  <Link to={"/all-quizzes"} className="btn btn-outline-primary ml-2">
                    Back to existing questions
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCodingQuestion
