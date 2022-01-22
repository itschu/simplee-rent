import { Wrapper, UserPic, BurgerMenu, Logo, Div } from "./style";
import { useMenuState } from "../../../context";
import Image from "next/image";
import logoImg from "../../../public/images/logo.png";

const Header = () => {
	const { State, toggleSate } = useMenuState();
	return (
		<Wrapper>
			<Logo>
				<Image src={logoImg} />
			</Logo>
			<Div>
				<UserPic imgSrc={"fritz.jpg"} />
				<BurgerMenu onClick={toggleSate} />
			</Div>
		</Wrapper>
	);
};

export default Header;
