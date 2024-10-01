import ButtonAccount from "@/components/ButtonAccount";
import { Suspense } from "react";
export const dynamic = "force-dynamic";

// This is a private page: It's protected by the layout.js component which ensures the user is authenticated.
// It's a server compoment which means you can fetch data (like the user profile) before the page is rendered.
// See https://shipfa.st/docs/tutorials/private-page
export default function Dashboard() {
  return (
    <>
    <Suspense>


  
    <main className="min-h-screen p-8 pb-24">
      {/* Apply inline styles or a custom class */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}> {/* Increase width here */}
        <ButtonAccount />
        <h1 className="text-3xl md:text-4xl font-extrabold">Private Page</h1>
      </section>
    </main>
    </Suspense>
    </>
  );
}

