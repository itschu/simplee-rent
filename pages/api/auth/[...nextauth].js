import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "../../../lib/mongodb";
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "../../../config/db";
import usersModel from "../../../models/usersModel";
import { compare } from "bcryptjs";
import EmailProvider from "next-auth/providers/email";

export default NextAuth({
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_ID,
			clientSecret: process.env.GOOGLE_SECRET,
			authorizationUrl:
				"https://accounts.google.com/o/oauth2/v2/auth?prompt=consent&access_type=offline&response_type=code",
		}),
		CredentialsProvider({
			name: "Credentials",
			async authorize(credentials, req) {
				try {
					await dbConnect();
					const result = await usersModel.find({
						email: credentials.email,
					});

					if (result.length < 1) {
						throw new Error("No user found with the email");
					} else if (result[0]?.password == undefined) {
						throw new Error(
							"Use the correct sign in option for this account"
						);
					}
					const checkPassword = await compare(
						credentials.password,
						result[0].password
					);

					if (!checkPassword) {
						throw new Error("Password doesnt match");
					}
					const user = {
						id: result[0]._id,
						email: result[0].email,
						password: result[0].password,
					};
					return { status: "success", data: result[0] };
				} catch (e) {
					const errorMessage = e.response.data.message;
					throw new Error(
						errorMessage + "&email=" + credentials.email
					);
				}
			},
		}),
		EmailProvider({
			server: {
				host: process.env.EMAIL_SERVER_HOST,
				port: process.env.EMAIL_SERVER_PORT,
				auth: {
					user: process.env.EMAIL_SERVER_USER,
					pass: process.env.EMAIL_SERVER_PASSWORD,
				},
			},
			// server: process.env.EMAIL_SERVER,
			from: process.env.EMAIL_FROM,
		}),
	],
	secret: process.env.NEXTAUTH_SECRET,
	session: {
		jwt: true,
		maxAge: 30 * 24 * 60 * 60,
		updateAge: 24 * 60 * 60,
	},
	jwt: {
		secret: process.env.NEXTAUTH_SECRET,
	},
	adapter: MongoDBAdapter(clientPromise),
	callbacks: {
		async jwt(token, account) {
			if (account?.accessToken) {
				token.accessToken = account.accessToken;
			}
			return token;
		},

		async signIn({ user, account, email, credentials }) {
			return true;
		},

		async session({ session, user, token }) {
			// console.log("fire SESSION Callback");
			return session;
		},

		redirect: async (url, _baseUrl) => {
			if (url === "/signin") {
				return Promise.resolve("/");
			}
			return Promise.resolve("/account/");
		},
	},
	pages: {
		signIn: "/signin",
	},
});
