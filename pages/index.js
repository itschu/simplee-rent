import Head from "../components/Head";
import Hero from "../components/home/Hero";
import How from "../components/home/How";
import About from "../components/home/About";
import Testimonial from "../components/home/Testimonial";
import CTA from "../components/home/CTA";
import Footer from "../components/home/Footer";

export default function Home() {
	return (
		<>
			<Head currentPage="Home" />
			<Hero />
			<How />
			<About />
			<Testimonial />
			<CTA />
			<Footer />
		</>
	);
}

