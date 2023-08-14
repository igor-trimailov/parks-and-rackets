import "@/styles/global.css";
import { FC } from "react";
import GlassPane from "@/components/GlassPane";
import Sidebar from "@/components/Sidebar";

interface DashboardRootLayuoutProps {
    children?: React.ReactNode;
}

const DashboardRootLayuout: FC<DashboardRootLayuoutProps> = ({ children }) => {
    return (
        <html lang="en">
            <head />
            <body className="h-screen w-screen candy-mesh p-6">
                <GlassPane className="w-full h-full flex items-center">
                    <Sidebar />
                    {children}
                </GlassPane>
                <div id="modal"></div>
            </body>
        </html>
    );
};

export default DashboardRootLayuout;
