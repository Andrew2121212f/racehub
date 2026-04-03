import { redirect } from "next/navigation";

// Главная страница — редирект на лендинг для новичков
export default function Home() {
  redirect("/beginners");
}
