import { createClient } from "@/libs/supabase/client";
import { notFound } from "next/navigation";
import Head from "next/head"; // For dynamic meta tags
import { Suspense } from "react";
export default async function SubtopicPage({ params }) {
  const supabase = createClient();
  const { subtopicSlug } = params;

  // Fetch the subtopic data by slug
  const { data: subtopic, error } = await supabase
    .from("subtopics")
    .select("*")
    .eq("slug", subtopicSlug)
    .single();

  if (error || !subtopic) {
    notFound();
    return null;
  }

  return (
    <>
          <Suspense>

      <Head>
        <title>{subtopic.title} | Medical Subtopics</title> {/* Dynamic SEO title */}
        <meta name="description" content={`Learn about ${subtopic.title}, including details and resources.`} />
        <meta name="keywords" content={`medical, ${subtopic.title}, education, subtopics`} />
        <meta name="robots" content="index, follow" />
      </Head>
      <div className="min-h-screen flex flex-col items-center bg-[#FCFCF9]">
        <h1 className="text-3xl font-bold mb-4">{subtopic.title}</h1>
        <p>{subtopic.content || "No content available for this subtopic."}</p>
     
      </div>
      </Suspense>

    </>
  );
}
