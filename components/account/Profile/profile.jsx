import { Wrapper, H1 } from "../DashSect/style";
import { InputSeparator, Label, Input, Button } from "../PropSect/style";

const profile = ({ page, user }) => {
	return (
		<Wrapper>
			<H1> {page} </H1>

			<div>
				<InputSeparator>
					<Label>Name </Label>
					<Input
						type={"text"}
						disabled
						required={true}
						placeholder="Your full name"
						name="name"
						value={user.name}
					/>
				</InputSeparator>
				<InputSeparator>
					<Label>Email </Label>
					<Input
						type={"text"}
						disabled
						required={true}
						placeholder="Your full name"
						name="name"
						value={user.email}
					/>
				</InputSeparator>
				<Button btn_for="save" type="button" className="disabled">
					Save
				</Button>
			</div>
		</Wrapper>
	);
};

export default profile;
