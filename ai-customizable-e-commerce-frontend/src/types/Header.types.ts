export interface NavItem {
  label: string;
  href: string;
  hasDropdown?: boolean;
}

export interface HeaderProps {
  // Add props if needed in the future
}
export interface LogoutResponse {
  data: null;
  message: string;
  status: "success" | "error";
}
