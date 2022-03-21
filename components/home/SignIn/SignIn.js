import Nav from "../Nav";
import { Wrapper, Google, FormBtn } from "./style";
import { useState, useEffect } from "react";
import DropDown from "../DropDown/DropDown";
import { signIn } from "next-auth/react";
import { seriliazeInput, runInputValidation } from "../../../data";
import { ErrorMessage } from "../SignUp/style";
import { ImCancelCircle } from "react-icons/im";
import Router from "next/router";

const SignIn = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [error, setError] = useState({ msg: "", status: true });
	const [formInput, setFormInput] = useState({ email: "", password: "" });
	const [showLoading, setShowLoading] = useState(false);

	const toggle = () => setIsOpen(!isOpen);
	const details = {
		email: seriliazeInput(formInput.email),
		password: seriliazeInput(formInput.password),
	};
	useEffect(() => {
		if (
			Router.query.error == "OAuthAccountNotLinked" &&
			Router.query.callbackUrl == "/account/"
		) {
			setError({
				msg: "Please use the appropraite sign in method for the account ",
				status: false,
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const action = async (e) => {
		e.preventDefault();
		setShowLoading(true);
		// signIn("credentials", {
		// 	email: details.email,
		// 	password: details.password,
		// 	callbackUrl: `${window.location.origin}/account`,
		// 	redirect: false,
		// })
		// 	.then((error) => console.log(error))
		// 	.catch((error) => console.log(error));

		const checkMail = runInputValidation(
			formInput.email,
			"email",
			"email input"
		);

		if (checkMail.error !== false) {
			setError({ msg: checkMail.msg, status: false });
			window.scrollTo(0, 0);
			setShowLoading(false);
			return;
		}

		const res = await fetch(`/api/users/${details.email}`, {
			method: "Get",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
		});

		const { data, success } = await res.json();

		if (success == false) {
			setError({ msg: data, status: false });
			window.scrollTo(0, 0);
			setShowLoading(false);
			return;
		}

		const message = await signIn("email", {
			email: seriliazeInput(details.email),
			redirect: false,
		});
		setError({ msg: message.status, status: message.ok });
		setShowLoading(false);
	};
	return (
		<Wrapper>
			<div>
				<Nav toggle={toggle} />
				<DropDown status={isOpen} toggle={toggle} />
			</div>

			<div>
				<h2>Login</h2>
				<form onSubmit={(e) => action(e)}>
					{showLoading && (
						<div className="loading-offset">
							<div className="loader"></div>
						</div>
					)}
					<div>
						{error.msg !== "" && (
							<ErrorMessage status={error.status}>
								<span>
									{error.status
										? "A sign in link has been sent to your email address"
										: error.msg}
								</span>
								&nbsp;
								<ImCancelCircle
									onClick={() =>
										setError({ msg: "", status: true })
									}
								/>
							</ErrorMessage>
						)}

						<label>Email</label>
						<input
							name="email"
							value={formInput.email}
							type={"email"}
							onChange={(e) =>
								setFormInput({
									...formInput,
									email: e.target.value,
								})
							}
							required
						/>
					</div>
					{/* <div>
						<label>Password</label>
						<input
							name="password"
							value={formInput.password}
							type={"password"}
							onChange={(e) =>
								setFormInput({
									...formInput,
									password: e.target.value,
								})
							}
							required
						/>
					</div> */}
					<div>
						<FormBtn type="submit">Sign In</FormBtn>
						<Google
							type="button"
							onClick={() =>
								signIn("google", {
									callbackUrl: `${process.env.URL}signin`,
								})
							}
						>
							Sign in with Google
						</Google>
					</div>
				</form>
			</div>
		</Wrapper>
	);
};

export default SignIn;
