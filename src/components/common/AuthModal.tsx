"use client";
import { useUser } from "@/lib/store/user";
import { login } from "@/utils/functions/login";
import { phoneLogin } from "@/utils/functions/phoneLogin";
import { verifyOtp } from "@/utils/functions/verifyOtp";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import axios from "axios";
import { Modal } from "flowbite-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const AuthModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [phone, setPhone] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const [otp, setOtp] = useState("");
  const handleLogin = async () => {
    try {
      const data = await login();
      setTimeout(() => {
        toast.success("Login Successful");
      }, 5000);
      onClose();
    } catch {
      toast.error("Login Failed");
    }
  };
  const clientID =
    process.env.GOOGLE_CLIENT_ID ||
    "809204834816-f3stqre8cdau2vhaq8rjgnb047pm2q64.apps.googleusercontent.com";
  const handleGoogleLogin = async (credentialResponse: any) => {
    try {
      // Send the received credential to your server for verification
      const response = await axios.post("https://zoroz-ecommerce-backend.onrender.com/auth/google", {
        credential: credentialResponse.tokenId,
        client_id:
          "809204834816-f3stqre8cdau2vhaq8rjgnb047pm2q64.apps.googleusercontent.com",
      });
      console.log(response);
      // Handle the response from the server
      if (response.data.success) {
        // If login is successful, perform necessary actions like setting user info, redirecting, etc.
        // For example:
        console.log("Login successful");
        onClose(); // Close the modal or perform any other action
      } else {
        // If login fails, display an error message or handle it accordingly
        console.error("Login failed:", response.data.msg);
      }
    } catch (error) {
      // Handle any errors that occur during the login process
      console.error("Error during Google login:", error);
    }
  };
  return (
    <Modal show={isOpen} onClose={onClose}>
      <Toaster position="bottom-right" />
      <div className="card">
        <div className="mt-2 px-2 w-full flex flex-row mb-2 items-center justify-between">
          <h2 className="text-lg font-semibold"></h2>

          <h2
            onClick={onClose}
            className="bg-white md:py-2 md:px-3 px-2 py-1 hover:bg-white hover:text-black border-2 border-black  text-black text-sm font-semibold rounded-full cursor-pointer"
          >
            X
          </h2>
        </div>
        <Modal.Body className=" h-full flex flex-row flex-wrap items-center justify-center gap-3  my-1 py-2 px-1 w-full">
          <Image src={"/assets/logo.jpg"} height={40} width={250} alt="" />
          {showOtp ? (
            <div className="flex flex-col items-start gap-2">
              <label className="text-sm font-semibold">OTP</label>
              <input
                type="number"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="text-md w-full py-1 px-2 rounded-xl"
                placeholder="Enter OTP"
              />
              <button
                onClick={async () => {
                  const data = await verifyOtp(phone, otp);
                  if (data) {
                    toast.success("Login Successful");
                    onClose();
                  } else {
                    toast.error("Login Failed");
                  }
                }}
                className="font-semibold text-white bg-red-600 rounded-xl text-md py-2 w-full">
                  Verify OTP
                </button>
            </div>
          ) : (
            <div className="  bg-white flex flex-col text-black px-4 py-3 items-center justify-center gap-4 rounded-xl border">
              <h1 className="font-semibold text-lg">Login or Sign Up</h1>
              <div className="flex flex-col items-start gap-2">
                <label className="text-sm font-semibold">Phone</label>
                <input
                  type="number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="text-md w-full py-1 px-2 rounded-xl"
                  placeholder="Enter Phone Number"
                />
              </div>

              <button
                onClick={async () => {
                  await phoneLogin(phone);
                  setShowOtp(true);
                }}
                className="font-semibold text-white bg-red-600 rounded-xl text-md py-2 w-full"
              >
                CONTINUE
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
          )}
        </Modal.Body>
      </div>
    </Modal>
  );
};

export default AuthModal;
