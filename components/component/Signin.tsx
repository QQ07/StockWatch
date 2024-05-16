"use client";

import { Dispatch, SetStateAction, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export function Signin() {
  const router = useRouter();
  const [email, setEmail]: [string, Dispatch<SetStateAction<string>>] =
    useState("");
  const [password, setPassword] = useState("");
  return (
    <div className="h-screen flex justify-center items-center ">
      <div className="flex  flex-col  border-2 p-3 rounded-xl items-center">
        <h1 className="text-2xl font-bold">Sign In</h1>
        <LabelledInput
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          label="Email"
          type={"email"}
          placeholder="rohan@gmail.com"
        />
        <LabelledInput
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          label="Password"
          type={"password"}
          placeholder="123456"
        />
        <button
          onClick={async () => {
            const response = await axios.post(
              "http://localhost:8000/api/login",
              {
                email,
                password,
              }
            );
            localStorage.setItem("token", response.data.token);
            router.push("/");
            console.log(response.data);
          }}
          className="m-3 bg-blue-500 rounded p-1 hover:bg-blue-400 w-fit"
        >
          Signin
        </button>
      </div>
    </div>
  );
}

interface LabelledInputProps {
  label: string;
  placeholder: string;
  type: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function LabelledInput({
  label,
  placeholder,
  type,
  onChange,
}: LabelledInputProps) {
  return (
    <>
      <input
        onChange={onChange}
        className="border p-1 rounded m-2 text-gray-700"
        type={type}
        placeholder={placeholder}
      />
    </>
  );
}
