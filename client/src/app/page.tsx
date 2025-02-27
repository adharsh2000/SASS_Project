import ThemeSwitcher from "@/components/theme/ThemeSwicher";

export default function Home() {
  return (
    <main className="p-4 bg-secondary">
      <h1 className="text-2xl">Next.js App with Dark Mode</h1>
      <ThemeSwitcher />
    </main>
  );
}
