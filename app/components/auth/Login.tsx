import { ShowErrorObject } from "@/app/types";
import { useState } from "react";
import TextInput from "../TextInput";
import { BiLoaderCircle } from "react-icons/bi";
import { useUser } from "@/app/context/user";
import { useGeneralStore } from "@/app/stores/general";

export default function Login() {

  let { setisLoginOpen } = useGeneralStore()

  const contextUser = useUser()

  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string | "">("");
  const [password, setPassword] = useState<string | "">("");
  const [error, setError] = useState<ShowErrorObject | null>(null);

  
  const showError = (type: string) => {
    if (error && Object.entries(error).length > 0 && error?.type == type) {
      return error.message;
    }
    return "";
  };

  const validate = () => {
    setError(null)
    let isError = false

    if (!email) {
        setError({ type: 'email', message: 'An Email is required'})
        isError = true
    } else if (!password) {
        setError({ type: 'password', message: 'A Password is required'})
        isError = true
    }
    return isError
}

const login = async () => {
    let isError = validate()
    if (isError) return
    if (!contextUser) return

    try {
        setLoading(true)
        await contextUser.login(email, password)
        setLoading(false)
        setisLoginOpen(false)
    } catch (error) {
        console.log(error)
        setLoading(false)
        alert(error)
    }
}

  return (
    <>
      <div>
        <h1 className="text-center text-[28px] mb-4 font-bold">Log in</h1>
        <div className="px-6 pb-2">
          <TextInput
            string={email}
            placeholder="Email Address"
            onUpdate={setEmail}
            inputType="text"
            error={showError("email")}
          />
        </div>
        <div className="px-6 pb-2">
          <TextInput
            string={password}
            placeholder="Password"
            onUpdate={setPassword}
            inputType="password"
            error={showError("password")}
          />
        </div>
        <div className="px-8 pb-2 mt-6">
          <button disabled={loading} onClick={() => login()}
          className={`flex items-center justify-center w-full text-[17px] font-semibold text-white py-3 rounded-sm ${(!email || !password)? 'bg-gray-200' : 'bg-[#f02c56]'}`}
          >
            {loading ? <BiLoaderCircle className="animate-spin" color="#fffff" size={25}/> : 'Log in'}
          </button> 
        </div>
      </div>
    </>
  );
}
