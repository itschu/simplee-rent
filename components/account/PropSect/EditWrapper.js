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

const Main = ({ propState, close, img, fn, del, add }) => {
	return (
		<EditWrapper>
			<div>
				<CloseBtn onClick={() => close()} />

				<H2>{propState.title}</H2>
				<br />
				<InputSeparator>
					<Label>Name</Label>
					<Input
						type={"text"}
						value={propState.name}
						onChange={(e) =>
							fn({ type: "changename", payload: e.target.value })
						}
						required={true}
					/>
				</InputSeparator>

				<InputSeparator dg={true}>
					<div>
						<Label>Street</Label>
						<Input
							type={"text"}
							value={propState.street}
							onChange={(e) =>
								fn({
									type: "changestreet",
									payload: e.target.value,
								})
							}
							required={true}
						/>
					</div>

					<div>
						<Label>Units</Label>
						<Input
							type={"number"}
							min={0}
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

				<InputSeparator>
					<Label>City</Label>
					<Input
						type={"text"}
						value={propState.city}
						onChange={(e) =>
							fn({ type: "changecity", payload: e.target.value })
						}
						required={true}
					/>
				</InputSeparator>

				<InputSeparator>
					<Label>Country</Label>
					<Input
						type={"text"}
						value={propState.country}
						onChange={(e) =>
							fn({
								type: "changecountry",
								payload: e.target.value,
							})
						}
						required={true}
					/>
				</InputSeparator>
			</div>

			<UploadContainer>
				<ImgContainer
					background={propState.img !== "" ? img : "/images/img.png"}
				/>
				<Input type={"file"} size="sm" aria-label="File browser" />
				<br />

				{propState.title !== "Add New Property" ? (
					<div>
						<Button type="save">Save</Button>
						<Button
							type="delete"
							prompt="Are yoy"
							onClick={(e) => del(e)}
						>
							Delete
						</Button>
					</div>
				) : (
					<Button type="save">
						Add
					</Button>
				)}
			</UploadContainer>
		</EditWrapper>
	);
};

export default Main;
