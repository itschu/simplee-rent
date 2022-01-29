import { useState, useEffect } from "react";
import { H1, Wrapper } from "../DashSect/style";
import { AddProp } from "../PropSect/style";
import {
	Container,
	Data,
	ActionBtns,
	HData,
	BtnWrapper,
	Notification,
} from "./style";
import Image from "next/image";
import addImg from "../../../public/images/add.png";
import copy from "../../../public/images/copy.png";
import edit from "../../../public/images/edit.png";
import del from "../../../public/images/delete.png";
import { useShowingsContext, usePropertiesContext } from "../../../context";
import ShowingModal from "./ShowingModal";

const ShowingSect = ({ page }) => {
	const [showOverlay, setShowOverlay] = useState(false);
	const [displayNotify, setDisplayNotify] = useState(false);
	const { showings, setShowings } = useShowingsContext();
	const { allProps } = usePropertiesContext();

	const copyText = (value) => {
		navigator.clipboard.writeText(value);
		setDisplayNotify(!displayNotify);
	};

	const delItem = (id) => {
		const list = showings.filter((el) => el.id !== id);
		setShowings([...list]);
	};

	const closeOverlay = () => {
		setShowOverlay(!showOverlay);
	};

	const openModal = () => {
		if (allProps.length < 1) {
			alert("Please add a property before creating a showing");
		} else {
			setShowOverlay(!showOverlay);
		}
	};

	useEffect(() => {
		showings.map(() => {});
		setTimeout(() => {
			setDisplayNotify(false);
		}, 1500);
	});
	return (
		<Wrapper>
			<H1>All {page}. </H1>
			<Container cellspacing="0" cellpadding="0">
				<thead>
					<tr>
						<HData>SN</HData>
						<HData>Property</HData>
						<HData>Time</HData>
						<HData>Action</HData>
					</tr>
				</thead>
				<tbody>
					{showings.length > 0 ? (
						showings.map((el, i) => (
							<Data key={el.id}>
								<td>
									<b>{i + 1}.</b>
								</td>
								<td>{el.property}</td>
								<td>{el.display_time}</td>
								<td>
									<BtnWrapper>
										<ActionBtns>
											<Image
												src={copy}
												alt="add more properties"
												onClick={() =>
													copyText(el.link)
												}
											/>
										</ActionBtns>
										<ActionBtns>
											<Image
												src={edit}
												alt="add more properties"
											/>
										</ActionBtns>
										<ActionBtns>
											<Image
												src={del}
												alt="add more properties"
												onClick={() => delItem(el.id)}
											/>
										</ActionBtns>
									</BtnWrapper>
								</td>
							</Data>
						))
					) : (
						<Data>
							<td colSpan={4}>No data found!</td>
						</Data>
					)}
				</tbody>
			</Container>

			<AddProp>
				<Image
					src={addImg}
					alt="add more properties"
					onClick={openModal}
				/>
			</AddProp>

			{displayNotify && (
				<Notification>
					<b>Link has been copied to clipboard.</b>
				</Notification>
			)}

			<ShowingModal
				displayOverlay={showOverlay}
				close={closeOverlay}
				allProps={allProps}
				list={showings}
				editList={setShowings}
			/>
		</Wrapper>
	);
};

export default ShowingSect;
