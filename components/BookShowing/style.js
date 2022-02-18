import styled from "styled-components";

export const Wrap = styled.div`
	background: #e8ecee;
	padding: 7em 2em;
	padding-bottom: 4em;
	position: relative;
	@media screen and (min-width: 600px) {
		padding: 7em 9.5em;
		padding-bottom: 4em;
	}

	& .duration {
		/* background-color: red; */
	}

	& .date {
		/* background-color: green; */
	}

	& .time {
		/* background-color: aqua; */
	}

	& .timeConainer {
		width: 100%;
		height: 216px;
		overflow-y: scroll;
		scrollbar-width: thin;
		scrollbar-color: blue #dcdcdc;

		&::-webkit-scrollbar {
			width: 8px;
		}

		&::-webkit-scrollbar-track {
			background: #dcdcdc;
		}

		&::-webkit-scrollbar-thumb {
			background-color: blue;
			border-radius: 20px;
			border: 1px solid #dcdcdc;
		}
	}

	& > form {
		background: #fff;
		min-height: 30vh;
		display: grid;
		padding: 1.5em;
		@media screen and (min-width: 600px) {
			${({ link }) => {
				if (link) {
					return `grid-template-columns: 1fr 1fr 1fr;`;
				} else {
					return `grid-template-columns: 1fr;`;
				}
			}}
		}
		border-radius: 15px;
	}

	& > form > div {
		position: relative;
		padding: 2em;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	& > form > P, h2{
		text-align: center;
	}
`;
