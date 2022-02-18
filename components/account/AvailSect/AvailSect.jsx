import { useState, useEffect } from "react";
import { H1, Wrapper, Copy, Del, Edit } from "../DashSect/style";
import { AddProp } from "../PropSect/style";
import Image from "next/image";
import addImg from "../../../public/images/add.png";
import ShowingModal from "../ShowingSect/ShowingModal";
import { useAvailabilityContext, usePropertiesContext } from "../../../context";
import { NewsWrapper, News } from "../DashSect/style";
import { Notification } from "../ShowingSect/style";
import EditAvailability from "./EditAvailability";

const deleteAvailability = async (id) => {
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

const AvailSect = ({ page, session }) => {
	const { availability, setAvailability } = useAvailabilityContext();
	const { allProps } = usePropertiesContext();
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
		await deleteAvailability(id);
		setShowLoading(false);
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
				<div className="loading">
					<div className="loader"></div>
				</div>
			)}
			<H1> {page}. </H1>

			{availability.length < 1 && (
				<NewsWrapper>
					<News>
						<p>You haven&apos;t created any availlability yet.</p>
					</News>
				</NewsWrapper>
			)}

			<div className="card-wrapper">
				{availability.map((el, i) => (
					<div className="availability-card" key={i}>
						{/* <Setting /> */}
						<h3>{el.property}</h3>
						<p>{el.duration.map((el) => `${el} min(s), `)}</p>
						<hr />
						<div className="link">
							<p onClick={() => copyText(el.link, el.property)}>
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
				))}
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
			/>

			{edit && (
				<EditAvailability
					displayEdit={edit}
					close={closeEdit}
					session={session}
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
