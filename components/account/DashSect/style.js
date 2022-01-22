import styled from "styled-components";

export const Wrapper = styled.section`
	padding: 4em 2.5em;
	@media screen and (min-width: 600px) {
		margin-left: 17vw;
		padding: 6.5em 4em;
	}
`;

export const H1 = styled.h1`
	color: #8b8b8b;
	font-size: clamp(1rem, 10vw, 2rem);
`;

export const H2 = styled.h2`
	font-size: 1.1em;
	font-weight: 700;
`;

export const H3 = styled.h3`
	color: #8b8b8b;
	font-weight: 500;
	font-size: 1.3em;
`;

export const H4 = styled.h4`
	margin: 0em;
	font-size: 2.6rem;
	font-weight: 700;
`;

export const Stats = styled.div`
	color: #000;
	background: #ffffff;
	box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.15);
	border-radius: 15px;
	display: flex;
	justify-content: space-between;
	padding: 0.5em 0.5em;
	padding-right: 0em;
`;

export const StatsWrapper = styled.div`
	display: flex;
	flex-wrap: wrap;
	& div {
		flex: 1 1 300px;
		margin: 1em;
	}
`;

export const News = styled.div`
	background: #ffffff;
	padding: 0.7em 1.3em;
	text-align: center;
	box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.15);
	border-radius: 15px;
	width: 100%;
	@media screen and (min-width: 600px) {
		width: 50vw;
	}
`;

export const NewsWrapper = styled.div`
	margin-top: 5em;
`;
