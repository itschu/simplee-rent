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
import Link from "next/link";
import { formatDate } from "../../../data";

const Dash = ({ page }) => {
	const { allProps } = usePropertiesContext();
	const { showings } = useShowingsContext();
	const { availability } = useAvailabilityContext();

	const todayShowing = showings.filter(
		(el) => formatDate(new Date(el.date)) == formatDate(new Date())
	);

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
				<H3>Upcoming Showings Today</H3>
				<News>
					{todayShowing.length < 1 ? (
						<p>You currently have no upcoming showing</p>
					) : (
						todayShowing.map((el, i) => (
							<Link href={"/account/showings"} key={i} passHref>
								<div className="align-left">
									<>
										{i !== 0 && <hr />}
										<p>
											{`${el.name}'s ${
												el.duration < 60
													? `${el.duration} minutes`
													: el.duration < 120
													? `${el.duration / 60} hour`
													: `${
															el.duration / 60
													  } hours`
											} Showing is by `}
											<b>{el.time}</b> today
										</p>
									</>
								</div>
							</Link>
						))
					)}
				</News>
			</NewsWrapper>
		</Wrapper>
	);
};

export default Dash;
