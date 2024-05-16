import { Dashboard } from "@/components/component/dashboard";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-6xl font-bold text-blue-400 mb-32">
        Stock Monitoring Platform
      </h1>
      <Dashboard />
      <br />  
    </main>
  );
}
