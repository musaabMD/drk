import { createClient } from "@/libs/supabase/client";
import { notFound } from "next/navigation";
import Head from "next/head"; // For dynamic meta tags
import { Suspense } from "react";
export default async function TopicPage({ params }) {
  const supabase = createClient();
  const { topicSlug } = params;

  // Fetch the topic data by slug
  const { data: topic, error } = await supabase
    .from("topics")
    .select("*")
    .eq("slug", topicSlug)
    .single();

  if (error || !topic) {
    notFound();
    return null;
  }

  return (
    <>
          <Suspense>
   
      <Head>
        <title>{topic.title} | Medical Topics</title> {/* Dynamic SEO title */}
        <meta name="description" content={`Learn more about ${topic.title}.`} />
        <meta name="keywords" content={`medical, ${topic.title}, resources, education`} />
        <meta name="robots" content="index, follow" />
      </Head>
      <div className="min-h-screen flex flex-col items-center bg-[#FCFCF9]">
        <h1 className="text-3xl font-bold mb-4">{topic.title}</h1>
        <p>{topic.description || "No description available for this topic."}</p>
        {/* You can render related subtopics here */}
      </div>
      </Suspense>

</>
  
  );
}
