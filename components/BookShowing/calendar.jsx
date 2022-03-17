import GoogleLogin from "react-google-login";
import axios from "axios";
import { Wrap } from "./style";
import { useState } from "react";
import { useRouter } from "next/router";
import success_img from "../../public/images/checked.png";
import error_img from "../../public/images/error.png";
import { formatDate, get12hrs, dateInPast } from "../../data";
import moment from "moment";
import Link from "next/link";
import { Button } from "../account/PropSect/style";
import Image from "next/image";

const App = ({ info, showingInfo, property }) => {
	const router = useRouter();
	const { email, owner } = router.query;
	const [brokenLink, setBrokenLink] = useState(
		dateInPast(new Date(showingInfo[0]?.date), new Date(), true)
	);
	// console.log(showingInfo);
	const [loading, setLoading] = useState();
	const [eventStatus, setEventStatus] = useState(false);
	const [eventAdded, setEventAdded] = useState(false);

	const dureationNote =
		info[0].duration < 60
			? `${info[0].duration} minutes`
			: info[0].duration < 120
			? `${info[0].duration / 60} hour`
			: `${info[0].duration / 60} hours`;

	const oldDateObj = new Date(
		`${formatDate(showingInfo[0]?.date)} ${get12hrs(showingInfo[0]?.time)}`
	);
	const eventData = {
		summary: `A showing by ${info[0].owner} for ${info[0].property}`,
		description: `A ${dureationNote} showing organized by ${info[0].owner} for the property ${info[0].property}`,
		location: `${property[0]?.street} ${property[0]?.city}  ${property[0]?.country} `,
		colorId: "7",
		start: {
			dateTime: new Date(
				`${formatDate(showingInfo[0]?.date)} ${get12hrs(
					showingInfo[0]?.time
				)}`
			),
		},
		end: {
			dateTime: moment(oldDateObj).add(info[0].duration, "m").toDate(),
		},
	};

	if ((info.length == 0 || showingInfo.length == 0) && brokenLink == false) {
		setBrokenLink(true);
	}

	const responseGoogle = (res) => {
		const { code } = res;

		setLoading(true);
		axios
			.post(`/api/users/add_to_calendar/${email}`, { code, eventData })
			.then((response) => {
				setEventStatus(true);
				setEventAdded(response.data.success);
				setLoading(false);
			})
			.catch((err) => console.log(err.message));
	};

	const responseError = (err) => {
		console.log(err);
	};

	return (
		<Wrap>
			<form>
				{loading && (
					<div className="loading">
						<div className="loader"></div>
					</div>
				)}
				{eventStatus ? (
					<div className="success">
						<div className="img-good">
							<Image
								src={eventAdded ? success_img : error_img}
								alt={
									eventAdded ? "success image" : "error image"
								}
							/>
						</div>

						<h3>
							{eventAdded
								? "Congratulations"
								: "An Error Occurred"}
							!!
						</h3>
						<p id="para">
							{eventAdded
								? "You have successfully added the event to your calendar"
								: "Sorry, an error occurred when adding the event to your calendar, please contact support"}
						</p>
						<Link href={"/"} passHref>
							<Button btn_for="save" type="button">
								Back
							</Button>
						</Link>
					</div>
				) : (
					<div className="form-body">
						{brokenLink == false ? (
							<>
								<h2>
									<b>Congratulations!</b>
								</h2>
								<p
									style={{
										textAlign: "left",
										padding: "0 30px",
										lineHeight: "170%",
									}}
								>
									You have successfully booked a showing with
									&nbsp;
									{owner} for the property below, please click
									on the button below to authorize us to add
									this event to your calendar.
								</p>
								<div className="calendar-bnt-div">
									<div>
										<p>
											<b>Property Title</b> :&nbsp;
											{info[0].property}
										</p>
										<p>
											<b>Date</b> :{" "}
											{formatDate(showingInfo[0]?.date)}
										</p>
										<p>
											<b>Duration</b> : {dureationNote}
										</p>
										<p>
											<b>Time </b> :{" "}
											{showingInfo[0]?.time}
										</p>
										{/* <p>
										<b>Address</b> :
									</p> */}
										<p>
											<b>Owner</b> : {owner}
										</p>
									</div>
									<GoogleLogin
										clientId={
											process.env.NEXT_PUBLIC_GOOGLE_ID
										}
										buttonText={
											"Sign in & Authorize Calendar"
										}
										onSuccess={responseGoogle}
										onFailure={responseError}
										cookiePolicy={"single_host_origin"}
										responseType={"code"}
										accessType={"offline"}
										scope={
											"openid email profile https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/userinfo.email"
										}
									/>
								</div>
							</>
						) : (
							<>
								<h2>This link is invalid!!</h2>
								<p>
									Sorry it appears that <b>{owner}</b> has
									deleted this availability or it has &nbsp;
									<b>expired</b> please contact <b>{owner}</b>
									.
								</p>
							</>
						)}
					</div>
				)}
			</form>
		</Wrap>
	);
};

export default App;
