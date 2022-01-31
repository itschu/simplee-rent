import Nav from "../Nav";
import { Wrapper } from "./style";
import { useState } from "react";
import DropDown from "../DropDown/DropDown";
import { signIn } from "next-auth/react";

const SignIn = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [formInput, setFormInput] = useState({ email: "", password: "" });
	const toggle = () => setIsOpen(!isOpen);
	const details = {
		email: formInput.email,
		password: formInput.password,
	};
	const action = async (e) => {
		e.preventDefault();
		//const user = await axios.post("api/auth/login", details);
		//console.log(user);
		signIn();
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
					<div>
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
						/>
					</div>
					<div>
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
						/>
					</div>
					<button>Login</button>
				</form>
			</div>
		</Wrapper>
	);
};

export default SignIn;
