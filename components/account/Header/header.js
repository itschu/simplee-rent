import { Wrapper, UserPic, BurgerMenu, Logo, Div } from "./style";
import { useMenuState } from "../../../context";
import Image from "next/image";
import logoImg from "../../../public/images/logo.png";
// import Link from "next/link";

const Header = () => {
	const { State, toggleSate } = useMenuState();
	return (
		<Wrapper>
			<a href={'/'}>
				<Logo>
					<Image src={logoImg} />
				</Logo>
			</a>
			<Div>
				<UserPic imgSrc={"fritz.jpg"} />
				<BurgerMenu onClick={toggleSate} />
			</Div>
		</Wrapper>
	);
};

export default Header;
