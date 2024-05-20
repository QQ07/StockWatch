import { Dashboard } from "@/components/component/dashboard";
import Image from "next/image";
import homeScreen from "@/app/homeScreen.jpg";
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-6xl font-bold text-blue-400 mb-32">
        Stock Monitoring Platform
      </h1>
      <Image
        src={homeScreen}
        alt="Stock growth image"
        width={720}
        height={400}
      />
      <Dashboard />
      <br />
    </main>
  );
}
