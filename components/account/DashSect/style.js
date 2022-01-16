import styled from "styled-components";

export const Wrapper = styled.section`
    margin-left: 17vw;
    padding: 6.5em 4em;
`;

export const H1 = styled.h1`
    color: #8B8B8B;
    font-size: clamp(1rem, 10vw, 2rem); 
`;

export const H2 = styled.h2`
    font-size: 1.1em; 
    font-weight: 700;
`;

export const H3 = styled.h3`
    color: #8B8B8B;
    font-weight: 500;
    font-size: 1.3em;
`;

export const H4 = styled.h4`
    margin-top: 0em;;
    font-size: 2.6rem;
    font-weight: 700;
`;

export const Stats = styled.div`
    color: #000;
    background: #FFFFFF;
    box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.15);
    border-radius: 15px;
    display: flex;
    justify-content: space-between;
    padding: 1.2em 1.6em;
    padding-right: 2.5em;
`;

export const StatsWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 2.5em;
`;

export const News =  styled.div`
    background: #FFFFFF;
    padding: .7em;
    text-align: center;
    box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.15);
    border-radius: 15px;
    width: 50vw;
`;

export const NewsWrapper =  styled.div`
    margin-top: 5em;
`;