import React from "react"
import { NavLink } from "react-router-dom"

const Navbar = () => {
	return (
		<nav className="navbar navbar-expand-lg bg-body-tertiary px-5 shadow sticky-top">
			<div className="container-fluid" >
				<NavLink className="navbar-brand" to={"/"}>
				BIT Quiz Master
				</NavLink>
				<button
					className="navbar-toggler"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarNav"
					aria-controls="navbarNav"
					aria-expanded="false"
					aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="navbarNav">
					<ul className="navbar-nav ml-auto">
						<li className="nav-item">
							<NavLink className="nav-link" to={"/admin"}>
								Admin
							</NavLink>
						</li>

						<li className="nav-item">
							<NavLink className="nav-link" to={"/quiz-stepper"}>
								Take Quiz
							</NavLink>
						</li>

						<li className="nav-item">
							<NavLink className="nav-link" to={"/Register"}>
								Register
							</NavLink>
						</li>
						<li className="nav-item">
							<NavLink className="nav-link" to={"/Login-Page"}>
								Login
							</NavLink>
						</li>
						<li className="nav-item">
							<NavLink className="nav-link" to={"/compiler"}>
								Open Compiler
							</NavLink>
						</li>
						<li className="nav-item">
							<NavLink className="nav-link" to={"/addset"}>
								Add New Set
							</NavLink>
						</li>

						<li className="nav-item">
							<NavLink className="nav-link" to={"/pallate"}>
								Question Pallete
							</NavLink>
						</li>
						<li className="nav-item">
							<NavLink className="nav-link" to={"/addcq"}>
								AddCodingQ
							</NavLink>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	)
}

export default Navbar
