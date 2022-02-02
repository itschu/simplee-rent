import styled from "styled-components";
import { GoThreeBars } from "react-icons/go";

export const Wrapper = styled.div`
	height: 4em;
	position: fixed;
	z-index: 10;
	width: 100%;
	background-color: #023047;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding-right: 5vw;
	box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.25);
	@media screen and (min-width: 600px) {
		padding: 0 4.5vw;
	}
`;

export const UserPic = styled.div`
	height: 48px;
	width: 48px;
	background-color: #000;
	border: 2px solid #fff;
	border-radius: 42px;
	background-position: center;
	display: inline-block;
	background-size: contain;
	
	${({ imgSrc }) => {
		return `
            background-image: url(${imgSrc});
        `;
	}}
`;

export const BurgerMenu = styled(GoThreeBars)`
	color: #fff;
	font-size: 2em;
	display: inline-block;
	font-weight: bold;
	margin-left: 0.8em;
	@media screen and (min-width: 600px) {
		display: none;
	}
`;

export const Logo = styled.div`
	width: 8em;
	cursor: pointer;
	/* height: 65px; */
	/* background: #fff; */
	@media screen and (min-width: 600px) {
		margin-left: -0.6em;
	}
`;

export const Div = styled.div`
	display: flex;
	align-items: center;
`;
