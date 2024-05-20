"use client"
import { Dashboard } from "@/components/component/dashboard";
import useWindowDimensions from "@/lib/windowDimensions";
import Image from "next/image";
import homeScreen from "@/app/homeScreen.jpg";
export default function Home() {
  const { height, width } = useWindowDimensions();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-6xl font-bold text-blue-400 mb-32">
        Stock Monitoring Platform
      </h1>
      <Image
        src={homeScreen}
        alt="Stock growth image"
        width={width/2}
        height={height/2}
      />
      <Dashboard />
      <br />
    </main>
  );
}
