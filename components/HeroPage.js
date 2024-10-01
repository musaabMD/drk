// "use client";

// import { useState, useEffect } from "react";
// import { Search, ChevronLeft, Bookmark } from "lucide-react"; // Import Bookmark icon
// import { createClient } from "@/libs/supabase/client";

// // Main Component
// export default function Home() {
//   const supabase = createClient();
//   const [searchTerm, setSearchTerm] = useState("");
//   const [currentList, setCurrentList] = useState([]); // Stores the current list of folders, topics, or subtopics
//   const [breadcrumbs, setBreadcrumbs] = useState([]); // Tracks navigation history
//   const [selectedFolder, setSelectedFolder] = useState(null); // Selected folder (to fetch topics)
//   const [selectedTopic, setSelectedTopic] = useState(null); // Selected topic (to fetch subtopics)
//   const [selectedSubtopic, setSelectedSubtopic] = useState(null); // Selected subtopic (to fetch content)
//   const [contentViews, setContentViews] = useState([]); // Stores content views for the selected subtopic

//   useEffect(() => {
//     // Fetch the top-level folders (parent_id IS NULL)
//     fetchFolders();
//   }, []);

//   const fetchFolders = async () => {
//     const { data, error } = await supabase
//       .from("folders")
//       .select("*")
//       .is("parent_id", null);
//     if (error) {
//       console.error("Error fetching folders:", error);
//     } else {
//       setCurrentList(data);
//     }
//   };

//   const fetchTopics = async (folderId) => {
//     const { data, error } = await supabase
//       .from("topics")
//       .select("*")
//       .eq("folder_id", folderId);
//     if (error) {
//       console.error("Error fetching topics:", error);
//     } else {
//       setCurrentList(data);
//     }
//   };

//   const fetchSubtopics = async (topicId) => {
//     const { data, error } = await supabase
//       .from("subtopics")
//       .select("*")
//       .eq("topic_id", topicId);
//     if (error) {
//       console.error("Error fetching subtopics:", error);
//     } else {
//       setCurrentList(data);
//     }
//   };

//   const fetchSubtopicContent = async (subtopicId) => {
//     const { data, error } = await supabase
//       .from("subtopics")
//       .select("content")
//       .eq("id", subtopicId);
//     if (error) {
//       console.error("Error fetching subtopic content:", error);
//     } else {
//       setContentViews(data);
//     }
//   };

//   const handleFolderClick = (folder) => {
//     setSelectedFolder(folder);
//     setBreadcrumbs((prev) => [...prev, folder.name]);
//     fetchTopics(folder.id);
//   };

//   const handleTopicClick = (topic) => {
//     setSelectedTopic(topic);
//     setBreadcrumbs((prev) => [...prev, topic.title]);
//     fetchSubtopics(topic.id);
//   };

//   const handleSubtopicClick = (subtopic) => {
//     setSelectedSubtopic(subtopic);
//     setBreadcrumbs((prev) => [...prev, subtopic.title]);
//     fetchSubtopicContent(subtopic.id);
//   };

//   const handleBackClick = () => {
//     if (breadcrumbs.length === 1) {
//       // If at the top level, show the folder list
//       fetchFolders();
//       setBreadcrumbs([]);
//       setSelectedFolder(null);
//       setSelectedTopic(null);
//       setSelectedSubtopic(null);
//     } else if (selectedSubtopic) {
//       // If viewing subtopic content, go back to subtopics list
//       fetchSubtopics(selectedTopic.id);
//       setBreadcrumbs((prev) => prev.slice(0, -1));
//       setSelectedSubtopic(null);
//     } else if (selectedTopic) {
//       // If viewing topics, go back to topic list
//       fetchTopics(selectedFolder.id);
//       setBreadcrumbs((prev) => prev.slice(0, -1));
//       setSelectedTopic(null);
//     } else if (selectedFolder) {
//       // If viewing folders, go back to folder list
//       fetchFolders();
//       setBreadcrumbs([]);
//       setSelectedFolder(null);
//     }
//   };

//   const handleSearch = (e) => {
//     const searchTerm = e.target.value.toLowerCase();
//     setSearchTerm(searchTerm);

//     if (searchTerm === "") {
//       // If search term is cleared, reset list to original folders or topics
//       if (!selectedFolder) fetchFolders();
//       else if (selectedFolder && !selectedTopic) fetchTopics(selectedFolder.id);
//       else if (selectedTopic) fetchSubtopics(selectedTopic.id);
//     } else {
//       // Filter current list based on search term
//       const filteredList = currentList.filter((item) =>
//         (selectedTopic ? item.title : selectedFolder ? item.title : item.name).toLowerCase().includes(searchTerm)
//       );
//       setCurrentList(filteredList);
//     }
//   };

//   return (
//     <div className="min-h-screen flex flex-col items-center p-6 bg-[#FCFCF9]">
//       <div className="w-full max-w-6xl p-10">
//         <div className="flex flex-col items-center mb-10">
//           <h1 className="text-6xl text-center font-extrabold text-[#14343B] leading-tight">DrKard</h1>
//           <p className="text-2xl text-center text-[#64645E] mt-4 font-light">
//             Your Ultimate Medical Study Companion
//           </p>
//         </div>

