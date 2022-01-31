import styled from "styled-components";

export const Wrapper = styled.section`
	background: #e8ecee;
	padding-bottom: 4em;

	& > div:first-child {
		position: relative;
		background: #023047;
		width: 100%;
		height: 65px;
		@media screen and (min-width: 600px) {
			height: 103px;
		}
	}

	& > div:last-child {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		margin-top: 3em;
	}

	& label {
		display: block;
		font-weight: 500;
		margin-bottom: 0.5em;
	}

	& form input {
		height: 2.8em;
		border: none;
		width: 23em;
		border-radius: 5px;
		@media screen and (min-width: 600px) {
			min-width: 35em;
		}
	}

	& form div {
		margin: 0.9em 0;
	}

	& form {
		border: 1px solid #b5b5b5;
		padding: 2em;
		border-radius: 10px;
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 90%;
		@media screen and (min-width: 600px) {
			width: auto;
		}
	}

	& form button {
		background: #023047;
		/* border: none; */
		border: 1px solid #023047;
		border-radius: 5px;
		color: #fff;
		padding: 10px 80px;
		margin-top: 1em;
		transition: 0.2s ease-in-out;
		box-sizing: border-box;
	}

	& form button:hover {
		background: transparent;
		color: #023047;
		box-sizing: border-box;	
		cursor: pointer;
		font-weight: 700;
	}

	& h2 {
		margin-top: ${({ addMargin }) => (addMargin ? "3em" : "auto")};
	}
`;
