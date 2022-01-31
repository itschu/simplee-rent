import styled from "styled-components";

export const Btn = styled.button`
    text-transform: capitalize;
    display: block;
    width: 140px;
    padding: 1em;
    border-radius: 20px;
    border: none;
    outline: none;
    background: #FB8500;
    color: #fff;
    font-weight: 600;
    cursor: pointer;
    transition: 0.3s ease-in-out;

    &:hover{
        transform: scale(1.1);
        box-shadow: 0px 5px 10px #34343469;
    }
`;
