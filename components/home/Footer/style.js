import styled from "styled-components";

export const Wrapper = styled.div`
	& > div {
		padding: 2.5em 2em;

		@media screen and (min-width: 600px) {
			display: grid;
			grid-template-columns: 2fr 1fr 1fr 1fr;
			padding: 4em 10em;
		}
	}

	& > div > div:first-child {
		border-bottom: 1px solid #ccc;
		@media screen and (min-width: 600px) {
			border-bottom: none;
		}
	}

	& ul {
		padding: 0;
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

	& > div > div:nth-child(4) ul li > a{
		color: #0079b5;
	}

	& > span {
		display: block;
		text-align: center;
		margin-bottom: 1em;
		font-size: 11px;
		font-weight: 500;
	}

	& h4 {
		text-transform: capitalize;
		margin-top: 2.5em;
		@media screen and (min-width: 600px) {
		}
	}
`;

export const Img = styled.div`
	margin-right: 10px;
	width: ${({ width }) => width};
`;
