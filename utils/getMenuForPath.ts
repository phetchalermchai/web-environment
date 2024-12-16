import { mainMenu , adminMenu } from "@/config/menuConfig";

export const getMenuForPath = (pathname: string) => {
  if (pathname.startsWith("/admin")) {
    return adminMenu;
  }
  return mainMenu;
};
