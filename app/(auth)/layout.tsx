

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <>
      {" "}
      {/* <div className="p-4 dark:text-white dark:bg-gray-900 border-blue-50 border-b">
        Some banner
      </div> */}
      {children}
    </>
  );
}
