"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Preloader from "@/components/common/Preloader";

const MePage = () => {
  const { replace } = useRouter();

  useEffect(() => {
    replace("/me/dashboard");
  }, [replace]);

  return <Preloader />;
};

export default MePage;
