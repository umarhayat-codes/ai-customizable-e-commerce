export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterSection {
  title: string;
  links: FooterLink[];
}

export interface SocialIcon {
  name: string;
  icon: React.ElementType;
  href: string;
}
