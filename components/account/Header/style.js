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
	/* display: flex; */
	overflow: hidden;

	.dropdown-content {
		display: none;
		position: absolute;
		padding: 10px 0;
		background-color: #f9f9f9;
		min-width: 160px;
		/* display: flex; */
		top: 3.6em;
		right: 1em;
		flex-direction: column;
		box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
		z-index: 1;
	}

	.dropdown-content a {
		float: none;
		color: black;
		padding: 12px 16px;
		text-decoration: none;
		cursor: pointer;
		display: block;
		text-align: left;
	}
	.dropdown-content a:hover {
		background-color: #ddd;
	}

	&:hover .dropdown-content {
		display: flex;
	}
`;
