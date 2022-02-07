import { Navigation } from "./style";
import Image from "next/image";
import logo from "../../../public/images/logo-icon.png";
import Button from "../Button/";
import Link from "next/link";
import { BurgerMenu } from "../../account/Header/style";
import { useSession } from "next-auth/react";

const Nav = ({ toggle }) => {
	const { data: session } = useSession();
	return (
		<Navigation>
			<div>
				<Link href={"/"} passHref>
					<Image src={logo} alt="Simplee Rent logo"/>
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
				{!session && (
					<>
						<li >
							<Link href={"signin"}>sign in</Link>
						</li>
						<li>
							<Button text={"sign up"} />
						</li>
					</>
				)}

				{session && (
					<li>
						<Button text={"My Account"} />
					</li>
				)}
			</ul>
			<BurgerMenu onClick={toggle} />
		</Navigation>
	);
};

export default Nav;
