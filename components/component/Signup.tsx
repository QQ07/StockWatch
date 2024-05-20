"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export function Signup() {
  const router = useRouter();
useEffect(()=>{
  axios
    .post("http://localhost:8000/api/user", {
      token: localStorage.getItem("token"),
    })
    .then(function (response) {
      console.log(response.data);
      console.log("going home")
     window.location.href="/"
    })
    .catch(function (error) {
      console.log(error);
    });
});
  const [email, setEmail]: [string, Dispatch<SetStateAction<string>>] =
    useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  return (
    <div className="h-screen flex justify-center items-center ">
      <div className="flex  flex-col  border-2 p-3 rounded-xl items-center">
        <h1 className="text-2xl font-bold">Sign up</h1>
        <LabelledInput
          onChange={(e) => {
            setName(e.target.value);
          }}
          label="Name"
          type={"text"}
          placeholder="Name"
        />
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
          placeholder="password"
        />
        <button
          onClick={async () => {
            const response = await axios.post(
              "http://localhost:8000/api/register",
              {
                name,
                email,
                password,
              }
            );
            console.log(response.data.token);
            window.location.href="/"
            localStorage.setItem("token",response.data.token);
          }}
          className="m-3 bg-blue-500 rounded p-1 hover:bg-blue-400 w-fit"
        >
          Signup
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
