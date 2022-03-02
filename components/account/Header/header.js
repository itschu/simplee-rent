import { Wrapper, UserPic, BurgerMenu, Logo, Div } from "./style";
import { useMenuState } from "../../../context";
import Image from "next/image";
import logoImg from "../../../public/images/logo.png";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { Progress } from "../../progress";
import { useProgressStore } from "../../../store";

const Header = ({ userAvatar, noProfile }) => {
	const setIsAnimating = useProgressStore((state) => state.setIsAnimating);
	const isAnimating = useProgressStore((state) => state.isAnimating);
	const router = useRouter();
	useEffect(() => {
		const handleStart = () => {
			setIsAnimating(true);
		};
		const handleStop = () => {
			setIsAnimating(false);
		};

		router.events.on("routeChangeStart", handleStart);
		router.events.on("routeChangeComplete", handleStop);
		router.events.on("routeChangeError", handleStop);

		return () => {
			router.events.off("routeChangeStart", handleStart);
			router.events.off("routeChangeComplete", handleStop);
			router.events.off("routeChangeError", handleStop);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [router]);
	const { State, toggleSate } = useMenuState();
	return (
		<>
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
							<Link href="/account/profile" passHref>
								<a>Profile</a>
							</Link>
							<a href="#" onClick={() => signOut()}>
								Logout
							</a>
						</div>
					</Div>
				)}
			</Wrapper>
			<Progress isAnimating={isAnimating} />
		</>
	);
};

export default Header;
