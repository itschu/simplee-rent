import styled from "styled-components";
import a from "next/link";

export const Wrapper = styled.div`
    background-color: red;
    width: 60vw;
    height: 100vh;
    position: fixed;
    background-color: #023047;
    margin-top: 4.1em;
    box-shadow: 0px 20px 20px rgba(0, 0, 0, 0.15);
    @media screen and (min-width: 580px){
        width: 17vw;
    }
`;

export const UnOrderedList = styled.ul`
    list-style-type: none;
    padding: 0;
    margin: 0;
`;

export const ListItem = styled.li`
    background: #B3DAEC;
    text-align: center;
    width: 100%;
    padding: 20px 0;
    border: 1px solid #E5E5E5;
    font-weight: 600;
    ${({active}) => {
        if(active){
            return `
                background: #fff;
                cursor: auto;
            `;
        }
    }}
`;

export const Anchor = styled.a`
    display: flex;
    justify-content: center;
    cursor: pointer;
    align-items: center;
`;