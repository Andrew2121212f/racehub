import { redirect } from "next/navigation";

// Главная страница — редирект на про-лендинг скачек
export default function Home() {
  redirect("/races");
}
