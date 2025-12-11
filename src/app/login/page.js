"use client";
import { ThreeDotAnimation } from "@/components/common/ThreeDotAnimation";
import Toast from "@/components/common/Toaster";
import { useUserStore } from "@/store/userStore";
import { BusFront, Eye, EyeOff, Lock, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showEye, setShowEye] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [toast, setToast] = useState({
    message: "",
    type: "",
  });

  const router = useRouter();

  const { loading, user, error, login } = useUserStore();

  const handleChange = (e) => {
    setData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  useEffect(() => {
    if (data.password.length > 1) {
      setShowEye(true);
    } else {
      setShowEye(false);
    }
  }, [data.password]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await login(data);

    if (res?.success) {
      setToast({ message: "Login Successfully", type: "success" });
      setData({
        email: "",
        password: "",
      });
      router.push("/dashboard");
    } else {
      setToast({
        message: res?.message || "Something went wrong!",
        type: "error",
      });
    }

    setTimeout(() => setToast({ message: "", type: "" }), 3000);
  };

  return (
    <div className="login">
      <div className="flex flex-col items-center mt-5">
        <span>
          <BusFront size={50} className="font-bold" />
        </span>
        <h2 className="font-semibold text-2xl w-60">
          Bus Pass & Transport Management System
        </h2>
      </div>
      <div className="w-full mt-10 px-10 flex items-center justify-center">
        <div className="login-left relative">
          <form
            className="shadow-(--shadow-card) rounded-2xl py-15 px-8 absolute bg-(--color-bg) z-10  -left-100 translate-y-0"
            onSubmit={handleSubmit}
          >
            <h1 className="font-semibold text-2xl text-center">Login</h1>
            <div className="input-box mb-6">
              <label htmlFor="email" className="text-[.9rem]">
                Email Address
              </label>
              <div className="input flex gap-2 border border-[#d4d4d49b] rounded items-center px-2 py-3">
                <Mail className="text-(--color-text-light)" size={15} />
                <input
                  type="email"
                  placeholder="Email address"
                  className="min-w-[300px] border-none outline-none"
                  id="email"
                  onChange={handleChange}
                  value={data.email}
                  required
                />
              </div>
            </div>
            <div className="input-box mb-6">
              <label htmlFor="password" className="text-[.9rem]">
                Password
              </label>
              <div className="input flex gap-2 border border-[#d4d4d49b] rounded items-center px-2 py-3">
                <Lock className="text-(--color-text-light)" size={15} />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="min-w-[300px] border-none outline-none"
                  id="password"
                  onChange={handleChange}
                  value={data.password}
                  required
                />
                {showPassword ? (
                  <EyeOff
                    className={`text-(--color-text-light) cursor-pointer ${
                      showEye ? "inline" : "hidden"
                    } absolute right-10`}
                    onClick={() => setShowPassword((prev) => !prev)}
                    size={15}
                  />
                ) : (
                  <Eye
                    className={`text-(--color-text-light) cursor-pointer ${
                      showEye ? "inline" : "hidden"
                    } absolute right-10`}
                    onClick={() => setShowPassword((prev) => !prev)}
                    size={15}
                  />
                )}
              </div>
            </div>

            <button
              type="submit"
              className="bg-(--color-accent) text-(--color-primary) w-full h-10 font-bold cursor-pointer rounded-lg hover:bg-(--color-accent)/80 text-[1.2rem] flex items-center justify-center"
            >
              {loading ? <ThreeDotAnimation loading /> : "Login"}
            </button>

            <p className="text-center text-[.8rem] mt-3">
              Don't have an account?{"  "}
              <Link href="/register" className="font-semibold hover:underline">
                Register
              </Link>
            </p>
          </form>
        </div>
        <div className="login-right">
          <div className="login-image absolute">
            <Image
              src="/images/Bus1.svg"
              alt="Bus Image"
              width={100}
              height={100}
              className="w-[30vw]"
            />
          </div>
        </div>
      </div>
      {toast.message && <Toast message={toast.message} type={toast.type} />}
    </div>
  );
};

export default Login;
