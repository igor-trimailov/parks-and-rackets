import { User } from "@prisma/client";

type FetcherParams<T> = {
    url: string;
    method: "GET" | "POST" | "PUT" | "DELETE";
    body?: T;
    json?: boolean;
};

const fetcher = async <T>({
    url,
    method,
    body,
    json = true,
}: FetcherParams<T>) => {
    const res = await fetch(url, {
        method,
        ...(body && { body: JSON.stringify(body) }),
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    });

    if (!res.ok) {
        throw new Error("API error");
    }

    if (json) {
        const data = await res.json();
        return data.data;
    }
};

export const register = (user: Partial<User>) => {
    console.log("register api");
    return fetcher<Partial<User>>({
        url: "/api/register",
        method: "POST",
        body: user,
    });
};

export const signin = (user: Partial<User>) => {
    console.log("signin api");
    return fetcher<Partial<User>>({
        url: "/api/signin",
        method: "POST",
        body: user,
    });
};

export const createNewProject = async (name: string) => {
    return fetcher({
        url: "/api/project",
        method: "POST",
        body: { name },
        json: true,
    });
};
