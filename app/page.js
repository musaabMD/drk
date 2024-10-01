import Link from "next/link";
import ButtonSignin from "@/components/ButtonSignin";
import Header from "@/components/Header";
import Home from "@/components/HeroPage";
import FilterTab from "@/components/Filters";
import { Suspense } from "react";
export default function Page() {
  return (
    <>
          <Suspense>


<Header/>
<Home/>
<FilterTab/>
</Suspense>

    </>
  );
}
