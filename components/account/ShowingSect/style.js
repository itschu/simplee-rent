import styled from "styled-components";
import { Input } from "../PropSect/style";
import { BiPlusMedical } from "react-icons/bi";
import { FaMinus } from "react-icons/fa";
import { VscClose } from "react-icons/vsc";

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
	font-size: 13px;
	border: 1px solid #dcdcdc;
	width: 100%;
	display: flex;
	/* background: #fff; */
	justify-content: center;
	cursor: pointer;
	text-transform: lowercase;
	&:hover,
	&:focus {
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
	& > div {
		width: 1.35em;
		transform: rotate(180deg);
	}
`;

export const GoDown = styled(GoUp)`
	& > div {
		transform: rotate(0deg);
	}
`;

export const CalendarDiv = styled.div`
	display: flex;
	position: relative;
	flex-direction: column;
	& > div:last-child {
		margin-top: 1em;
	}
	@media screen and (min-width: 600px) {
		flex-direction: column;
		& > div:last-child {
			align-self: flex-start;
		}

		& > div:last-child > div:last-child {
			position: relative;
		}
	}
`;

export const TimeWrapper = styled.div`
	display: flex;
	align-items: center;

	& > div {
		font-weight: 600;
		font-size: 0.9em;
		margin: 0 1em;
	}
`;

export const TimeInput = styled(Input)`
	text-align: center;
	display: inline-block;
	width: 100%;
	margin: 0.7em 0;
`;

export const ConfirmButton = styled.button`
	background: #0069ff;
	min-height: 40px;
	padding: 0px 20px;
	border: 1px solid transparent;
	border-radius: 20px;
	font-family: "Montserrat", sans-serif;
	font-weight: 500;
	color: #fff;
	margin-top: 0.6em;
	cursor: pointer;
`;

const buttonStyle = `
	color: #219ebc;
	font-size: 2.3em;
	cursor: pointer;
	margin-left:.4em;
`;

export const AddTime = styled(BiPlusMedical)`
	${buttonStyle}
	${({ see }) => (see == "hidden" ? "color: #000" : "color: #219ebc;")};
`;

export const RemoveTime = styled(FaMinus)`
	${buttonStyle}
	color: #000;
	&:hover {
		color: red;
	}
`;

export const Wrap = styled.div`
	position: relative;
	align-items: center;
	display: flex;
	margin-bottom: 0.9em;
`;

export const Separate = styled.span`
	margin: 0 10px;
`;

export const Error = styled.div`
	background: #cf0000;
	text-align: center;
	padding: 10px 10px;
	font-size: 11px;
	margin-top: 15px;
	border-radius: 7px;
	color: #fff;
	display: flex;
	justify-content: center;
	transition: 0.9s;
`;

export const CloseError = styled(VscClose)`
	font-size: 14px;
	margin-left: 15px;
	font-weight: bold;
	cursor: pointer;
`;
