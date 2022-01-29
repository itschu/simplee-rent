import styled from "styled-components";

export const Wrapper = styled.div`
	margin-top: 5em;
	margin-bottom: 3em;
	& > h2 {
		text-align: center;
		margin-bottom: 2em;
	}

	& > div {
		display: grid;
		padding: 0 4em;
		grid-template-columns: 1fr;
	}

	& > div > div {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-evenly;
	}

	& p {
		text-align: center;
		width: 36ch;
		line-height: 150.5%;
	}

	@media screen and (min-width: 600px) {
		& > div {
			grid-template-columns: 1fr 1fr 1fr;
		}
	}
`;

export const UserImg = styled.div`
	width: 4em;
	height: 4em;
	border-radius: 50%;
	background-image: url(${({ bg_img }) => "/images/" + bg_img});
	background-size: cover;
	background-position: center;
	background-repeat: no-repeat;
	${({ bg_img }) => {
		// return("/images/"+bg_img);
	}}
`;
