import Topbar from "@/components/admin/Topbar";
import Sidebar from "@/components/common/Sidebar";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { useRouter } from "next/navigation";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Zoroz",
  description: "Zoroz : A Multi-Vendor Ecommerce Application",
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-row items-start">
        <Sidebar />
        <div className=" flex flex-col w-full">
          <Topbar />
          <div className="mt-2">{children}</div>
        </div>
      </div>
    </div>
  );
}
