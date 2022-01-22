import styled from "styled-components";

export const Container = styled.table`
	background: #219ebc;
	border: none;
	color: #fff;
	border-collapse: collapse;
	box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.15);
	border-radius: 15px;
	width: 100%;
	margin-top: 20px;
	@media screen and (min-width: 600px) {
		width: 85%;
		margin-top: 49px;
	}
`;

export const Data = styled.tr`
	text-align: center;
	background: #fff;
	color: #000;
	border-bottom: 1px solid #cccccc;
	& > td {
		padding: 1em 0em;
	}
`;

export const HData = styled.th`
	padding: 1em 0em;
`;

export const ActionBtns = styled.div`
	width: 1em;
	cursor: pointer;
`;

export const BtnWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;

	& > div {
		margin: 0 12px;
	}
`;

export const Notification = styled.div`
	background: #47f547;
	color: #fff;
	padding: 0.7em 4em;
	text-align: center;
	position: absolute;
	left: 14%;
	bottom: 2em;
	border-radius: 1em;
	@media screen and (min-width: 600px) {
		padding: 1.2em 13em;
		left: 30%;
		bottom: 1em;
	}
`;

export const TimePickerWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
`;

export const TimePicker = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 65%;
	flex-direction: column;
`;

export const Time = styled.div`
	padding: 0.5em 0;
	border: 1px solid #dcdcdc;
	width: 100%;
	display: flex;
	/* background: #fff; */
	justify-content: center;
	cursor: pointer;
	text-transform: lowercase;
	&:hover, &:focus{
		background: #dcdc;
		color: #000;
	}
`;

export const GoUp = styled.div`
	background: #000;
	padding: 0.3em 0;
	width: 100%;
	display: flex;
	justify-content: center;
	cursor: pointer;
	& > div{
		width: 1.35em;
		transform: rotate(180deg);
	}
`;

export const GoDown = styled(GoUp)`
	& > div{
		transform: rotate(0deg);
	}
`;