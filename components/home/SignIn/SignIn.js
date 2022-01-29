import Nav from "../Nav";
import { Wrapper } from "./style";


const SignIn = () => {
	return (
		<Wrapper>
			<div>
				<Nav />
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
