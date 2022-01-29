import styled from "styled-components";

export const Wrapper = styled.section`
	position: relative;
	background: red;
	width: 100%;
	height: 100vh;
	display: flex;
	flex-direction: column;
    color: #fff;
	align-items: center;
	justify-content: center;
    background-image: linear-gradient(rgba(0, 0, 0, 0.5),rgba(0, 0, 0, 0.5)), url('/images/bg.png');
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
    background-attachment: fixed;

	& > div {
		display: flex;
		flex-direction: column;
        text-align: center;
		align-items: center;
		justify-content: center;
	}

	& > div > h1 {
        font-size: 50px;
        font-weight: bolder;
        width: 30ch;
    }
`;
