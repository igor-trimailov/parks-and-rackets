import bcrypt from "bcrypt";
import { jwtVerify, SignJWT } from "jose";
import { db } from "./db";
import { ReadonlyRequestCookies } from "next/dist/server/app-render";
import { RequestCookies } from "next/dist/server/web/spec-extension/cookies";

export const hashPassword = (password: string) => bcrypt.hash(password, 10);

export const comparePasswords = (
    plainTextPassword: string,
    hashedPassword: string,
) => bcrypt.compare(plainTextPassword, hashedPassword);

// this is just example, in prod it's better to use something else i.e.:
// clerk.dev - simple, good
// supertokens.com - a bit more involved, still good
// next-auth.js.org - kind of complex, but good if you want social oauth(facebook, google)
export const createJWT = (user: User) => {
    const iat = Math.floor(Date.now() / 1000);
    const exp = iat + 60 * 60 * 24 * 7;

    return new SignJWT({
        payload: { id: user.id, email: user.email },
    })
        .setProtectedHeader({ alg: "HS256", typ: "JWT" })
        .setExpirationTime(exp)
        .setIssuedAt(iat)
        .setNotBefore(iat)
        .sign(new TextEncoder().encode(process.env.JWT_SECRET));
};

export const validateJWT = async (jwt: string | undefined) => {
    if (!jwt) {
        return false;
    }

    const { payload } = await jwtVerify(
        jwt,
        new TextEncoder().encode(process.env.JWT_SECRET),
    );

    return payload.payload as any;
};

export const getUserFromCookie = async (
    cookies: ReadonlyRequestCookies | RequestCookies,
) => {
    if (!process.env.COOKIE_NAME) return null;
    const jwt = cookies.get(process.env.COOKIE_NAME);
    if (!jwt) return null;
    const { id } = await validateJWT(jwt.value);

    const user = await db.user.findUnique({
        where: {
            id,
        },
    });

    return user;
};
