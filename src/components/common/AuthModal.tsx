"use client";
import { useUser } from "@/lib/store/user";
import { useUserType } from "@/lib/store/userType";
import { phoneLogin } from "@/utils/functions/phoneLogin";
import { vendorLogin } from "@/utils/functions/vendorLogin";
import { vendorVerifyOtp } from "@/utils/functions/vendorVerifyOtp";
import { verifyOtp } from "@/utils/functions/verifyOtp";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import axios from "axios";
import Link from "next/link";
import { Modal } from "flowbite-react";
import { useCookies } from "next-client-cookies";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { BeatLoader } from "react-spinners";

const AuthModal = ({
  isOpen,
  onClose,
  setLoggedIn,
}: {
  isOpen: boolean;
  onClose: () => void;
  setLoggedIn: any;
}) => {
  const [phone, setPhone] = useState("");
  const setGlobalUserType = useUserType((state) => state.setUserType);
  const [userType, setUserType] = useState<"customer" | "vendor">("customer"); // ["customer", "seller"
  const [showOtp, setShowOtp] = useState(false);
  const [otp, setOtp] = useState("");
  const [sendingOTPloading, setSendingOTPLoading] = useState(false);
  const cookies = useCookies();
  const router = useRouter();

  return (
    <Modal show={isOpen} onClose={onClose}>
      <Toaster position="bottom-right" />
      <div className="card w-full">
        <div className=" px-2 w-full flex flex-row py-2 border-2 border-red-600 rounded-t-md border-b-0 bg-white  items-center justify-between">
          <h2 className="text-lg font-semibold"></h2>

          <h2
            onClick={onClose}
            className="bg-red-600 md:py-2 md:px-3 px-2 py-1 hover:text-red-600 hover:bg-red-600 text-white border-2 border-red-600  text-sm font-semibold rounded-full cursor-pointer"
          >
            X
          </h2>
        </div>
        <Modal.Body
          className=" h-full flex flex-row border-2 border-red-600 rounded-b-md border-t-0 flex-wrap bg-white items-center justify-center gap-3   py-2 px-1 w-full"
          style={{
            justifyContent: "space-between",
            padding: "20px",
            overflow: "hidden",
            height: "auto",
          }}
        >
          {showOtp ? (
            <div className="flex flex-col pb-10 border border-red-600 rounded-md px-10 py-10 items-center gap-2">
              <Image src={"/assets/logo.jpg"} height={40} width={250} alt="" />
              <label className="text-sm font-semibold">OTP</label>
              <input
                type="number"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="text-md w-full text-red-600 placeholder:text-red-600 py-1 px-2 rounded-xl"
                placeholder="Enter OTP"
              />
              <button
                onClick={async () => {
                  if (userType === "vendor") {
                    // await vendorLogin(phone);
                    const data = await vendorVerifyOtp(phone, otp);
                    if (data) {
                      toast.success("Login Successful");
                      onClose();
                      router.push("/vendor"); // Redirect to vendor dashboard
                    } else {
                      toast.error("Login Failed");
                    }
                  } else {
                    // await phoneLogin(phone);
                    const data = await verifyOtp(phone, otp);
                    if (data) {
                      toast.success("Login Successful");
                      setLoggedIn(true);
                      onClose();
                      router.push("/dashboard"); // Redirect to user dashboard
                    } else {
                      toast.error("Login Failed");
                    }
                  }
                }}
                className="font-semibold text-white hover:text-red-600 hover:bg-white hover:border-red-600 border border-red-600 bg-red-600 rounded-xl text-md py-2 w-full"
              >
                Verify OTP
              </button>
            </div>
          ) : (
            <div
              className=" flex flex-col border border-red-600 rounded-md px-5 py-8 items-start justify-start gap-4 w-full"
              style={{
                background: "black",
                borderRadius: "20px",
                padding: "30px",
              }}
            >
              <div className="w-full flex flex-col items-start gap-2">
                <h1
                  className="font-semibold text-lg text-white"
                  style={{
                    fontSize: "24px",
                    marginBottom: "20px",
                  }}
                >
                  Welcome to Mogli Coins
                </h1>
                <h2 className="font-semibold text-white text-sm">
                  Shopping gets more rewarding!
                </h2>
                <Image
                  src={"/assets/gift-box.png"}
                  alt="gift box"
                  width={200}
                  height={150}
                  style={{
                    marginTop: "20px",
                    marginBottom: "20px",
                  }}
                />
                <p className="text-white text-sm font-medium">
                  Sign Up & avail 20 Mogli Coins now
                </p>
                <div
                  className="border border-yellow-400 rounded-md p-3 w-full"
                  style={{
                    marginTop: "20px",
                    backgroundColor: "#FFE900",
                  }}
                >
                  <span className="font-medium text-sm text-black">
                    <span
                      style={{
                        fontSize: "12px",
                        position: "relative",
                        top: "-2px",
                        marginRight: "4px",
                      }}
                    >
                      ₹
                    </span>
                    1 Mogli Coin = ₹ 1
                  </span>
                  <span className="font-light text-xs text-black">
                    Earn coins on every product you buy
                  </span>
                </div>
              </div>
              <div
                className="bg-white flex flex-col border border-red-600 rounded-md text-black px-4 py-3 items-center justify-center gap-4  "
                style={{
                  borderRadius: "20px",
                  width: "100%",
                  marginTop: "20px",
                  padding: "30px",
                }}
              >
                <div className="flex flex-row items-center gap-4 justify-center mx-auto">
                  <div
                    onClick={() => {
                      setGlobalUserType("customer");
                      setUserType("customer");
                    }}
                    className={` border border-red-600 cursor-pointer px-5 py-2 font-semibold text-sm rounded-lg ${
                      userType === "customer"
                        ? "bg-red-600 text-white"
                        : "bg-white text-red-600 hover:bg-red-600 hover:text-white hover:border-red-600"
                    } `}
                  >
                    Customer
                  </div>
                  <div
                    onClick={() => {
                      setGlobalUserType("vendor");
                      setUserType("vendor");
                    }}
                    className={` border border-red-600 cursor-pointer px-5 py-2 font-semibold text-sm rounded-lg ${
                      userType === "vendor"
                        ? "bg-red-600 text-white"
                        : "bg-white text-red-600 hover:bg-red-600 hover:text-white hover:border-red-600"
                    } `}
                  >
                    Vendor
                  </div>
                </div>
                <div className="flex flex-col items-start gap-2">
                  <label className="text-sm font-semibold">Phone</label>
                  <input
                    type="number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="text-md w-full py-1 px-2 rounded-xl placeholder:text-red-600 text-red-600 font-semibold"
                    placeholder="Enter Phone Number"
                  />
                </div>

                <button
                  onClick={async () => {
                    setSendingOTPLoading(true);

                    if (userType === "vendor") {
                      await vendorLogin(phone);
                    } else {
                      await phoneLogin(phone);
                    }

                    setShowOtp(true);
                    setSendingOTPLoading(false);
                  }}
                  className="font-semibold text-white hover:text-red-600 hover:bg-white hover:border-red-600 border border-red-600 bg-red-600 rounded-xl text-md py-2 w-full"
                >
                  {sendingOTPloading ? (
                    <BeatLoader size={15} color="red" />
                  ) : (
                    "CONTINUE"
                  )}
                </button>

                {/* <button
              onClick={handleLogin}
              className="font-semibold text-white bg-blue-600 rounded-xl text-md py-2 w-full"
            >
              LOGIN WITH GOOGLE
            </button> */}

                <p className="text-xs text-slate-400">
                  Your details are safe with us !
                </p>
                <p className="text-xs text-slate-400 w-1/2">
                  By continuing, you agree to our Terms of Service & Privacy
                  Policy
                </p>
              </div>
            </div>
          )}
        </Modal.Body>
      </div>
    </Modal>
  );
};

export default AuthModal;
