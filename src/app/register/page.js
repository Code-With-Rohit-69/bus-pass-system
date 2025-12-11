"use client";
import { ThreeDotAnimation } from "@/components/common/ThreeDotAnimation";
import Toast from "@/components/common/Toaster";
import { useUserStore } from "@/store/userStore.js";
import {
  Bus,
  BusFront,
  Eye,
  EyeOff,
  Lock,
  Mail,
  MapPin,
  Phone,
  User,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showEye, setShowEye] = useState(false);
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
  });
  const [toast, setToast] = useState({ message: "", type: "" });
  const router = useRouter();

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

  const { loading, register } = useUserStore();

  const handleRegister = async (e) => {
    e.preventDefault();

    const res = await register(data);
    if (res?.success) {
      setToast({ message: "Registration Successful!", type: "success" });
      setData({
        name: "",
        email: "",
        password: "",
        phone: "",
        address: "",
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
    <div className="Register pb-20 pt-2">
      <div className="flex flex-col items-center">
        <span>
          <BusFront size={50} className="font-bold" />
        </span>
        <h2 className="font-semibold text-2xl w-60">
          Bus Pass & Transport Management System
        </h2>
      </div>
      <div className="w-full mt-10 px-10 flex items-center justify-center">
        <div className="Register-left relative">
          <form
            onSubmit={handleRegister}
            className="shadow-(--shadow-card) rounded-2xl py-6 px-8 bg-(--color-bg)"
          >
            <h1 className="font-semibold text-2xl text-center">Register</h1>
            <div className="input-box mb-6">
              <label htmlFor="name" className="text-[.9rem]">
                Full Name
              </label>
              <div className="input flex gap-2 border border-[#d4d4d49b] rounded items-center px-2 py-3">
                <User className="text-(--color-text-light)" size={15} />
                <input
                  type="text"
                  placeholder="Full Name"
                  className="min-w-[300px] border-none outline-none"
                  id="name"
                  value={data.name}
                  onChange={handleChange}
                />
              </div>
            </div>
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
                  value={data.email}
                  onChange={handleChange}
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
                  value={data.password}
                  onChange={handleChange}
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

            <div className="input-box mb-6">
              <label htmlFor="phone" className="text-[.9rem]">
                Phone Number
              </label>
              <div className="input flex gap-2 border border-[#d4d4d49b] rounded items-center px-2 py-3">
                <Phone className="text-(--color-text-light)" size={15} />
                <input
                  type="number"
                  placeholder="Phone Number"
                  className="min-w-[300px] border-none outline-none"
                  id="phone"
                  value={data.phone}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="input-box mb-6">
              <label htmlFor="address" className="text-[.9rem]">
                Address
              </label>
              <div className="input flex gap-2 border border-[#d4d4d49b] rounded items-center px-2 py-3">
                <MapPin className="text-(--color-text-light)" size={15} />
                <input
                  type="text"
                  placeholder="Address"
                  className="min-w-[300px] border-none outline-none"
                  id="address"
                  value={data.address}
                  onChange={handleChange}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="bg-(--color-accent) text-(--color-primary) w-full h-10 flex items-center justify-center font-bold cursor-pointer rounded-lg hover:bg-(--color-accent)/80 text-[1.2rem]"
            >
              {loading ? <ThreeDotAnimation loading /> : "Register"}
            </button>

            <p className="text-center text-[.8rem] mt-3">
              Already have an account?{"  "}
              <Link href="/login" className="font-semibold hover:underline">
                Login
              </Link>
            </p>
          </form>
        </div>
        <div className="Register-right">
          <div className="Register-image">
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

export default Register;
