import styled from "styled-components";

export const Wrapper = styled.section`
	width: 100%;
	/* display: flex; */
	/* flex-direction: column; */
	/* justify-content: center; */
	margin-bottom: 5em;

	& > div {
		display: flex;
		align-items: center;
		padding: 0 3em;
		justify-content: space-around;
		flex-direction: column;
		@media screen and (min-width: 600px) {
			flex-direction: row;
		}
	}

	& > h2,
	p {
		text-align: center;
		margin-top: 2em;
		font-weight: 600;
		/* width: 20ch; */
		@media screen and (min-width: 600px) {
			width: 15ch;
		}
	}

	& > h2 {
		width: 100%;
		font-size: 30px;
		font-weight: bold;
		margin-bottom: 2.5em;
	}

	& > div > div:nth-child(odd) {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	& > div > div:nth-child(even) {
		width: 2em;
	}
`;

export const Img = styled.div`
	width: 10em;
`;
