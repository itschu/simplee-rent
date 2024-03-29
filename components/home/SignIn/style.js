import styled from "styled-components";

export const Wrapper = styled.section`
	background: #e8ecee;
	padding-bottom: 4em;

	& > div:first-child {
		position: relative;
		background: #023047;
		display: flex;
		justify-content: center;
		align-items: center;
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
		padding-left: 13px;
		width: 23em;
		border-radius: 5px;
		font-family: "Montserrat", sans-serif;
		@media screen and (min-width: 600px) {
			min-width: 35em;
		}
	}

	& form div {
		margin: 0.9em 0;
	}

	& form {
		position: relative;
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

	& h2 {
		margin-top: ${({ addMargin }) => (addMargin ? "3em" : "auto")};
	}

	& #main {
		display: table;
		width: 100%;
		/* height: 100vh; */
		text-align: center;
	}

	& .fof {
		display: table-cell;
		vertical-align: middle;
	}

	& .fof h1 {
		font-size: 50px;
		display: inline-block;
		padding-right: 12px;
		animation: type 0.5s alternate infinite;
	}

	@keyframes type {
		from {
			box-shadow: inset -3px 0px 0px #888;
		}
		to {
			box-shadow: inset -3px 0px 0px transparent;
		}
	}

`;

export const Google = styled.button`
	transition: background-color 0.3s, box-shadow 0.3s;

	padding: 12px 16px 12px 42px;
	border: none;
	border-radius: 3px;
	box-shadow: 0 -1px 0 rgba(0, 0, 0, 0.04), 0 1px 1px rgba(0, 0, 0, 0.25);

	color: #757575;
	font-size: 14px;
	font-weight: 500;
	font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
		Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue",
		sans-serif;

	background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBkPSJNMTcuNiA5LjJsLS4xLTEuOEg5djMuNGg0LjhDMTMuNiAxMiAxMyAxMyAxMiAxMy42djIuMmgzYTguOCA4LjggMCAwIDAgMi42LTYuNnoiIGZpbGw9IiM0Mjg1RjQiIGZpbGwtcnVsZT0ibm9uemVybyIvPjxwYXRoIGQ9Ik05IDE4YzIuNCAwIDQuNS0uOCA2LTIuMmwtMy0yLjJhNS40IDUuNCAwIDAgMS04LTIuOUgxVjEzYTkgOSAwIDAgMCA4IDV6IiBmaWxsPSIjMzRBODUzIiBmaWxsLXJ1bGU9Im5vbnplcm8iLz48cGF0aCBkPSJNNCAxMC43YTUuNCA1LjQgMCAwIDEgMC0zLjRWNUgxYTkgOSAwIDAgMCAwIDhsMy0yLjN6IiBmaWxsPSIjRkJCQzA1IiBmaWxsLXJ1bGU9Im5vbnplcm8iLz48cGF0aCBkPSJNOSAzLjZjMS4zIDAgMi41LjQgMy40IDEuM0wxNSAyLjNBOSA5IDAgMCAwIDEgNWwzIDIuNGE1LjQgNS40IDAgMCAxIDUtMy43eiIgZmlsbD0iI0VBNDMzNSIgZmlsbC1ydWxlPSJub256ZXJvIi8+PHBhdGggZD0iTTAgMGgxOHYxOEgweiIvPjwvZz48L3N2Zz4=);
	background-color: white;
	background-repeat: no-repeat;
	background-position: 12px 11px;

	&:hover {
		box-shadow: 0 -1px 0 rgba(0, 0, 0, 0.04), 0 2px 4px rgba(0, 0, 0, 0.25);
	}

	&:active {
		background-color: #eeeeee;
	}

	&:focus {
		outline: none;
		box-shadow: 0 -1px 0 rgba(0, 0, 0, 0.04), 0 2px 4px rgba(0, 0, 0, 0.25),
			0 0 0 3px #c8dafc;
	}

	&:disabled {
		filter: grayscale(100%);
		background-color: #ebebeb;
		box-shadow: 0 -1px 0 rgba(0, 0, 0, 0.04), 0 1px 1px rgba(0, 0, 0, 0.25);
		cursor: not-allowed;
	}
	cursor: pointer;
`;

export const FormBtn = styled.button`
	background: #023047;
	/* border: none; */
	border: 1px solid #023047;
	border-radius: 3px;
	color: #fff;
	padding: 10px 80px;
	padding: 12px 16px;
	margin-top: 1em;
	transition: 0.2s ease-in-out;
	box-sizing: border-box;
	margin-right: 10px;

	& :hover {
		background: transparent;
		color: #023047;
		box-sizing: border-box;
		cursor: pointer;
		font-weight: 700;
	}
`;
