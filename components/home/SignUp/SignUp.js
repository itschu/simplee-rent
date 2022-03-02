import Nav from "../Nav";
import { Wrapper } from "../SignIn/style";
import { useState } from "react";
import { Google, FormBtn } from "../SignIn/style";
import DropDown from "../DropDown/DropDown";
import { signIn } from "next-auth/react";
import { seriliazeInput, runInputValidation } from "../../../data";
import { ImCancelCircle } from "react-icons/im";
import { ErrorMessage } from "./style";

const SignUp = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [error, setError] = useState({ msg: "", status: true });
	const [showLoading, setShowLoading] = useState(false);

	const [formInput, setFormInput] = useState({
		email: "",
		password: "",
		re_password: "",
		first_name: "",
		last_name: "",
	});
	const toggle = () => setIsOpen(!isOpen);

	const action = async (e) => {
		setShowLoading(true);
		setError({ msg: "", status: true });
		e.preventDefault();
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

		if (formInput.password !== formInput.re_password) {
			setError({ msg: "passwords do not match", status: false });
			window.scrollTo(0, 0);
			setShowLoading(false);
			return;
		}

		const details = {
			email: seriliazeInput(formInput.email),
			password: formInput.password,
			name: seriliazeInput(
				`${formInput.first_name} ${formInput.last_name}`
			),
		};

		try {
			const get = await fetch(`/api/users`, {
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				body: JSON.stringify(details),
			})
				.then((response) => response.json())
				.then((data) => data);

			setError({ msg: get.data, status: get.success });
			window.scrollTo(0, 0);
			setShowLoading(false);
			return;
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<Wrapper addMargin={true}>
			<div>
				<Nav toggle={toggle} />
				<DropDown status={isOpen} toggle={toggle} />
			</div>
			<div>
				<h2>Create A Landlord Account</h2>
				<form onSubmit={(e) => action(e)}>
					{showLoading && (
						<div className="loading-offset">
							<div className="loader"></div>
						</div>
					)}
					<div>
						{error.msg !== "" && (
							<ErrorMessage status={error.status}>
								{error.msg}
								<ImCancelCircle
									onClick={() =>
										setError({ msg: "", status: true })
									}
								/>
							</ErrorMessage>
						)}

						<label>First Name</label>
						<input
							name="first_name"
							required
							value={formInput.first_name}
							type={"text"}
							onChange={(e) => {
								setFormInput({
									...formInput,
									first_name: e.target.value,
								});
								setError({ msg: "", status: true });
							}}
						/>
					</div>
					<div>
						<label>Last Name</label>
						<input
							name="last_name"
							required
							value={formInput.last_name}
							type={"text"}
							onChange={(e) => {
								setFormInput({
									...formInput,
									last_name: e.target.value,
								});
								setError({ msg: "", status: true });
							}}
						/>
					</div>
					<div>
						<label>Email</label>
						<input
							required
							name="email"
							value={formInput.email}
							type={"email"}
							onChange={(e) => {
								setFormInput({
									...formInput,
									email: e.target.value,
								});
								setError({ msg: "", status: true });
							}}
						/>
					</div>
					<div>
						<label>Password</label>
						<input
							required
							name="password"
							value={formInput.password}
							onChange={(e) => {
								setFormInput({
									...formInput,
									password: e.target.value,
								});
								setError({ msg: "", status: true });
							}}
							type={"password"}
						/>
					</div>
					<div>
						<label>Re-Type Password</label>
						<input
							required
							name="re-password"
							value={formInput.re_password}
							onChange={(e) => {
								setFormInput({
									...formInput,
									re_password: e.target.value,
								});
								setError({ msg: "", status: true });
							}}
							type={"password"}
						/>
					</div>
					<div>
						<FormBtn type="submit">Sign Up</FormBtn>
						<Google
							type="button"
							onClick={() =>
								signIn("google", {
									callbackUrl: `${process.env.URL}signin`,
								})
							}
						>
							Sign Up with Google
						</Google>
					</div>
				</form>
			</div>
		</Wrapper>
	);
};

export default SignUp;
