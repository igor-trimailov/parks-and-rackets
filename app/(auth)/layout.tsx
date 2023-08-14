import "@/styles/global.css";
import { FC } from "react";
import GlassPane from "@/components/GlassPane";

interface AuthRootLayoutProps {
    children?: React.ReactNode;
}

const AuthRootLayout: FC<AuthRootLayoutProps> = ({ children }) => {
    return (
        <html lang="en">
            <head />
            <body className="h-screen w-screen rainbow-mesh p-6">
                <GlassPane className="w-full h-full flex items-center justify-center">
                    {children}
                </GlassPane>
            </body>
        </html>
    );
};

export default AuthRootLayout;
