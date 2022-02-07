import styled from "styled-components";
import { IoCopyOutline } from "react-icons/io5";
import { IoIosSettings } from "react-icons/io";
import { BsShare } from "react-icons/bs";
import { MdDeleteSweep } from "react-icons/md";
import { RiEditBoxLine } from "react-icons/ri";

export const Copy = styled(IoCopyOutline)``;

export const Del = styled(MdDeleteSweep)``;

export const Edit = styled(RiEditBoxLine)``;

export const Share = styled(BsShare)``;

export const Setting = styled(IoIosSettings)`
	position: absolute;
	cursor: pointer;
	right: 15px;
	font-size: 1.2em;
`;

export const Wrapper = styled.section`
	padding: 4em 2.5em;
	@media screen and (min-width: 600px) {
		margin-left: 17vw;
		padding: 6.5em 4em;
	}

	.availability-card {
		position: relative;
		background: #fff;
		padding: 1em;
		padding-top: 0.6em;
		padding-bottom: 1em;
		border: 1px solid #dcdcdc;
		border-radius: 5px;
		transition: 0.3s;
	}

	.availability-card:hover {
		box-shadow: 0px 4px 20px rgb(0 0 0 / 15%);
		transform: scale(1.02);
	}

	hr {
		margin: 0.6em 0;
	}

	.link p {
		display: flex;
		align-items: center;
		font-size: 13px;
		border: 1px solid #ababab;
		padding: 8px 15px; 
		border-radius: 20px;
	}

	.link p:hover {
		cursor: pointer;
	}

	.link {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.card-wrapper {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		grid-gap: 1.5em;
		margin-top: 3em;
	}

	.button {
		color: #fff;
		border: none;
		background: #4aa5d7;
		padding: 10px;
		border-radius: 50%;
		cursor: pointer;
		outline: none;
		display: flex;
		align-items: center;
	}

	.actions {
		display: flex;
		align-items: center;
	}

	.color {
		background: #e73c3c;
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
