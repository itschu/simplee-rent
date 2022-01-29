import { Navigation } from "./style";
import Image from "next/image";
import logo from "../../../public/images/logo-icon.png";
import Button from "../Button/";	
import Link from "next/link";
import { BurgerMenu } from "../../account/Header/style";

const Nav = ({ toggle }) => {
	return (
		<Navigation>
			<div>
				<Link href={"/"}>
					<Image src={logo} />
				</Link>
			</div>
			<ul>
				<li>
					<Link href={"/"}>home</Link>
				</li>
				<li>
					<Link href={"/#how-section"}>how does it work</Link>
				</li>
				<li>
					<Link href={"/#about-section"}>about</Link>
				</li>
				<li>
					<Link href={"/#testimonial-section"}>testimonial</Link>
				</li>
				<li>
					<Link href={"signin"}>sign in</Link>
				</li>
				<li>
					<Button text={"sign up"} />
				</li>
			</ul>
			<BurgerMenu onClick={toggle} />
		</Navigation>
	);
};

export default Nav;
