import Nav from "../Nav";
import { Wrapper } from "./style";
import { useState } from "react";
import DropDown from "../DropDown/DropDown";

const SignIn = () => {
	const [isOpen, setIsOpen] = useState(false);
	const toggle = () => setIsOpen(!isOpen);
	return (
		<Wrapper>
			<div>
				<Nav toggle={toggle} />
				<DropDown status={isOpen} toggle={toggle} />
			</div>

			<div>
				<h2>Login</h2>
				<form>
					<div>
						<label>Email</label>
						<input />
					</div>
					<div>
						<label>Password</label>
						<input />
					</div>
					<button>Login</button>
				</form>
			</div>
		</Wrapper>
	);
};

export default SignIn;
