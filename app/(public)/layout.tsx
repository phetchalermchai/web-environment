// import components
import Drawer from "@/components/NavbarDrawer/Drawer";
import Footer from "@/components/Footer/Footer";
import { mainMenu } from "@/config/menuConfig";

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