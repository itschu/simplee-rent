import Image from "next/image";
import Button from "../Button";
import { Wrapper, P } from "./style";
import bg from "../../../public/images/home-pic.png";

const About = () => {
	return (
		<Wrapper id="about-section">
			<div>
				<h2>About Simplee Rent</h2>
				<P>
					We are a group of savy landlords that believes in
					‘Simplee’-fying life for other fellow landlords and real
					estate investors. We envision a future where landlords can
					fill up a vacant property with a lick of a button.
				</P>
				<Button text={"start now"} />
			</div>

			<div>
				<Image src={bg} />
			</div>
		</Wrapper>
	);
};

export default About;
