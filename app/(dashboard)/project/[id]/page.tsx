import TaskCard from "@/components/TaskCard";
import { getUserFromCookie } from "@/lib/auth";
import { db } from "@/lib/db";
import { cookies } from "next/headers";

const getData = async (projectId: string) => {
    const user = await getUserFromCookie(cookies());

    const project = await db.project.findFirst({
        where: {
            id: projectId,
            ownerId: user?.id,
        },
        include: {
            tasks: true,
        },
    });

    return project;
};

export default async function ProjectPage({
    params,
}: {
    params: { id: string };
}) {
    const project = await getData(params.id);

    if (!project) return null;

    return (
        <div className="h-full overflow-y-auto pr-6 w-1/1">
            <TaskCard tasks={project.tasks} title={project.name} />
        </div>
    );
}
