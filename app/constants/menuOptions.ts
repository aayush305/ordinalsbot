interface MenuOption {
  name: string;
  path: string;
}

export const menuOptions: MenuOption[] = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "BRC20", path: "/brc20"},
  { name: "Orders", path: "/orders" },
];
