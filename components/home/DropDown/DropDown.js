import Button from "../Button/";
import Link from "next/link";
import { Wrapper, Icon } from "./style";

const DropDown = ({ status, toggle }) => {
	return (
		<Wrapper show={status}>
			<div>
				<Icon onClick={toggle} />
			</div>
			<div>
				<ul>
					<li>
						<a onClick={toggle}>
							<Link href={"/"}>home</Link>
						</a>
					</li>
					<li>
						<a onClick={toggle}>
							<Link href={"/#how-section"}>how does it work</Link>
						</a>
					</li>
					<li>
						<a onClick={toggle}>
							<Link href={"/#about-section"}>about</Link>
						</a>
					</li>
					<li>
						<a onClick={toggle}>
							<Link href={"/#testimonial-section"}>
								testimonial
							</Link>
						</a>
					</li>
					<li>
						<a onClick={toggle}>
							<Link href={"signin"}>sign in</Link>
						</a>
					</li>
				</ul>
				<div>
					<a onClick={toggle}>
						<Button text={"sign up"} />
					</a>
				</div>
			</div>
		</Wrapper>
	);
};

export default DropDown;