//         {/* Search Box */}
//         <div className="relative mb-10 w-full">
//           <input
//             type="text"
//             placeholder="Search folders, topics, or content..."
//             className="w-full px-6 py-4 rounded-lg text-xl border-2 border-[#c0c4ca] focus:outline-none focus:border-[#5f7d95] placeholder-gray-400"
//             value={searchTerm}
//             onChange={handleSearch}
//           />
//           <Search className="absolute right-6 top-1/2 transform -translate-y-1/2 text-[#5f7d95]" size={28} />
//         </div>

//         {/* Breadcrumbs */}
//         {breadcrumbs.length > 0 && (
//           <button
//             className="flex items-center text-[#ffffff] mb-5 bg-[#14343B] hover:bg-[#0c252d] px-5 py-3 rounded-md transition-colors text-2xl"
//             onClick={handleBackClick}
//           >
//             <ChevronLeft size={24} className="mr-3" />
//             Back  
//           </button>
//         )}

//         {/* One Line Per List Item */}
//         <div className="space-y-4"> {/* Added space-y-4 to space out items */}
//           {/* Display folders, topics, or subtopics */}
//           {!selectedSubtopic && currentList.map((item, index) => (
//             <div
//               key={index}
//               className="flex items-center justify-between p-6 border-2 border-[#c0c4ca] rounded-xl shadow-md bg-[#F3F3EE] hover:bg-[#E2E2DD] hover:border-[#a0a4a6] transition-all cursor-pointer w-full"
//               onClick={() => (selectedTopic ? handleSubtopicClick(item) : selectedFolder ? handleTopicClick(item) : handleFolderClick(item))}
//             >
//               <div className="flex-grow">
//                 <h2 className="font-semibold text-xl text-[#14343B]">
//                   {selectedTopic ? item.title : selectedFolder ? item.title : item.name}
//                 </h2>
//                 <p className="text-[#64645E]">23 topics</p> {/* Adjust this text as per dynamic data */}
//               </div>
//               <Bookmark className="text-[#14343B]" size={24} /> {/* Bookmark icon */}
//             </div>
//           ))}

//           {/* Display content views if a subtopic is selected */}
//           {selectedSubtopic && contentViews.map((view, index) => (
//             <div key={index} className="p-8 border-2 border-[#c0c4ca] rounded-xl shadow-md bg-[#F3F3EE]">
//               <h2 className="font-semibold text-2xl text-[#14343B]">Subtopic Content</h2>
//               <pre className="text-lg text-[#64645E] mt-4">{JSON.stringify(view.content, null, 2)}</pre>
//             </div>
//           ))}

//           {/* No results */}
//           {currentList.length === 0 && (
//             <div className="text-center text-[#64645E] text-xl">No results found</div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import React, { useState, useEffect } from "react";
import { ChevronLeft, Bookmark } from "lucide-react";
import { createClient } from "@/libs/supabase/client";
import FilterTab from "../components/Filters";

