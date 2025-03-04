import ThemeSwitcher from "@/components/theme/ThemeSwicher";

export default function Header() {
  return (
    <main className="p-4 bg-secondary w-full sticky">
      <h1 className="text-2xl">Next.js App with Dark Mode</h1>
      <ThemeSwitcher />
    </main>
  );
}
