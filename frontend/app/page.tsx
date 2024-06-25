import Navbar from "@/components/header/Navbar";
import ParentLayout from "@/components/layouts/ParentLayout";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Navbar />
      <ParentLayout />
    </div>
  );
}
