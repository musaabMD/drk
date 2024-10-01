import { createClient } from "@/libs/supabase/client";
import { notFound } from "next/navigation";
import Head from "next/head"; // For dynamic meta tags
import { Suspense } from "react";
export default async function FolderPage({ params }) {
  const supabase = createClient();
  const { folderSlug } = params;

  // Fetch the folder data by slug
  const { data: folder, error } = await supabase
    .from("folders")
    .select("*")
    .eq("slug", folderSlug)
    .single();

  if (error || !folder) {
    notFound();
    return null;
  }

  return (
    <>
      <Suspense>
  
      <Head>
        <title>{folder.name} | Medical Resources</title> {/* Dynamic SEO title */}
        <meta name="description" content={`Learn more about ${folder.name}, including resources and topics.`} />
        <meta name="keywords" content={`medical, ${folder.name}, resources, topics`} /> {/* Add any SEO keywords */}
        <meta name="robots" content="index, follow" /> {/* Make sure search engines can index and follow links */}
      </Head>
      <div className="min-h-screen flex flex-col items-center bg-[#FCFCF9]">
        <h1 className="text-3xl font-bold mb-4">{folder.name}</h1>
        <p>Folder Description: {folder.description || "No description available."}</p>
        {/* You can render related topics here */}
      </div>
      </Suspense>

    </>
  );
}
