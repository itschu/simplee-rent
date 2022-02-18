import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "../../../lib/mongodb";

export default NextAuth({
	providers: [
		GithubProvider({
			clientId: process.env.GITHUB_ID,
			clientSecret: process.env.GITHUB_SECRET,
		}),
		GoogleProvider({
			clientId: process.env.GOOGLE_ID,
			clientSecret: process.env.GOOGLE_SECRET,
			authorizationUrl:
				"https://accounts.google.com/o/oauth2/v2/auth?prompt=consent&access_type=offline&response_type=code",
		}),
	],
	secret: process.env.NEXTAUTH_SECRET,
	// database: process.env.DB_URL,
	session: {
		jwt: true,
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
		redirect: async (url, _baseUrl) => {
			if (url === "/signin") {
				return Promise.resolve("/");
			}
			return Promise.resolve("/account/");
		},
	},
	pages: {
		signIn: "signin",
	},
});
