import {
	H2,
	InputSeparator,
	Input,
	EditWrapper,
	CloseBtn,
	Label,
	UploadContainer,
	Button,
	ImgContainer,
} from "./style";
import { useRef } from "react";
import bgImg from "/public/images/img.png";
import Image from "next/image";
import { Error } from "../ShowingSect/style";

const Main = ({
	propState,
	close,
	img,
	fn,
	del,
	add,
	loadingState,
	imgData,
	errorstate,
	editError,
	setImgData,
}) => {
	const imgInput = useRef();
	// const [imgData, setImgData] = useState(null);
	const displayImg = (e) => {
		const reader = new FileReader();
		reader.addEventListener("load", () => {
			setImgData(reader.result);
		});
		e.target.files[0] && reader?.readAsDataURL(e.target.files[0]);
	};
	const propImg = propState.fileName ? `${img}/${propState.fileName}` : bgImg;

	const closeModal = () => {
		imgInput.current.value = "";
		setImgData(null);
		close();
	};

	return (
		<EditWrapper>
			{loadingState && (
				<div className="loading">
					<div className="loader"></div>
				</div>
			)}
			<div>
				<CloseBtn onClick={() => closeModal()} />
				<H2>{propState.title}</H2>

				{errorstate.status ? <Error>{errorstate.msg}</Error> : <br />}

				<InputSeparator>
					<Label>Property Title</Label>

					<Input
						type={"text"}
						name="property name"
						value={propState.name}
						onChange={(e) => {
							fn({ type: "changename", payload: e.target.value });
							errorstate &&
								editError({
									msg: "Please fill out all fields.",
									status: false,
								});
						}}
						required={true}
					/>
				</InputSeparator>

				<InputSeparator>
					<Label>Street</Label>
					<Input
						type={"text"}
						value={propState.street}
						name="street"
						onChange={(e) => {
							fn({
								type: "changestreet",
								payload: e.target.value,
							});
							errorstate &&
								editError({
									msg: "Please fill out all fields.",
									status: false,
								});
						}}
						required={true}
					/>
				</InputSeparator>

				<InputSeparator>
					<Label>City</Label>
					<Input
						type={"text"}
						value={propState.city}
						name="city"
						onChange={(e) => {
							fn({ type: "changecity", payload: e.target.value });
							errorstate &&
								editError({
									msg: "Please fill out all fields.",
									status: false,
								});
						}}
						required={true}
					/>
				</InputSeparator>

				<InputSeparator dg={true}>
					<div>
						<Label>Country</Label>
						<Input
							type={"text"}
							value={propState.country}
							name="country"
							onChange={(e) => {
								fn({
									type: "changecountry",
									payload: e.target.value,
								});
								errorstate &&
									editError({
										msg: "Please fill out all fields.",
										status: false,
									});
							}}
							required={true}
						/>
					</div>

					<div>
						<Label>Nuber of Units</Label>
						<Input
							type={"number"}
							min={1}
							name="units"
							value={propState.units}
							onChange={(e) => {
								fn({
									type: "changeunits",
									payload: e.target.value,
								});
								errorstate &&
									editError({
										msg: "Please fill out all fields.",
										status: false,
									});
							}}
							required={true}
						/>
					</div>
				</InputSeparator>
			</div>

			<UploadContainer>
				<ImgContainer>
					<Image
						src={imgData || propImg}
						layout="fill"
						alt="property image"
					/>
				</ImgContainer>
				<Input
					type={"file"}
					ref={imgInput}
					size="sm"
					aria-label="File browser"
					// value={propState.src?.name}
					onChange={(e) => {
						displayImg(e);
						fn({
							type: "changesrc",
							payload: e.target.files[0],
						});
					}}
				/>
				<br />

				{propState.title !== "Add New Property" ? (
					<div>
						<Button
							btn_for="save"
							type="button"
							onClick={() => add(propState)}
						>
							Save
						</Button>
						<Button btn_for="delete" onClick={(e) => del(e)}>
							Delete
						</Button>
					</div>
				) : (
					<Button btn_for="save" type="submit">
						Add
					</Button>
				)}
			</UploadContainer>
		</EditWrapper>
	);
};

export default Main;
