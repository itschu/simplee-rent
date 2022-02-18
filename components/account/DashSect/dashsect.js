import {
	Wrapper,
	H1,
	StatsWrapper,
	Stats,
	H2,
	H3,
	H4,
	NewsWrapper,
	News,
} from "./style";
import { statistics } from "../../../data";
import {
	usePropertiesContext,
	useShowingsContext,
	useAvailabilityContext,
} from "../../../context";
import Image from "next/image";

const Dash = ({ page }) => {
	const { allProps } = usePropertiesContext();
	const { showings } = useShowingsContext();
	const { availability } = useAvailabilityContext();

	return (
		<Wrapper>
			<H1> {page}. </H1>
			<StatsWrapper>
				{statistics.map((el, i) => {
					return (
						<Stats key={i}>
							<div>
								<H2>{el.title}</H2>
								<H4>
									{el.title == "All Properties"
										? allProps.length
										: el.title == "Availability"
										? availability.length
										: el.title == "Showings"
										? showings.length
										: 0}
								</H4>
							</div>
							<div>
								<Image
									width={el.width}
									height={el.height}
									src={el.image}
									alt={`${el.title} image`}
								/>
							</div>
						</Stats>
					);
				})}
			</StatsWrapper>

			<NewsWrapper>
				<H3>Upcoming Showing</H3>
				<News>
					<p>You currently have no upcoming showing</p>
				</News>
			</NewsWrapper>
		</Wrapper>
	);
};

export default Dash;
