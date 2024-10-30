import { SignupInput } from "@sharabh/medium-project-common";
import { ChangeEvent, useState } from "react";
import { Link } from "react-router-dom";

function Auth({ type }: { type: "signup" | "signin" }) {
  const [postInputs, setPostInputs] = useState<SignupInput>({
    name: "",
    username: "",
    password: "",
  });

  return (
    <div className="flex h-screen flex-col justify-center">
      {/* {JSON.stringify(postInputs)} */}
      <div className="flex justify-center">
        <div>

        <div className="px-10">
          <div className="text-3xl font-extrabold">Create an account</div>
          <div className="text-slate-500">
            {type === "signin" ? "Don't have an account?" : "Already have an account?"}
            <Link className="pl-2 underline" to={type === "signin" ? "/signup" : "/signin"}>
              {type === "signin" ? "Sign up" : "Login"}
            </Link>
          </div>
        </div>
        <div className="pt-8">
          <LabelledInput
            label="Name"
            placeholder="Enter your name"
            onChange={(e) => {
                setPostInputs({
                    ...postInputs,
                    name: e.target.value,
                });
            }}
            />
          <LabelledInput
            label="Username"
            placeholder="Enter your username"
            onChange={(e) => {
                setPostInputs({
                    ...postInputs,
                    username: e.target.value,
                });
            }}
            />
          <LabelledInput
            label="password"
            type={"password"}
            placeholder="Enter your passsword"
            onChange={(e) => {
                setPostInputs({
                    ...postInputs,
                    password: e.target.value,
                });
            }}
            />
        </div>
        <button type="button" className="mt-8 w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">{type === "signup"? "Sign up" : "Sign in"}</button>

            </div>
      </div>
    </div>
  );
}

export default Auth;

interface labelledInputType {
  label: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}

function LabelledInput({
  label,
  placeholder,
  type,
  onChange,
}: labelledInputType) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-gray-900 text-black font-semibold pt-4">
        {label}
      </label>
      <input
        onChange={onChange}
        type={type || "text"}
        id="first_name"
        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
        placeholder={placeholder}
        required
      />
    </div>
  );
}
