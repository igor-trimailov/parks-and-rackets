"use client";
import { FC, ChangeEvent } from "react";
import { useImmer } from "use-immer";
import { useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { register, signin } from "@/lib/api";
import Input from "./Input";
import Card from "./Card";
import Button from "./Button";
import { User } from "@prisma/client";

const registerContent = {
    linkUrl: "/signin",
    linkText: "Already have an account?",
    header: "Create a new Account",
    subheader: "Just a few things to get started",
    buttonText: "Register",
};

const signinContent = {
    linkUrl: "/register",
    linkText: "Don't have an account?",
    header: "Welcome back",
    subheader: "Enter your credentials to access your account",
    buttonText: "Sign In",
};

const initial = {
    email: "",
    password: "",
    firstName: "",
    lastName: "",
};

interface AuthFormProps {
    mode: "register" | "signin";
}

const AuthForm: FC<AuthFormProps> = ({ mode }) => {
    const [formState, updateFormState] = useImmer({ ...initial });
    const [_error, setError] = useState("");

    const router = useRouter();

    const handleSubmit = useCallback(
        async (e: ChangeEvent<HTMLFormElement>) => {
            e.preventDefault();

            try {
                if (mode === "register") {
                    await register(formState);
                } else {
                    await signin(formState);
                }

                router.replace("/home");
            } catch (error) {
                setError(`Could not set ${mode}`);
            } finally {
                updateFormState({ ...initial });
            }
        },
        [formState, mode, router, updateFormState],
    );

    const content = mode === "register" ? registerContent : signinContent;

    return (
        <Card>
            <div className="w-full">
                <div className="text-center">
                    <h2 className="text-3xl mb-2">{content.header}</h2>
                    <p className="tex-lg text-black/25">{content.subheader}</p>
                </div>
                <form onSubmit={handleSubmit} className="py-10 w-full">
                    {mode === "register" && (
                        <div className="flex mb-8 justify-between">
                            <div className="pr-2">
                                <div className="text-lg mb-4 ml-2 text-black/50">
                                    First Name
                                </div>
                                <Input
                                    required
                                    placeholder="First Name"
                                    value={formState.firstName}
                                    className="border-solid border-gray border-2 px-6 py-2 text-lg rounded-3xl w-full"
                                    onChange={(
                                        e: ChangeEvent<HTMLInputElement>,
                                    ) =>
                                        updateFormState((draft) => {
                                            draft.firstName = e.target.value;
                                        })
                                    }
                                />
                            </div>
                            <div className="pl-2">
                                <div className="text-lg mb-4 ml-2 text-black/50">
                                    Last Name
                                </div>
                                <Input
                                    required
                                    placeholder="Last Name"
                                    value={formState.lastName}
                                    className="border-solid border-gray border-2 px-6 py-2 text-lg rounded-3xl w-full"
                                    onChange={(
                                        e: ChangeEvent<HTMLInputElement>,
                                    ) =>
                                        updateFormState((draft) => {
                                            draft.lastName = e.target.value;
                                        })
                                    }
                                />
                            </div>
                        </div>
                    )}
                    <div className="mb-8">
                        <div className="text-lg mb-4 ml-2 text-black/50">
                            Email
                        </div>
                        <Input
                            required
                            type="email"
                            placeholder="Email"
                            value={formState.email}
                            className="border-solid border-gray border-2 px-6 py-2 text-lg rounded-3xl w-full"
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                updateFormState((draft) => {
                                    draft.email = e.target.value;
                                })
                            }
                        />
                    </div>
                    <div className="mb-8">
                        <div className="text-lg mb-4 ml-2 text-black/50">
                            Password
                        </div>
                        <Input
                            required
                            value={formState.password}
                            type="password"
                            placeholder="Password"
                            className="border-solid border-gray border-2 px-6 py-2 text-lg rounded-3xl w-full"
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                updateFormState((draft) => {
                                    draft.password = e.target.value;
                                })
                            }
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <div>
                            <span>
                                <Link
                                    prefetch
                                    href={content.linkUrl}
                                    className="text-blue-600 font-bold"
                                >
                                    {content.linkText}
                                </Link>
                            </span>
                        </div>
                        <div>
                            <Button type="submit" intent="secondary">
                                {content.buttonText}
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </Card>
    );
};

export default AuthForm;
