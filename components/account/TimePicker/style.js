import styled from "styled-components";

export const Wrapper = styled.div`
    display: flex;
	justify-content: space-around;
	align-items: center;
	width: 100%;
	max-width: 200px;
	margin: 0 auto;
	padding: 10px 0;
	/* background-color: #F3F3F3; */
	border-radius: 8px;
	/* box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.2); */
    border: 1px solid #838383;
	color: #53565A;
	font-size: 32px;
	font-weight: 700;
	user-select: none;

    & > div{
        position: relative;
        min-width: 60px;
        text-align: center;
        display: flex;
        justify-content: stretch;
        align-items: stretch;
    }
`;

export const Nav = styled.div`
    position: absolute;
	left: 50%;
	transform: translateX(-50%);
	/* width: 5px; */
	/* height: 5px; */
	border-left: 10px solid transparent;
	border-right: 10px solid transparent;
	cursor: pointer;
    &:hover{
        border-bottom-color: #AAA;
	    border-top-color: #53565A;
    }
    ${({go}) => go == 'up' && `top: -3px;
	border-bottom: 11px solid #5a5a5a;`}
    ${({go}) => go == 'down' && `bottom: -3px;
	border-top: 11px solid #AAA;`}
`;

export const Separate = styled.span``;

export const Input = styled.input`
    background: none;
	font-size: 13px;
	appearance: none;
	border: none;
	outline: none;
	display: block;
	width: 100%;
	text-align: center;
    margin: 10px 0;
    font-weight: 600;
`;
