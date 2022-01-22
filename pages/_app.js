import "../styles/globals.css";
import "../styles/styles.css";
import { PropContext, AllShowingsContext } from "../context";

function MyApp({ Component, pageProps }) {
	return (
		<AllShowingsContext>
			<PropContext>
				<Component {...pageProps} />
			</PropContext>
		</AllShowingsContext>
	);
}

export default MyApp;
