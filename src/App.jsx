import React, { useState } from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./components/Home"
import QuizStepper from "./components/quiz/QuizStepper"
import Quiz from "./components/quiz/Quiz"
import QuizResult from "./components/quiz/QuizResult"
import GetAllQuiz from "./components/quiz/GetAllQuiz"
import AddQuestion from "./components/question/AddQuestion"
import UpdateQuestion from "./components/question/UpdateQuestion"
import Navbar from "./components/layout/NavBar"
import Admin from "./components/Admin"
import Register from "./components/question/Register"
import LoginPage from "../utils/LoginPage"
import Compiler from "./components/Compiler"
import CodeEditor from "./components/question/CodeEditor"
import QuestionSetForm from "./components/question/QuestionSetForm"
import Pallate from "./components/quiz/Question-Pallate"
import AddCodingQuestion from "./components/question/AddCodingQuestion"
import AdminLogin from "./admin/Admin_Login"
import QuestionDetail from "./components/quiz/QuestionDetail"


function App() {
	return (
		<main className="container mt-5 mb-5">
			<Router>
				<Navbar />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="Login-Page" element={<LoginPage/>}/>
					<Route path="/quiz-stepper" element={<QuizStepper />} />
					<Route path="/take-quiz" element={<Quiz />} />
					<Route path="/admin" element={<Admin />} />
					<Route path="/pallate" element={<Pallate />} />
					<Route path ="compiler" element={<CodeEditor/>} />
					<Route path="/Register" element= {<Register />} />
					<Route path="/compiler" element= {<Compiler />} />
					<Route path="/create-quiz" element={<AddQuestion />} />
					<Route path="/update-quiz/:id" element={<UpdateQuestion />} />
					<Route path="/all-quizzes" element={<GetAllQuiz />} />
					<Route path="/quiz-result" element={<QuizResult />} />
					<Route path="/addset" element={<QuestionSetForm/>} />
					<Route path="/addcq" element={<AddCodingQuestion/>} />
					<Route path="/adminLogin" element={<AdminLogin/>} />
					<Route path="/questions/:questionSetId/:questionNo" element={<QuestionDetail />} />
				</Routes>
			</Router>
		</main>
	)
}

export default App
