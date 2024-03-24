import Link from "next/link";
import CoolAnimeBg from "./components/coolAnimeBg";
import Copyright from "./components/copyright";

export const revalidate = 86400;

export default function Home() {
  return (
    <main className="px-6 mx-auto mb-12 my-12 max-w-lg">
      <link rel="icon" href="/favicon.ico" />
      <CoolAnimeBg />
      <h1 className="text-2xl text-center mt-12">
        Добро пожаловать на мой веб-сайт! MenheraBirthday
      </h1>
      <p className="text-lg my-4">
        В интернете меня зовут{" "}
        <Link
          href={"https://github.com/richardscull"}
          className="text-amber-300 font-bold"
        >
          Ричард
        </Link>{" "}
        и по ремеслу я программист. snif
        <br />
        <br />
        Вообще за жизнь я занимался разными вещами, но в основном они все
        связаны с компьютерами (дизайн peepoPaint , видео-монтаж clubDance ,
        кодинг rageChatting ). Хотя в последнее время я стал больше
        интересоваться и другими вещами вне монитора. Peace
        <br />
        <br />
        На этом сайте я публикую свои мысли, идеи и прочие вещи, которые могут
        быть интересны другим людям. HutaoPls Сайт не претендует на лучший
        дизайн или самую актуальную информацию, так что не судите строго.
      </p>
    </main>
  );
}
