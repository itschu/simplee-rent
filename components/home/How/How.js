import { Wrapper, Img } from "./style";
import Image from "next/image";
import property from "../../../public/images/props.png";
import showing from "../../../public/images/showing.png";
import link from "../../../public/images/link.png";
import arrow from "../../../public/images/arrow-right.png";

const How = () => {
	return (
		<Wrapper id="how-section">
			<h2>How Does it Work</h2>
			<div>
				<div>
					<Img>
						<Image src={property} />
					</Img>
					<p>Add property</p>
				</div>
				<div>
					<Image src={arrow} />
				</div>
				<div>
					<Img>
						<Image src={showing} />
					</Img>
					<p>Create showing availabilities</p>
				</div>
				<div>
					<Image src={arrow} />
				</div>
				<div>
					<Img>
						<Image src={link} />
					</Img>
					<p>Share showing link with tenants</p>
				</div>
			</div>
		</Wrapper>
	);
};

export default How;
