import { faker } from "@faker-js/faker";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Story from "./Story";
const Stories = () => {
  const [suggestions, setSuggestions] = useState([]);
  useEffect(() => {
    // const suggestions = [...Array(20)].map((_, i) => ({
    //   ...faker.image.avatar(),
    //   id: i,
    // }));
    // console.log(suggestions);
    const users = [];
    for (var i = 0; i < 20; i++) {
      users.push(faker.image.avatar());
    }
    setSuggestions(users);
    console.log(suggestions);
  }, []);

  const { data: session } = useSession();
  return (
    <div className="flex space-x-2 p-6 bg-white mt-8 border-gray-200 border rounded-sm overflow-x-scroll scrollbar-thin scrollbar-thumb-gray-400 ">
      {session && (
        <Story
          img={session?.user.image}
          username={session?.user.username}
        ></Story>
      )}
      {suggestions.map((profile, index) => (
        <Story key={index} img={profile} username="dkjdkh"></Story>
      ))}
    </div>
  );
};

export default Stories;
