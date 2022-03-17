import "../styles/globals.css";
import "../styles/styles.css";
import "react-day-picker/lib/style.css";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { Progress } from "../components/progress";
import { useProgressStore } from "../store";
import {
	PropContext,
	AllShowingsContext,
	AvailabilityContext,
} from "../context";
import { SessionProvider } from "next-auth/react";
import "../styles/calendar.css";

const App = ({ Component, pageProps: { session, ...pageProps } }) => {
	const setIsAnimating = useProgressStore((state) => state.setIsAnimating);
	const isAnimating = useProgressStore((state) => state.isAnimating);
	const router = useRouter();
	useEffect(() => {
		const handleStart = () => {
			setIsAnimating(true);
		};
		const handleStop = () => {
			setIsAnimating(false);
		};

		router.events.on("routeChangeStart", handleStart);
		router.events.on("routeChangeComplete", handleStop);
		router.events.on("routeChangeError", handleStop);

		return () => {
			router.events.off("routeChangeStart", handleStart);
			router.events.off("routeChangeComplete", handleStop);
			router.events.off("routeChangeError", handleStop);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [router]);
	return (
		<>
			<Progress isAnimating={isAnimating} />
			<SessionProvider session={session}>
				<AllShowingsContext>
					<AvailabilityContext>
						<PropContext>
							<Component {...pageProps} />
						</PropContext>
					</AvailabilityContext>
				</AllShowingsContext>
			</SessionProvider>
			<script
				src="https://apis.google.com/js/api.js"
				type="text/javascript"
			></script>
		</>
	);
};

export default App;
