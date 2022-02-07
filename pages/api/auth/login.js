// import { sign } from "jsonwebtoken";
// import { serialize } from "cookie";

// const secret = process.env.SECRET;

// const Login = async (req, res) => {
// 	const { email, password } = req.body;
// 	if (email == "admin@gmail.com" && password == "admin") {
// 		const token = sign(
// 			{
// 				exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30, //keep alive for 30days
// 				username: email,
// 			},
// 			secret
// 		);
// 		const serialised = serialize("simpleerent", token, {
// 			httpOnly: true,
// 			secure: process.env.NODE_ENV !== "development",
// 			sameSite: "strict",
// 			maxAge: 60 * 60 * 24 * 30,
// 			path: "/",
// 		});

// 		res.setHeader("Set-Cookie", serialised);
// 		res.status(200).json({ message: "success" });
// 	} else {
// 		return res.json({ message: "Invalid credentials", body: req.body });
// 	}
// };

// export default Login;