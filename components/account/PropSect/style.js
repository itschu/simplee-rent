import styled from "styled-components";
import { AiFillCloseCircle } from "react-icons/ai";

export const AddProp = styled.div`
	width: 35px;
	height: 35px;
	border-radius: 30px;
	border: 2px solid #000;
	padding: 6px;
	cursor: pointer;
	position: fixed;
	bottom: 1.2em;
	right: 0.75em;
	@media screen and (min-width: 600px) {
		bottom: 2.5em;
		right: 1em;
		width: 40px;
		height: 40px;
	}
`;

export const PropCards = styled.div`
	background-color: royalblue;
	background-image: url(${({ bgImg }) => bgImg});
	background-position: center;
	background-size: cover;
	height: 320px;
	flex: 1 1 250px;
	margin: 15px 20px;
	border-radius: 10px;
	display: flex;
	flex-direction: column;
	justify-content: flex-end;
	padding: 20px;
	position: relative;
	color: #fff;
	cursor: pointer;
	filter: drop-shadow(0px 14px 10px rgba(0, 0, 0, 0.35));
	/* box-shadow: 0px 14px 20px rgba(0, 0, 0, 0.25); */

	&::before {
		content: "";
		position: absolute;
		left: 0;
		bottom: 0;
		top: 0;
		z-index: 2;
		width: 100%;
		background: linear-gradient(
			180.17deg,
			rgba(0, 0, 0, 0) 52.44%,
			#000000 99.85%
		);
		border-radius: 10px;
	}

	& > * {
		z-index: 3;
	}

	@media screen and (min-width: 600px) {
		margin: 20px;
	}
`;

export const PropCardWrapper = styled.div`
	display: flex;
	flex-wrap: wrap;
	@media screen and (min-width: 600px) {
		padding-right: 8em;
	}
`;

export const Span = styled.span`
	font-weight: 600;
`;

export const P = styled.p`
	font-weight: bold;
`;

export const AddItemOverlay = styled.div`
	width: 100%;
	position: fixed;
	top: 0;
	left: 0;
	bottom: 0;
	background: rgba(0, 0, 0, 0.51);
	backdrop-filter: blur(1.4px);
	z-index: 11;
	padding: 2em;
	overflow-x: auto;
	display: ${({ show }) => (show ? "flex" : "none")};
	& > * {
		z-index: 12;
	}
	/* display: flex; */
	justify-content: center;
	align-items: center;
`;

export const EditWrapper = styled.div`
	background: #ffffff;
	border-radius: 15px;
	width: 80vw;
	position: relative;
	padding: 1em 2.5em;
	padding-bottom: 2em;
	margin-top: 10em;
	@media screen and (min-width: 600px) {
		margin-top: 0;
		width: 60vw;
		padding: 1em 4em;
		padding-bottom: 3em;
		display: flex;
		& > div {
			flex: 1 1 450px;
		}
		& > form {
			flex: 1 1 450px;
		}
	}
`;

export const CloseBtn = styled(AiFillCloseCircle)`
	cursor: pointer;
	position: absolute;
	top: 0.5em;
	right: 0.5em;
	font-size: 20px;

	@media screen and (min-width: 600px) {
		top: 1.3em;
		right: 1.3em;
		font-size: 24px;
	}

	&:hover {
		color: red;
	}
`;

export const Button = styled.button`
	cursor: pointer;
	margin: 0.3em;
	margin-right: 0.9em;
	bottom: 0.5em;
	right: 0.5em;
	padding: 0.8em 1.5em;
	background: ${({ btn_for }) => (btn_for == "save" ? "#023047" : "red")};
	outline: none;
	border: none;
	color: #fff;
	border-radius: 5px;
	font-weight: 600;
	@media screen and (min-width: 600px) {
		bottom: 2.3em;
		right: 4em;
	}
`;

export const H2 = styled.h2``;

export const Input = styled.input`
	height: 3em;
	width: 100%;
	border-radius: 5px;
	padding-left: 10px;
	border: 1px solid #8b8b8b;
	font-family: "Montserrat", sans-serif;
	/* outline: 1px solid #023047; */
	${({ type }) => (type == "file" ? uploadInput : "")}
	@media screen and (min-width: 600px) {
		width: ${({ size }) => (size == "sm" ? "70%" : "100%")};
	}
`;

export const Label = styled.label`
	font-weight: 600;
	margin-bottom: 6px;
	display: block;
	font-size: 14px;
`;

export const InputSeparator = styled.div`
	margin: 20px 0;
	${({ dg }) => {
		if (dg) {
			return `
                display: grid;
                grid-template-columns: 1fr;
                gap: 1em;
            `;
		}
	}};
	@media screen and (min-width: 600px) {
		${({ dg, separate, checkbox }) => {
			if (dg) {
				return `
                    display: grid;
                    grid-template-columns: 2fr 1fr;
                    gap: 1em;
                `;
			}
			if (separate) {
				return `
					display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 1em;
					margin: 2em 0;
					align-items: center;
                `;
			}

			if (checkbox) {
				return `
					display: flex;
					justify-content: flex-start;
					flex-direction: column;
                `;
			}
		}};
	}
`;

export const UploadContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;

	@media screen and (min-width: 600px) {
		padding-left: 5em;
		align-items: flex-start;
	}
`;

const uploadInput = `
    border-radius: 5px;
    cursor: pointer;
    padding: .7em;
`;

export const ImgContainer = styled.div`
	/* background: red; */
	width: 100%;
	height: 210px;
	background-image: url(${({ background }) => background});
	margin-bottom: 2em;
	background-position: center;
	background-size: cover;
	/* object-fit: fill; */
	background-repeat: no-repeat;
	border-radius: 10px;
`;

export const Select = styled.select`
	height: 3em;
	width: 100%;
	border-radius: 5px;
	padding-left: 10px;
	font-family: "Montserrat", sans-serif;
	border: 1px solid #8b8b8b;
	/* outline: 1px solid #023047; */
	${({ type }) => (type == "file" ? uploadInput : "")}
	@media screen and (min-width: 600px) {
		width: ${({ size }) => (size == "sm" ? "70%" : "100%")};
	}
`;

export const Option = styled.option`
	font-family: "Montserrat", sans-serif;
`;
