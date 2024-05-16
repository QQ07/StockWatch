"use client";
import { useEffect, useState } from "react";

import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/component/Navbar";
import axios from "axios";
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [user, setuser] = useState();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios
      .post("http://localhost:8000/api/user", {
        token: localStorage.getItem("token"),
      })
      .then(function (response) {
        console.log(response.data);
        setuser(response.data.user);
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar user={user} isloading={loading}></Navbar>
        {children}
      </body>
    </html>
  );
}
