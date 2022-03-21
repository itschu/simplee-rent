import { Wrapper, H1 } from "../DashSect/style";
import { useState } from "react";
import { InputSeparator, Label, Input, Button } from "../PropSect/style";
import { Error, CloseError } from "../ShowingSect/style";
import axios from "axios";

const Profile = ({ page, user }) => {
	// console.log(user);
	const [imgData, setImgData] = useState(user.image);
	const [name, setName] = useState(user.name);
	const [showError, setShowError] = useState(false);
	const [filePath, setFilePath] = useState(null);
	const [successMsg, setSuccessMsg] = useState(false);
	const [showLoading, setShowLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState(
		"Please fill out all fields."
	);

	const displayImg = (e) => {
		const reader = new FileReader();
		e.target.files[0]
			? reader.addEventListener("load", () => {
					setImgData(reader.result);
			  })
			: setImgData("");
		e.target.files[0] && reader?.readAsDataURL(e.target.files[0]);
		setFilePath(e.target.files[0]);
	};

	const saveProfile = async (e) => {
		setShowLoading(true);
		e.preventDefault();
		let image = false;
		let failedUpload = false;
		const formData = new FormData();
		if (name == "") {
			errorMessage = "Please fill out all fields.";
			setShowError(true);
			setShowLoading(false);
			window.scrollTo(0, 0);
			return;
		} else if (filePath instanceof Blob) {
			formData.append("file", filePath, filePath.name);
			let upload = { data: { success: false } };
			try {
				image = `${process.env.NEXT_PUBLIC_URL}images/properties/${user.email}/profile/${filePath.name}`;
				upload = await axios.post(
					"/api/properties/upload?more=profile",
					formData,
					{
						headers: {
							Accept: "application/json",
							"Content-Type": "multipart/form-data",
						},
					}
				);
				failedUpload = false;
			} catch (error) {
				image = user.image;
				failedUpload = true;
			}
			const {
				data: { success },
			} = upload;

			if (!success) {
				setErrorMessage(
					"Sorry an error ocurred while uploading your profile picture"
				);
				setShowError(true);
			}
		} else {
			image = user.image;
		}

		const res = await fetch(`/api/users`, {
			method: "PUT",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ name, image, id: user._id }),
		});

		const response = await res.json();

		if (response.success) {
			if (failedUpload == false) {
				setErrorMessage(`Your information was updated successfully.`);
				setSuccessMsg(true);
			} else {
				setErrorMessage(
					`Sorry an error ocurred while uploading your profile picture but infomation was updated successfully`
				);
			}
		} else {
			if (failedUpload == true) {
				setErrorMessage(
					`Sorry an error ocurred while uploading your profile picture and updating your details.`
				);
			} else {
				setErrorMessage(
					`Sorry an error ocurred while updating your details.`
				);
			}
		}
		setShowError(true);
		window.scrollTo(0, 0);
		setShowLoading(false);
	};

	return (
		<Wrapper>
			{showLoading && (
				<div className="loading-full">
					<div className="loader"></div>
				</div>
			)}
			<H1> {page} </H1>
			{showError && (
				<Error
					style={{
						fontSize: "14px",
						fontWeight: "500",
						backgroundColor: successMsg ? "#17eb17" : "tomato",
					}}
				>
					{errorMessage}
					<CloseError
						onClick={() => {
							setShowError(false);
							setSuccessMsg(false);
						}}
					/>
				</Error>
			)}
			<form onSubmit={(e) => saveProfile(e)}>
				<InputSeparator>
					<Label style={{ color: "#525252" }}>
						<b>Name</b>
					</Label>
					<Input
						type={"text"}
						required={true}
						placeholder="Your full name"
						name="name"
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
				</InputSeparator>
				<InputSeparator>
					<Label style={{ color: "#525252" }}>
						<b>Email</b>
					</Label>
					<Input
						type={"text"}
						disabled
						required={true}
						placeholder="Your email"
						name="name"
						value={user.email}
					/>
				</InputSeparator>
				<InputSeparator>
					<Label style={{ color: "#525252" }}>
						<b>Profile Picture</b>
					</Label>
					<div
						style={{
							display: "flex",
						}}
					>
						<div
							style={{
								background: `url(${imgData}) center/cover`,
								width: "50px",
								height: "40px",
								borderRadius: "4px",
								border: "1px solid #dcdcdc",
							}}
						></div>
						&nbsp;&nbsp;&nbsp;
						<Input
							type={"file"}
							size="sm"
							aria-label="File browser"
							onChange={(e) => {
								displayImg(e);
							}}
							style={{ maxWidth: "50%" }}
						/>
					</div>
				</InputSeparator>
				<br />
				<Button btn_for="save" type="submit">
					Save
				</Button>
			</form>
		</Wrapper>
	);
};

export default Profile;
