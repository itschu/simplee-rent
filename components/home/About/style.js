import styled from "styled-components";

export const Wrapper = styled.section`
	display: grid;
	grid-template-columns: 1fr;

	@media screen and (min-width: 600px) {
		grid-template-columns: 1fr 1fr;
	}

	& > div:first-child {
		background-image: url("/images/sect-bg.png");
		background-size: cover;
		background-position: center center;
		background-repeat: no-repeat;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-evenly;
	}
`;

export const P = styled.p`
    width: 60ch;
    line-height: 175.5%;
    text-align: center;
`;
