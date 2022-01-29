import styled from "styled-components";

export const Wrapper = styled.section`
	position: relative;
	/* background: red; */
	width: 100%;
	height: 100vh;
	display: flex;
	flex-direction: column;
	color: #fff;
	align-items: center;
	justify-content: center;
	background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
		url("/images/bg.png");
	background-size: cover;
	background-position: center center;
	background-repeat: no-repeat;
	background-attachment: fixed;

	& > div {
		display: flex;
		flex-direction: column;
		text-align: center;
		align-items: center;
		justify-content: center;
	}

	& > div > h1 {
		font-weight: bolder;
		font-size: 25px;
		padding: 0 20px;
		text-transform: capitalize;
		line-height: 145%;
		@media screen and (min-width: 600px) {
			width: 30ch;
			font-size: 50px;
		}
	}
`;
