export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function isActivePath(href: string, pathname: string) {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname.startsWith(href);
}