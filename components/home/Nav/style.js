import styled from "styled-components";

export const Navigation = styled.nav`
	position: absolute;
	z-index: 2;
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0 1.5em;
	padding-top: 1em;

	@media screen and (min-width: 600px) {
		padding: 0 4em;
		padding-top: 1em;
	}
	color: #fff;

	& > div {
		width: 2em;
	}

	& > ul {
		list-style-type: none;
		display: none;
		@media screen and (min-width: 600px) {
			display: flex;
		}
		align-items: center;
	}

	& > ul > li {
		margin: 0 1em;
		font-weight: 600;
		cursor: pointer;
		text-transform: capitalize;
		position: relative;
		&::after {
			transition: 0.9s ease-in-out;
		}

		&::after {
			content: "";
			position: absolute;
			left: 0;
			bottom: -10px;
			background-color: #fb8500;
			height: 2px;
			box-sizing: border-box;
			width: 0px;
			opacity: 0;
			transition: width 0.4s ease-in-out;
		}

		&:hover::after {
			opacity: 1;
			width: 50px;
		}
	}
	& > ul > li:last-child {
		&::after {
			content: none;
		}
	
	}
`;
