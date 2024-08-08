interface MenuOption {
  name: string;
  path: string;
}

export const menuOptions: MenuOption[] = [
  { name: "Home", path: "/" },
  { name: "BRC20", path: "/brc20"},
  { name: "Orders", path: "/orders" },
];
