"use client";
import { FC } from "react";
import Link from "next/link";
import { Settings, User, Grid, Calendar, Icon } from "react-feather";
import { usePathname } from "next/navigation";
import clsx from "clsx";

// this mapping is necessary because we cannot pass an Icon from parent server component to this
// child client component
const icons: Record<string, Icon> = { Settings, User, Grid, Calendar };

type LinkType = {
    label: string;
    icon: string;
    link: string;
};

interface SidebarLinkProps {
    link: LinkType;
}

const SidebarLink: FC<SidebarLinkProps> = ({ link }) => {
    const pathname = usePathname();

    const isActive = pathname === link.link;

    // an interesting bit. This is a client component. There is an interesting limitation as to why we can't just pass the
    // Icon from the Sidebar component.
    // Sidebar component is a server component and it cannot pass functions/components as props because that would have to happen
    // over network Server component => Client component. This won't work as we cannot serialise functions(same for Date objects or
    // anything recursive)
    const Icon = icons[link.icon];

    // active icon will have a stroke to mark it as active as it is an svg
    return (
        <Link
            href={link.link}
            className="w-full flex justify-center items-center"
        >
            <Icon
                size={40}
                className={clsx(
                    "stroke-gray-400 hover:stroke-violet-600 transition duration-200 ease-in-out",
                    isActive && "stroke-violet-600",
                )}
            />
        </Link>
    );
};

export default SidebarLink;
