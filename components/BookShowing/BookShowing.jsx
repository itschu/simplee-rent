import { useRouter } from "next/router";
import { Wrap } from "./style";

const BookShowing = () => {
	const router = useRouter();
	let { email, prop } = router.query;
	console.log(email, prop);
	return <Wrap></Wrap>;
};

export default BookShowing;
