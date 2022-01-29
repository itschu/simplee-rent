import Nav from "../Nav";
import { Wrapper } from "../SignIn/style";

const SignUp = () => {
	return (
		<Wrapper addMargin={true}>
			<div>
				<Nav />
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
