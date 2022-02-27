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

const Main = ({ propState, close, img, fn, del, add, loadingState }) => {
	// console.log(propState);
	return (
		<EditWrapper>
			{loadingState && (
				<div className="loading">
					<div className="loader"></div>
				</div>
			)}
			<div>
				<CloseBtn onClick={() => close()} />

				<H2>{propState.title}</H2>
				<br />
				<InputSeparator>
					<Label>Property Address</Label>
					<Input
						type={"text"}
						name="property name"
						value={propState.name}
						onChange={(e) =>
							fn({ type: "changename", payload: e.target.value })
						}
						required={true}
					/>
				</InputSeparator>

				<InputSeparator>
					<Label>Street</Label>
					<Input
						type={"text"}
						value={propState.street}
						name="street"
						onChange={(e) =>
							fn({
								type: "changestreet",
								payload: e.target.value,
							})
						}
						required={true}
					/>
				</InputSeparator>

				<InputSeparator>
					<Label>City</Label>
					<Input
						type={"text"}
						value={propState.city}
						name="city"
						onChange={(e) =>
							fn({ type: "changecity", payload: e.target.value })
						}
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
							onChange={(e) =>
								fn({
									type: "changecountry",
									payload: e.target.value,
								})
							}
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
							onChange={(e) =>
								fn({
									type: "changeunits",
									payload: e.target.value,
								})
							}
							required={true}
						/>
					</div>
				</InputSeparator>
			</div>

			<UploadContainer>
				<ImgContainer
					background={
						propState.fileName
							? `${img}/${propState.fileName}`
							: "/images/img.png"
					}
				/>
				<Input
					type={"file"}
					size="sm"
					aria-label="File browser"
					onChange={(e) =>
						fn({
							type: "changesrc",
							payload: e.target.files[0],
						})
					}
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
