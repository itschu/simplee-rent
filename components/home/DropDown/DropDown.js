import Button from "../Button/";
import Link from "next/link";
import { Wrapper, Icon } from "./style";
import { useSession } from "next-auth/react";

const DropDown = ({ status, toggle }) => {
	const { data: session } = useSession();

	return (
		<Wrapper show={status}>
			<div>
				<Icon onClick={toggle} />
			</div>
			<div>
				<ul>
					<li>
						<span onClick={toggle}>
							<Link href={"/"}>home</Link>
						</span>
					</li>
					<li>
						<span onClick={toggle}>
							<Link href={"/#how-section"}>how does it work</Link>
						</span>
					</li>
					<li>
						<span onClick={toggle}>
							<Link href={"/#about-section"}>about</Link>
						</span>
					</li>
					<li>
						<span onClick={toggle}>
							<Link href={"/#testimonial-section"}>
								testimonial
							</Link>
						</span>
					</li>
					{!session && (
						<li>
							<span onClick={toggle}>
								<Link href={"/signin"}>sign in</Link>
							</span>
						</li>
					)}

					{session && (
						<li>
							<Button text={"My Account"} />
						</li>
					)}
				</ul>
				{!session && (
					<div>
						<span onClick={toggle}>
							<Button text={"sign up"} />
						</span>
					</div>
				)}
			</div>
		</Wrapper>
	);
};

export default DropDown;
