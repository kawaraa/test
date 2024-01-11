import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex"></div>

      <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
        <h2 className="mb-3 text-2xl font-semibold">Home page</h2>
        <p>
          This is a public page, If you want to see the private page, please click{" "}
          <Link href="/admin" className="text-pc font-semibold">
            here
          </Link>
        </p>
      </div>
    </main>
  );
}
