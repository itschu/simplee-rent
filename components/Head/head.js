import Head from "next/head";
import { project } from "../../data";

const HtmlHead = ({ currentPage }) => {
	return (
		<Head>
			<title>
				{project.title} | {currentPage}
			</title>
			<meta name="description" content={project.descContent} />
			<link rel="icon" href="images/logo-icon.png" type="image/x-icon" />
		</Head>
	);
};

export default HtmlHead;
