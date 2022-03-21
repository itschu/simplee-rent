import styled from "styled-components";

export const ErrorMessage = styled.div`
	background-color: ${({ status }) => (status ? "#00c600" : "tomato")};
	width: 100%;
	padding: 20px;
	color: #fff;
	border-radius: 10px;
	margin-top: -20px !important;
	margin-bottom: 30px !important;
	display: flex;
	justify-content: space-between;
	align-items: center;

	& > span {
		max-width: 35ch;
	}
`;
