import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { Suspense } from "react";
export default function SearchBar({ supabase, onSelectItem }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    if (searchTerm) {
      handleSearch(searchTerm);
    } else {
      setSearchResults([]); // Clear results if input is cleared
    }
  }, [searchTerm]);

  const handleSearch = async (term) => {
    const lowerTerm = term.toLowerCase();

    // Search in folders, topics, and subtopics
    const { data: folders } = await supabase
      .from("folders")
      .select("*")
      .ilike("name", `%${lowerTerm}%`);

    const { data: topics } = await supabase
      .from("topics")
      .select("*")
      .ilike("title", `%${lowerTerm}%`);

    const { data: subtopics } = await supabase
      .from("subtopics") // Assuming you have a subtopics table
      .select("*")
      .ilike("title", `%${lowerTerm}%`);

    setSearchResults([
      { label: "Folders", data: folders },
      { label: "Topics", data: topics },
      { label: "Subtopics", data: subtopics },
    ]);
  };

  return (
    <>
          <Suspense>
      
    <div className="relative w-full">
      <input
        type="text"
        placeholder="Search folders, topics, or subtopics..."
        className="w-full px-6 py-4 rounded-lg text-xl border-2 border-[#c0c4ca] focus:outline-none focus:border-[#5f7d95] placeholder-gray-400"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Search className="absolute right-6 top-1/2 transform -translate-y-1/2 text-[#5f7d95]" size={28} />

      {/* Dropdown with search results */}
      {searchTerm && searchResults.length > 0 && (
        <div className="absolute w-full bg-white shadow-lg rounded-md mt-2 z-50">
          {searchResults.map((group, index) => (
            <div key={index} className="p-2">
              <div className="text-sm font-bold text-gray-700">{group.label}</div>
              {group.data.length === 0 ? (
                <div className="text-sm text-gray-500">No results found</div>
              ) : (
                group.data.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => onSelectItem(item, group.label)}
                  >
                    {item.name || item.title}
                  </div>
                ))
              )}
            </div>
          ))}
        </div>
      )}
    </div>
    </Suspense>

</>
  );
}
