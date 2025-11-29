import Link from "next/link";

const links = [
  { href: "/", label: "Home" },
  { href: "/playground", label: "Playground" },
  { href: "/today", label: "Today" },
];

export default function NavBar() {
  return (
    <nav className="border-b border-neutral-900 bg-black backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <div className="text-lg font-semibold tracking-tight text-white">
          Math is <span className="underline decoration-pink-500">Punk</span>
        </div>
        <div className="flex items-center gap-6 text-sm text-gray-300">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-pink-400"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
