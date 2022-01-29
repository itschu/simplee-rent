import { Wrapper } from "./style";
import Nav from "../Nav/";
import Button from "../Button";

const Hero = () => {
	return (
		<>
			<Nav />
			<Wrapper>
				<div>
					<h1>
						Cordinating showings with potential tenants has never
						been easier!
					</h1>
					<Button text={"start now"} />
				</div>
			</Wrapper>
		</>
	);
};

export default Hero;
