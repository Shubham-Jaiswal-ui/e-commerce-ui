import React, { useState } from "react";
import "./CSS/LoginSignup.css";

export default function LoginSignup() {
	const [state, setState] = useState("Login");
	const [formData, setFormData] = useState({
		username: "",
		password: "",
		email: "",
	});

	const changeHandler = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const login = async () => {
		let responseData;

		await fetch("http://localhost:4000/login", {
			method: "POST",
			headers: {
				Accept: "application/form-data",
				"Content-Type": "application/json",
			},
			body: JSON.stringify(formData),
		})
			.then((response) => response.json())
			.then((data) => (responseData = data));

		if (responseData.success) {
			localStorage.setItem("auth-token", responseData.token);
			window.location.replace("/");
		} else {
			alert(responseData.errors);
		}
	};
	const signUp = async () => {
		let responseData;

		await fetch("http://localhost:4000/signup", {
			method: "POST",
			headers: {
				Accept: "application/form-data",
				"Content-Type": "application/json",
			},
			body: JSON.stringify(formData),
		})
			.then((response) => response.json())
			.then((data) => (responseData = data));

		if (responseData.success) {
			localStorage.setItem("auth-token", responseData.token);
			window.location.replace("/");
		} else {
			alert(responseData.errors);
		}
	};

	return (
		<div className="loginsignup">
			<div className="loginsignup-container">
				<h1>{state}</h1>
				<div className="loginsignup-fields">
					{state === "Sign Up" ? (
						<input
							name="username"
							value={formData.username}
							type="text"
							placeholder="Your Name"
							onChange={changeHandler}
						/>
					) : (
						<></>
					)}
					<input
						name="email"
						value={formData.email}
						onChange={changeHandler}
						type="email"
						placeholder="Email Address"
					/>
					<input
						name="password"
						value={formData.password}
						onChange={changeHandler}
						type="password"
						placeholder="Password"
					/>
				</div>
				<button
					onClick={() => {
						state === "Login" ? login() : signUp();
					}}
				>
					Continue
				</button>
				{state === "Sign Up" ? (
					<p className="loginsignup-login">
						Already have an accoutn?{" "}
						<span
							onClick={() => {
								setState("Login");
							}}
						>
							Login here
						</span>
					</p>
				) : (
					<p className="loginsignup-login">
						Create an account?
						<span
							onClick={() => {
								setState("Sign Up");
							}}
						>
							Click here
						</span>
					</p>
				)}
				<div className="loginsignup-agree">
					<input type="checkbox" name="" id="" />
					<p>By continuing, I agree to the terma of use & privacy policy.</p>
				</div>
			</div>
		</div>
	);
}
