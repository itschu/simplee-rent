import "../styles/globals.css";
import "../styles/styles.css";
import { PropContext, AllShowingsContext } from "../context";
import { SessionProvider } from "next-auth/react";
import "../styles/calendar.css";

export default ({ Component, pageProps: { session, ...pageProps } }) => {
	return (
		<SessionProvider session={session}>
			<AllShowingsContext>
				<PropContext>
					<Component {...pageProps} />
				</PropContext>
			</AllShowingsContext>
		</SessionProvider>
	);
};
