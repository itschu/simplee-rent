import Nav from "../Nav";
import { Wrapper } from "../SignIn/style";
import { useState } from "react";
import {Google, FormBtn} from '../SignIn/style'
import DropDown from "../DropDown/DropDown";
import { signIn } from "next-auth/react";

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
						<input name="first_name" type={"text"} />
					</div>
					<div>
						<label>Lsstname</label>
						<input name="last_name" type={"text"} />
					</div>
					<div>
						<label>Email</label>
						<input name="email" type={"text"} />
					</div>
					<div>
						<label>Password</label>
						<input name="password" type={"password"} />
					</div>
					<div>
						<label>Re-Type Password</label>
						<input name="password" type={"password"} />
					</div>
					<div>
						<FormBtn type="submit">Sign Up</FormBtn>
						<Google
							type="button"
							onClick={() => signIn("google")}
						>
							Login with Google
						</Google>
					</div>
				</form>
			</div>
		</Wrapper>
	);
};

export default SignUp;
