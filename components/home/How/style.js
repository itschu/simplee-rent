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
	}

	& > h2,
	p {
		text-align: center;
		margin-top: 2em;
		width: 15ch;
		font-weight: 600;
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
