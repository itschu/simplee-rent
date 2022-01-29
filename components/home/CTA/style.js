import styled from "styled-components";

export const Wrapper = styled.section`
	height: 18em;
	width: 100%;
	background: red;
	background-image: url("/images/cta-bg.png");
	background-size: cover;
	background-position: center center;
	background-repeat: no-repeat;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    & > h3{
        text-transform: capitalize;
        font-size: 30px;
    }
`;
