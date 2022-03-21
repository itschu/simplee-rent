import Image from "next/image";
import { Wrapper, Img } from "./style";
import black_logo from "../../../public/images/black-logo.png";
import fb from "../../../public/images/icon-facebook.png";
import ig from "../../../public/images/icon-instagram.png";
import mail from "../../../public/images/icon-mail.png";
import phone from "../../../public/images/icon-phone.png";
import tweet from "../../../public/images/icon-twitter.png";

const Footer = () => {
	const year = new Date();
	return (
		<Wrapper>
			<div>
				<div>
					<div>
						<Image src={black_logo} alt="Simplee rent logo" />
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
								<Image src={phone} alt="phone icon" />
							</Img>
							<a href={`tel:${process.env.NEXT_PUBLIC_PHONE}`}>
								&nbsp;
								{process.env.NEXT_PUBLIC_PHONE}
							</a>
						</li>
						<li>
							<Img width={"1.2em"}>
								<Image src={mail} alt="email icon" />
							</Img>
							<a
								href={`mailto:info@${process.env.NEXT_PUBLIC_DOMAIN}`}
							>
								info@{process.env.NEXT_PUBLIC_DOMAIN}
							</a>
						</li>
					</ul>
					<div>
						<Img width={"1.6em"}>
							<Image src={fb} alt="facebook icon" />
						</Img>
						<Img width={"1.6em"}>
							<Image src={tweet} alt="twitter icon" />
						</Img>
						<Img width={"1.6em"}>
							<Image src={ig} alt="instagram icon" />
						</Img>
					</div>
				</div>
			</div>
			<span>
				&copy; {process.env.NEXT_PUBLIC_DOMAIN} {year.getUTCFullYear()}{" "}
				| All rights reserved.
			</span>
		</Wrapper>
	);
};

export default Footer;
