import styled from "styled-components";

export const Wrapper = styled.section`
	background: #e8ecee;
    padding-bottom: 4em;

	& > div:first-child {
		position: relative;
		background: #023047;
		width: 100%;
		height: 130px;
	}

	& > div:last-child {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		min-height: 60vh;
	}

	& label {
		display: block;
		font-weight: 500;
		margin-bottom: 0.5em;
	}

	& form input {
		height: 2.8em;
		min-width: 35em;
		border: none;
		border-radius: 5px;
	}

	& form div {
		margin: .9em 0;
	}

	& form {
		border: 1px solid #b5b5b5;
		padding: 2em;
		border-radius: 10px;
        display: flex;
        flex-direction: column;
        align-items: center;
	}

	& form button {
		background: #023047;
        border: none;
        border-radius: 5px;
        color: #fff;
        padding: 10px 80px;
        margin-top: 1em;
	}

	& h2{
		margin-top: ${({addMargin}) => addMargin ? '3em' : 'auto'};
	}

`;
