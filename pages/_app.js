import "../styles/globals.css";
import "../styles/styles.css";
import {
	PropContext,
	AllShowingsContext,
	AvailabilityContext,
} from "../context";
import { SessionProvider } from "next-auth/react";
import "../styles/calendar.css";

const App = ({ Component, pageProps: { session, ...pageProps } }) => {
	return (
		<SessionProvider session={session}>
			<AllShowingsContext>
				<AvailabilityContext>
					<PropContext>
						<Component {...pageProps} />
					</PropContext>
				</AvailabilityContext>
			</AllShowingsContext>
		</SessionProvider>
	);
};

export default App;
