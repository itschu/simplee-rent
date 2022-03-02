import { Wrapper } from "./style";
import Nav from "../Nav";
import Button from "../Button";
import { useState } from "react";
import DropDown from "../DropDown/DropDown";

const Hero = () => {
	const [isOpen, setIsOpen] = useState(false);
	const toggle = () => setIsOpen(!isOpen);
	return (
		<>
			<Nav toggle={toggle} addPaddinfTop={true} />
			<DropDown status={isOpen} toggle={toggle} />
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
