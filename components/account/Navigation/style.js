import styled from "styled-components";

export const Wrapper = styled.div`
	background-color: red;
	display: ${({ stateStatus }) => (stateStatus ? "block" : "none")};
	width: 70vw;
	height: 100vh;
	position: fixed;
	z-index: 11;
	background-color: #023047;
	margin-top: 4.1em;
	box-shadow: 0px 20px 20px rgba(0, 0, 0, 0.15);
	transition: 2s;
	@media screen and (min-width: 600px) {
		transition: 0s;
		width: 17vw;
		display: block;
	}
`;

export const UnOrderedList = styled.ul`
	list-style-type: none;
	padding: 0;
	margin: 0;
`;

export const ListItem = styled.li`
	background: #b3daec;
	text-align: "left";
	width: 100%;
	padding: 20px 0;
	border: 1px solid #e5e5e5;
	font-weight: 600;
	${({ active }) => {
		if (active) {
			return `
                background: #fff;
                cursor: auto;
            `;
		}
	}}
`;

export const Anchor = styled.a`
	display: flex;
	padding-left: 4.4em;
	justify-content: flex-start;
	cursor: pointer;
	align-items: flex-start;
`;
