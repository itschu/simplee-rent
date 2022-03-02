import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "../../../lib/mongodb";
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "../../../config/db";
import usersModel from "../../../models/usersModel";
import { compare } from "bcryptjs";

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
				await dbConnect();
				const result = await usersModel.find({
					email: credentials.email,
				});

				if (!result) {
					throw new Error("No user found with the email");
				} else if (result[0]?.passowrd == undefined) {
					console.log("this is the error - noseenw", result);
					throw new Error(
						"Use the correct sign in option for this account"
					);
				}

				const checkPassword = await compare(
					credentials.passowrd,
					result.passowrd
				);

				if (!checkPassword) {
					throw new Error("Password doesnt match");
				}

				return { email: result.email };
			},
		}),
	],
	secret: process.env.NEXTAUTH_SECRET,
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
		signIn: "/signin",
	},
});
