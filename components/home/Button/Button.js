import { Btn } from "./style";
import Link from "next/link";

const Button = ({ text }) => {
	return (
		<Link href={"/signup"} passHref>
			<Btn>{text}</Btn>
		</Link>
	);
};

export default Button;
