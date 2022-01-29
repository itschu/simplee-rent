import Nav from "../Nav";
import { Wrapper } from "../SignIn/style";
import { useState } from "react";
import DropDown from "../DropDown/DropDown";

const SignUp = () => {
	const [isOpen, setIsOpen] = useState(false);
	const toggle = () => setIsOpen(!isOpen);
	return (
		<Wrapper addMargin={true}>
			<div>
				<Nav toggle={toggle} />
				<DropDown status={isOpen} toggle={toggle} />
			</div>
			<div>
				<h2>Create A Landlord Account</h2>
				<form>
					<div>
						<label>Name</label>
						<input />
					</div>
					<div>
						<label>Email</label>
						<input />
					</div>
					<div>
						<label>Password</label>
						<input />
					</div>
					<div>
						<label>Re-Type Password</label>
						<input />
					</div>
					<button>Login</button>
				</form>
			</div>
		</Wrapper>
	);
};

export default SignUp;
