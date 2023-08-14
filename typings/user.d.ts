interface User {
    id: string;
    createdAt?: Date;
    updatedAt?: Date;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    // projects: Project[];
    // tasks: Task[];
}

interface AuthFormFields {
    email: string;
    password: string;
    firstName?: string;
    lastName?: string;
}
