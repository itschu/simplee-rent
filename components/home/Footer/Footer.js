import Image from "next/image";
import { Wrapper, Img } from "./style";
import black_logo from "../../../public/images/black-logo.png";
import fb from "../../../public/images/icon-facebook.png";
import ig from "../../../public/images/icon-instagram.png";
import mail from "../../../public/images/icon-mail.png";
import phone from "../../../public/images/icon-phone.png";
import tweet from "../../../public/images/icon-twitter.png";

const Footer = () => {
	return (
		<Wrapper>
			<div>
				<div>
					<div>
						<Image src={black_logo} />
					</div>
					<p>Rent with Ease</p>
				</div>

				<div>
					<h4>links</h4>
					<ul>
						<li>home</li>
						<li>sign up</li>
						<li>site map</li>
					</ul>
				</div>

				<div>
					<h4>legal</h4>
					<ul>
						<li>terms of service</li>
						<li>privacy policy</li>
						<li>terms of use</li>
						<li>accessibility</li>
					</ul>
				</div>

				<div>
					<h4>contact</h4>
					<ul>
						<li>
							<Img width={"1.2em"}>
								<Image src={phone} />
							</Img>
							+1 (613) 720-2190
						</li>
						<li>
							<Img width={"1.2em"}>
								<Image src={mail} />
							</Img>
							support@simpleerent.com
						</li>
					</ul>
					<div>
						<Img width={"2em"}>
							<Image src={fb} />
						</Img>
						<Img width={"2em"}>
							<Image src={tweet} />
						</Img>
						<Img width={"2em"}>
							<Image src={ig} />
						</Img>
					</div>
				</div>
			</div>
			<span>&copy; simpleerent.com 2022 | All rights reserved. </span>
		</Wrapper>
	);
};

export default Footer;
