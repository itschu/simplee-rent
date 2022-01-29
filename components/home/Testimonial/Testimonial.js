import Image from "next/image";
import { Wrapper, UserImg } from "./style";
import img1 from "../../../public/images/testimony1.jpg";
import img2 from "../../../public/images/testimony2.jpg";
import img3 from "../../../public/images/testimony3.jpg";

const Testimonial = () => {
	return (
		<Wrapper id="testimonial-section">
			<h2>What People Are Saying</h2>
			<div>
				<div>
					<UserImg bg_img={"testimony2.jpg"} />
					<p>
						I love that it automatically syncs my showings with my
						every day calendar
					</p>
					<span>
						<b>Lynda</b>
					</span>
				</div>

				<div>
					<UserImg bg_img={"testimony3.jpg"} />
					<p>
						Saved me a lot of back and forth with landlords. I was
						able to just chose the time that worked for.
					</p>
					<span>
						<b>James</b>
					</span>
				</div>

				<div>
					<UserImg bg_img={"testimony1.jpg"} />
					<p>
						Simplee Rent saved me a lot of time, I dont need to jump
						through multiple platforms to see what time works for
						which viewers.
					</p>
					<span>
						<b>Pascal</b>
					</span>
				</div>
			</div>
		</Wrapper>
	);
};

export default Testimonial;
