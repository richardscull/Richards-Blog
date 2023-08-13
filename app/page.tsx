import CoolAnimeBg from "./components/coolAnimeBg";
import Copyright from "./components/copyright";

export default function Home() {
  return (
    <main className="px-6 mx-auto text-center mb-12 my-12">
      <link rel="icon" href="/favicon.ico" />
      <CoolAnimeBg />
      <Copyright />
    </main>
  );
}
