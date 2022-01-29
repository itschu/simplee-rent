import styled from "styled-components";

export const Wrapper = styled.div`
	& > div {
		display: grid;
		padding: 4em 10em;
		grid-template-columns: 2fr 1fr 1fr 1fr;
	}

	& ul {
		padding: 0;
		font-size: 15px;
	}

	& ul li {
		list-style-type: none;
		display: flex;
		margin: 0.9em 0;
		text-transform: capitalize;
	}

	& > div > div:nth-child(4) > div {
		display: flex;
		justify-content: space-between;
        margin-top: 1.3em;
	}

	& > div > div:nth-child(4) ul li {
		text-transform: none;
        display: flex;
        align-items: center;
	}

	& > span {
		display: block;
		text-align: center;
		margin-bottom: 1em;
        font-size: 13px;
        font-weight: 500;
	}

    & h4{
        text-transform: capitalize;
    }
`;

export const Img = styled.div`
	margin-right: 10px;
	width: ${({ width }) => width};
`;
