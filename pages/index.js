import Head from "../components/Head";
import Hero from "../components/home/Hero";
import How from "../components/home/How";
import About from "../components/home/About";
import Testimonial from "../components/home/Testimonial/Testimonial";
import CTA from "../components/home/CTA/CTA";
import Footer from "../components/home/Footer/Footer";

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
