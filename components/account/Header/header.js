import { Wrapper, UserPic, BurgerMenu, Logo, Div } from "./style";
import { useMenuState } from "../../../context";
import Image from "next/image";
import logoImg from "../../../public/images/logo.png";
import Link from "next/link";
import { signOut } from "next-auth/react";

const Header = ({ userAvatar, noProfile }) => {
	const { State, toggleSate } = useMenuState();
	return (
		<Wrapper>
			<Link href={"/"} passHref>
				<Logo>
					<Image src={logoImg} priority alt="SImplee Rent logo" />
				</Logo>
			</Link>
			{noProfile == undefined && (
				<Div>
					<UserPic imgSrc={userAvatar} />
					<BurgerMenu onClick={toggleSate} alt="burger muenu" />
					<div className="dropdown-content">
						<a href="#">Profile</a>
						<a href="#" onClick={() => signOut()}>
							Logout
						</a>
					</div>
				</Div>
			)}
		</Wrapper>
	);
};

export default Header;
