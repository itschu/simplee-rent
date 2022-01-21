import styled from "styled-components";

export const Container = styled.table`
    background: #219EBC;    
    border: none;
    color: #fff;
    border-collapse:collapse;
    box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.15);
    border-radius: 15px;
    width: 100%;
    margin-top: 20px;
    @media screen and (min-width: 600px){
        width: 85%;
        margin-top: 49px;
    }
`;

export const Data = styled.tr`
    text-align: center;
    background: #fff;
    color: #000;
    border-bottom: 1px solid #CCCCCC;
    & > td{
        padding: 1em 0em;
    }
`;

export const HData = styled.th`
    padding: 1em 0em;
`;

export const ActionBtns = styled.div`
    width: 1em;
    cursor: pointer;

`;

export const BtnWrapper =  styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    
    & > div {
        margin: 0 12px;
    }
`;

export const Notification = styled.div`
    background: #47f547;
    color: #fff;
    padding: 0.7em 4em;
    text-align: center;
    position: absolute;
    left: 14%;
    bottom: 2em;
    border-radius: 1em;
    @media screen and (min-width: 600px){
        padding: 1.2em 13em;
        left: 33%;
        bottom: 1em;
    }
`;