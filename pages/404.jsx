import Head from "../components/Head";
import Footer from "../components/home/Footer";
import Nav from "../components/home/Nav";
import DropDown from "../components/home/DropDown/DropDown";
import { useState } from "react";
import { Wrapper } from "../components/home/SignIn/style";

const Book = () => {
	const [isOpen, setIsOpen] = useState(false);
	const toggle = () => setIsOpen(!isOpen);
	1;
	return (
		<>
			<Head currentPage={"404"} />
			<Wrapper>
				<div>
					<Nav toggle={toggle} />
					<DropDown status={isOpen} toggle={toggle} />
				</div>
				<div id="main">
					<div className="fof">
						<h1>404 Page Not Found</h1>
						<p>Please stay on the right path.</p>
					</div>
				</div>
			</Wrapper>
			<Footer />
		</>
	);
};

export default Book;
