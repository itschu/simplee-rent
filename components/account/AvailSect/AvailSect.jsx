import { useState, useEffect } from "react";
import { H1, Wrapper, Copy, Del, Edit } from "../DashSect/style";
import { AddProp } from "../PropSect/style";
import Image from "next/image";
import addImg from "../../../public/images/add.png";
import ShowingModal from "../ShowingSect/ShowingModal";
import {
	useAvailabilityContext,
	usePropertiesContext,
	useShowingsContext,
} from "../../../context";
import { NewsWrapper, News } from "../DashSect/style";
import { Notification } from "../ShowingSect/style";
import EditAvailability from "./EditAvailability";
import { formatDate, mergeDate, get12hrs } from "../../../data";
import { deleteShowing } from "../ShowingSect/ShowingSect";

export const deleteAvailability = async (id) => {
	try {
		const res = await fetch(`/api/availability/${id}`, {
			method: "DELETE",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
		});
		if (res.ok) {
		}
		return true;
	} catch (error) {
		return false;
	}
};

export const dateInPast = function (firstDate, secondDate, addToday = false) {
	if (addToday) {
		if (firstDate.setHours(0, 0, 0, 0) <= secondDate.setHours(0, 0, 0, 0)) {
			return true;
		}
	} else {
		if (firstDate.setHours(0, 0, 0, 0) < secondDate.setHours(0, 0, 0, 0)) {
			return true;
		}
	}

	return false;
};

const currentTime = get12hrs(
	new Date().toLocaleTimeString("en-US", {
		hour: "numeric",
		hour12: true,
		minute: "numeric",
	})
);

const AvailSect = ({ page, session }) => {
	let n = [];

	const { availability, setAvailability } = useAvailabilityContext();
	const { allProps } = usePropertiesContext();
	const { showings, setShowings } = useShowingsContext();

	const [currentModal, setCurrentModal] = useState([]);
	const [showOverlay, setShowOverlay] = useState(false);
	const [displayNotify, setDisplayNotify] = useState(false);
	const [edit, setEdit] = useState(false);
	const [editProp, setEditProp] = useState("");
	const [showLoading, setShowLoading] = useState(false);

	// console.log(availability);

	const filteredProps = allProps.filter(
		(elem) => !availability.find(({ unique }) => elem.unique === unique)
	);
	const openModal = () => {
		if (allProps.length < 1) {
			alert("Please add a property before creating availability.");
		} else {
			if (availability.length > 0 && filteredProps.length < 1) {
				alert(
					"You have already created availability for all your property."
				);
			} else {
				setShowOverlay(!showOverlay);
			}
		}
	};

	useEffect(() => {
		if (displayNotify) {
			setTimeout(() => {
				setDisplayNotify(!displayNotify);
			}, 1500);
		}
	}, [displayNotify]);

	const copyText = (value) => {
		navigator.clipboard.writeText(value);
		setDisplayNotify(!displayNotify);
	};

	const delItem = async (id) => {
		setShowLoading(true);
		const list = availability.filter((el) => el._id !== id);
		const [list_old] = availability.filter((el) => el._id == id);
		const new_showing_list = showings.filter(
			(el) => list_old.id !== el.propertyId
		);
		// console.log(list_old.id);
		await deleteAvailability(id);
		await deleteShowing(list_old.id);
		setShowLoading(false);
		setShowings([...new_showing_list]);
		setAvailability([...list]);
	};

	const closeOverlay = () => {
		setShowOverlay(!showOverlay);
	};

	const closeEdit = () => {
		// setEditProp("");
		setEdit(!edit);
	};

	const openEdit = (id) => {
		setEditProp(id);
		setEdit(!edit);
	};

	return (
		<Wrapper>
			{showLoading && (
				<div className="loading-full">
					<div className="loader"></div>
				</div>
			)}
			<H1> {page} </H1>

			{availability.length < 1 && (
				<NewsWrapper>
					<News>
						<p>You haven&apos;t created any availlability yet.</p>
					</News>
				</NewsWrapper>
			)}

			<div className="card-wrapper">
				{availability.map((el, i) => {
					let showExpired = false;
					const datesPassed =
						el.date.filter((elem) => {
							if (dateInPast(new Date(elem), new Date())) {
								return true;
							}
						}).length == el.date.length
							? true
							: false;
					const todayPassed =
						el.date.filter((elem) => {
							if (dateInPast(new Date(elem), new Date(), true)) {
								return true;
							}
						}).length == el.date.length
							? true
							: false;
					const t_data = mergeDate(
						el.time[0],
						el.time[1],
						el.time[2],
						true
					).sort();

					if (!datesPassed) {
						if (todayPassed) {
							let x = 0;
							t_data.forEach((element) => {
								if (element === "00:00") {
									return;
								}
								if (element <= currentTime) {
									x += 1;
								}
							});

							if (x == t_data.length) {
								showExpired = true;
							}
						}
					} else {
						showExpired = true;
					}
					return (
						<div className="availability-card" key={i}>
							{el.date.filter((elem) => {
								if (dateInPast(new Date(elem), new Date())) {
									return true;
								}
							}).length == el.date.length ? (
								<div className="ribbon">
									<span>Expired</span>
								</div>
							) : (
								showExpired && (
									<div className="ribbon">
										<span>Expired</span>
									</div>
								)
							)}

							{el.date.length == 1 &&
								formatDate(new Date()) ==
									formatDate(el.date[0]) &&
								showExpired && (
									<div className="ribbon">
										<span>Expired</span>
									</div>
								)}

							<h3>{el.property}</h3>

							<p>
								{el.duration.map((el) =>
									el < 60
										? `${el} minutes showing`
										: el < 120
										? `${el / 60} hour showing`
										: `${el / 60} hours showing`
								)}
							</p>
							<hr />
							<div className="link">
								<p
									onClick={() =>
										copyText(el.link, el.property)
									}
								>
									<Copy />
									&nbsp;Copy Link
								</p>
								<div className="actions">
									<button
										className="button"
										onClick={() => openEdit(el.id)}
									>
										<Edit />
									</button>
									&nbsp; &nbsp;
									<button
										className="color button"
										onClick={() => delItem(el._id)}
									>
										<Del />
									</button>
								</div>
							</div>
						</div>
					);
				})}
			</div>

			<AddProp>
				<Image
					src={addImg}
					alt="add more properties"
					onClick={openModal}
				/>
			</AddProp>

			<ShowingModal
				displayOverlay={showOverlay}
				close={closeOverlay}
				allProps={allProps}
				list={availability}
				editList={setAvailability}
				curr={currentModal}
				setCurr={setCurrentModal}
				session={session}
				loadingState={showLoading}
				loadingState_fn={setShowLoading}
			/>

			{edit && (
				<EditAvailability
					displayEdit={edit}
					close={closeEdit}
					session={session}
					loadingState={showLoading}
					currentProp={editProp}
				/>
			)}

			{displayNotify && (
				<Notification>
					<>Link has been copied to clipboard.</>
				</Notification>
			)}
		</Wrapper>
	);
};

export default AvailSect;