export default function HeroPage() {
  const supabase = createClient();

  const [currentList, setCurrentList] = useState([]);
  const [breadcrumbs, setBreadcrumbs] = useState([]);
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [selectedSubtopic, setSelectedSubtopic] = useState(null);
  const [contentViews, setContentViews] = useState([]);
  const [bookmarkedItems, setBookmarkedItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchFolders();
  }, []);

  const fetchFolders = async () => {
    const { data, error } = await supabase
      .from("folders")
      .select("*")
      .is("parent_id", null);

    if (error) {
      console.error("Error fetching folders:", error);
    } else {
      setCurrentList(data);
    }
  };

  const fetchTopics = async (folderId) => {
    const { data, error } = await supabase
      .from("topics")
      .select("*")
      .eq("folder_id", folderId);

    if (error) {
      console.error("Error fetching topics:", error);
    } else {
      setCurrentList(data);
    }
  };

  const fetchSubtopics = async (topicId) => {
    const { data, error } = await supabase
      .from("subtopics")
      .select("*")
      .eq("topic_id", topicId);

    if (error) {
      console.error("Error fetching subtopics:", error);
    } else {
      setCurrentList(data);
    }
  };

  const fetchSubtopicContent = async (subtopicId) => {
    const { data, error } = await supabase
      .from("subtopics")
      .select("content")
      .eq("id", subtopicId);

    if (error) {
      console.error("Error fetching subtopic content:", error);
    } else {
      setContentViews(data);
    }
  };

  const handleFolderClick = (folder) => {
    setSelectedFolder(folder);
    setBreadcrumbs((prev) => [...prev, folder.name]);
    fetchTopics(folder.id);
  };

  const handleTopicClick = (topic) => {
    setSelectedTopic(topic);
    setBreadcrumbs((prev) => [...prev, topic.title]);
    fetchSubtopics(topic.id);
  };

  const handleSubtopicClick = (subtopic) => {
    setSelectedSubtopic(subtopic);
    setBreadcrumbs((prev) => [...prev, subtopic.title]);
    fetchSubtopicContent(subtopic.id);
  };

  const handleBookmarkClick = (item) => {
    if (bookmarkedItems.includes(item.id)) {
      setBookmarkedItems(bookmarkedItems.filter((id) => id !== item.id));
    } else {
      setBookmarkedItems([...bookmarkedItems, item.id]);
    }
  };

  const handleBackClick = () => {
    if (breadcrumbs.length === 1) {
      fetchFolders();
      setBreadcrumbs([]);
      setSelectedFolder(null);
      setSelectedTopic(null);
      setSelectedSubtopic(null);
    } else if (selectedSubtopic) {
      fetchSubtopics(selectedTopic.id);
      setBreadcrumbs((prev) => prev.slice(0, -1));
      setSelectedSubtopic(null);
    } else if (selectedTopic) {
      fetchTopics(selectedFolder.id);
      setBreadcrumbs((prev) => prev.slice(0, -1));
      setSelectedTopic(null);
    } else if (selectedFolder) {
      fetchFolders();
      setBreadcrumbs([]);
      setSelectedFolder(null);
    }
  };

  const getCurrentTitle = () => {
    if (selectedSubtopic) return selectedSubtopic.title;
    if (selectedTopic) return selectedTopic.title;
    if (selectedFolder) return selectedFolder.name;
    return "Folders";
  };

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    if (term === "") {
      if (!selectedFolder) fetchFolders();
      else if (selectedFolder && !selectedTopic) fetchTopics(selectedFolder.id);
      else if (selectedTopic) fetchSubtopics(selectedTopic.id);
    } else {
      const filteredList = currentList.filter((item) => {
        const title = selectedTopic ? item.title : selectedFolder ? item.title : item.name;
        return title.toLowerCase().includes(term);
      });
      setCurrentList(filteredList);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FCFCF9]">
      <div className="w-full max-w-[1700px] px-4 py-8 mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-4xl md:text-5xl text-center font-extrabold text-[#14343B] leading-tight">DrKard</h1>
          <p className="text-lg md:text-xl text-center text-[#64645E] mt-2">Your Ultimate Medical Study Companion</p>
        </div>

        {/* Search Bar */}
        <div className="relative mb-6">
          <input
            type="text"
            placeholder="Search folders, topics, or content..."
            className="w-full px-4 py-3 rounded-lg text-lg border-2 border-[#c0c4ca] focus:outline-none focus:border-[#5f7d95] placeholder-gray-400"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>

        {/* Current List Title and Back Button */}
        <div className="mb-4">
          <div className="p-4 border-2 border-[#c0c4ca] rounded-lg shadow-md bg-[#F3F3EE] flex items-center justify-between">
            <div className="flex items-center">
              {breadcrumbs.length > 0 && (
                <button
                  className="flex items-center text-white bg-[#14343B] hover:bg-[#0c252d] px-3 py-1 rounded-md transition-colors text-sm mr-3"
                  onClick={handleBackClick}
                >
                  <ChevronLeft size={16} className="mr-1" />
                  Back
                </button>
              )}
              <h2 className="text-2xl md:text-3xl font-bold text-[#64645E]">{getCurrentTitle()}</h2>
            </div>
          </div>
        </div>

        {/* FilterTab */}
        <FilterTab />

        {/* Display List or Subtopic Content */}
        <div className="space-y-4 mt-6">
          {selectedSubtopic && contentViews.length > 0 ? (
            contentViews.map((view, index) => (
              <div key={index} className="p-4 border border-[#c0c4ca] rounded-lg shadow-md bg-white">
                <h2 className="font-semibold text-lg text-[#14343B] mb-2">Subtopic Content</h2>
                <pre className="text-sm text-[#64645E] whitespace-pre-wrap">
                  {JSON.stringify(view.content, null, 2)}
                </pre>
              </div>
            ))
          ) : (
            currentList.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 border border-[#c0c4ca] rounded-lg shadow-sm bg-white hover:bg-[#f8f8f6] transition-colors cursor-pointer"
                onClick={() =>
                  selectedTopic
                    ? handleSubtopicClick(item)
                    : selectedFolder
                    ? handleTopicClick(item)
                    : handleFolderClick(item)
                }
              >
                <div className="flex-grow">
                  <h2 className="font-normal text-xl md:text-2xl text-[#14343B]">
                    {selectedTopic ? item.title : selectedFolder ? item.title : item.name}
                  </h2>
                </div>
                <Bookmark
                  className={`text-[#14343B] ${bookmarkedItems.includes(item.id) ? "fill-current" : ""}`}
                  size={20}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleBookmarkClick(item);
                  }}
                />
              </div>
            ))
          )}

          {/* No results found message */}
          {currentList.length === 0 && searchTerm && (
            <div className="text-center text-[#64645E] text-lg">No results found</div>
          )}
        </div>
      </div>
    </div>
  );
}
