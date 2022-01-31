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
						<label>Firstname</label>
						<input name="first_name" type={"text"}/>
					</div>
					<div>
						<label>Lsstname</label>
						<input name="last_name" type={"text"}/>
					</div>
					<div>
						<label>Email</label>
						<input name="email" type={"text"}/>
					</div>
					<div>
						<label>Password</label>
						<input name="password" type={"password"} />
					</div>
					<div>
						<label>Re-Type Password</label>
						<input name="password" type={"password"} />
					</div>
					<button>Register</button>
				</form>
			</div>
		</Wrapper>
	);
};

export default SignUp;
