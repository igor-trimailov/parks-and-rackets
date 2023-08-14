import Card from "./Card";
// import Image from "next/image";
// import logo from "@/assets/images/logo.png";
import SidebarLink from "./SidebarLink";

const links = [
    { label: "Home", icon: "Grid", link: "/home" },
    {
        label: "Calendar",
        icon: "Calendar",
        link: "/calendar",
    },
    { label: "Profile", icon: "User", link: "/profile" },
    {
        label: "Settings",
        icon: "Settings",
        link: "/settings",
    },
];

const Sidebar = () => {
    return (
        <Card className="h-full w-40 flex items-center justify-between flex-wrap">
            {links.map((link, idx) => (
                <SidebarLink link={link} key={`sidebar-link-${idx}`} />
            ))}
        </Card>
    );
};

export default Sidebar;
