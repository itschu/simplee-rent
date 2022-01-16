import styled from "styled-components";

export const Wrapper = styled.div`
    height: 4em;
    position: fixed;
    width: 100%; 
    background-color: #023047;
    display: flex;
    justify-content: end;
    align-items: center;
    padding-right: 10vw;
    box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.25);
`;

export const UserPic = styled.div`
    height: 48px;
    width: 48px; 
    background-color: #000;
    border: 2px solid #fff;
    border-radius: 42px;
    background-position: center;
    background-size: contain;
    ${({imgSrc}) => {
        return(`
            background-image: url(/images/${imgSrc});
        `)
    }}
    
`;