// import components
import { mainMenu } from "@/config/menuConfig";
import Footer from "@/features/users/components/Footer/Footer";
import Drawer from "@/features/users/components/NavbarDrawer/Drawer";

export default function PublicLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <>
        <Drawer menu={mainMenu} pathname={"/"} />
            {children}
        <Footer />
      </>
    )
  }