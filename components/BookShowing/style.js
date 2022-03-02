import styled from "styled-components";

export const Wrap = styled.div`
	background: #e8ecee;
	padding: 7em 2em;
	display: flex;
	flex-direction: column;
	/* align-items: center; */
	padding-bottom: 4em;
	position: relative;
	@media screen and (min-width: 600px) {
		padding: 7em 9.5em;
		padding-bottom: 4em;
	}
	& button {
		margin-top: 30px;
		align-self: center;
	}

	& #para {
		text-align: center;
	}

	& h2,
	h3,
	h4,
	h5,
	h6 {
		text-align: center;
		color: #4e4e4e;
		font-weight: 500;
	}

	& h1 {
		padding-left: 1em;
		font-weight: 400;
		margin-bottom: 1em;
		font-size: 1.7em;
	}

	& .duration h3 {
		text-align: left;
	}

	& .date {
		/* background-color: aqua; */
		border-left: 1px solid #e7e7e7;
		border-right: 1px solid #e7e7e7;
	}

	& .time {
	}

	& .timeConainer {
		width: 100%;
		max-height: 216px;
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

	& form,
	.success {
		background: #fff;
		min-height: 30vh;
		border-radius: 15px;
		padding: 1.5em;
		display: flex;
		flex-direction: column;
	}

	.success > .img-good {
		align-self: center;
		width: 10em;
	}

	& > form > div.form-body {
		display: grid;
		@media screen and (min-width: 600px) {
			${({ link }) => {
				if (link) {
					return `grid-template-columns: 1fr 1fr 1fr;`;
				} else {
					return `grid-template-columns: 1fr;`;
				}
			}}
		}
	}

	& > form > div.form-body > div {
		position: relative;
		padding: 2em;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	& > form > div.form-body > P,
	h2 {
		text-align: center;
	}

	& form {
		position: relative;
	}

	& form .loading {
		border-radius: 15px;
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		z-index: 9;
		height: 100%;
		opacity: 0.75;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #000;
	}

	& form .loader {
		border: 6px solid #f3f3f3;
		border-radius: 50%;
		border-top: 6px solid #3498db;
		width: 100px;
		height: 100px;
		-webkit-animation: spin 2s linear infinite; /* Safari */
		animation: spin 2s linear infinite;
	}

	/* Safari */
	@-webkit-keyframes spin {
		0% {
			-webkit-transform: rotate(0deg);
		}
		100% {
			-webkit-transform: rotate(360deg);
		}
	}

	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
`;
