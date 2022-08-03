import { useSession } from "next-auth/react";
import React from "react";
const suggestions = [
  {
    id: "123",
    username: "swetha ogeti",
    userImg:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTJDJisq3ecaPo1prF9NShDFkKC9D11JWLWnW885vVRbCXzaprii6ikn5GQgqxUOenW4A&usqp=CAU",
    worksAt: " encourage your clients to send",
  },

  {
    id: "124",
    username: "Jerry",
    userImg:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDubjQzVfqY6Tquckxqoi5ooS1zBj_2LPJsQ&usqp=CAU",
    worksAt: " generators you can use on ",
  },

  {
    id: "125",
    username: "Jyothika ogeti",
    userImg:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4PwKZcAYo7F-MlD4mZaHIuHtJlrIP6LMm8w&usqp=CAU",
    worksAt: " encourage your clients to send",
  },
  {
    id: "126",
    username: "James smith",
    userImg:
      "https://cdn.quotesgram.com/img/44/97/2115314380-BcogIEmIEAA3O5m.jpg",
    worksAt: "generators you can use on ",
  },
  {
    id: "127",
    username: "Jessica",
    userImg:
      "https://images.unsplash.com/photo-1525134479668-1bee5c7c6845?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fA%3D%3D&w=1000&q=80",
    worksAt: " formatting, blockquotes and a bunch ",
  },
  {
    id: "128",
    username: "christan",
    userImg:
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fA%3D%3D&w=1000&q=80",
    worksAt: " dummy pics to your clients site ",
  },
];
const Suggestion = () => {
  const { data: session } = useSession();
  return (
    <div className="mt-4 ml-10">
      <div className="flex justify-between text-sm mb-5">
        <h3 className="text-sm font-bold text-gray-400">Suggestions for you</h3>
        <button className="text-gray-600 font-semibold">See All</button>
      </div>

      {suggestions.map((suggestion, index) => (
        <div
          key={suggestion.id}
          className="flex items-center justify-center mt-3"
        >
          <img
            src={suggestion.userImg}
            className="h-10 w-10 rounded-full border p-[2px]"
          ></img>

          <div className="flex-1 ml-4">
            <h2 className="font-semibold text-sm">{suggestion.username}</h2>
            <h3 className="text-sm text-gray-400">
              Works at {suggestion.worksAt}
            </h3>
          </div>

          <button className="text-sm text-blue-400">Follow</button>
        </div>
      ))}
    </div>
  );
};

export default Suggestion;
