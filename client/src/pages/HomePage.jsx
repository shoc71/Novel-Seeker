import CategoryItem from "../components/CategoryItem";

import theArtOfWar from "../assets/images/the-art-of-war.jpg";
import talentOverrated from "../assets/images/talent-is-overrated.jpg";
import donQuixote from "../assets/images/don_quixote.jpg";
import animalFarm from "../assets/images/animal-farm.jpg";
import pridePrejudice from "../assets/images/pride-n-prejudice.jpg";
import tintin from "../assets/images/tintin.jpg";
import calvinHobbes from "../assets/images/Calvin_and_Hobbes_Original.png";

const categories = [
  {
    href: "/children-books",
    name: "Children Books",
    imageUrl: calvinHobbes,
  },
  {
    href: "/history",
    name: "History",
    imageUrl: theArtOfWar,
  },
  {
    href: "/self-help",
    name: "Self Help",
    imageUrl: talentOverrated,
  },
  {
    href: "/novel",
    name: "Novel",
    imageUrl: donQuixote,
  },
  {
    href: "/fable",
    name: "Fable",
    imageUrl: animalFarm,
  },
  {
    href: "/romance",
    name: "Romance",
    imageUrl: pridePrejudice,
  },
  {
    href: "/comics",
    name: "Comic Books",
    imageUrl: tintin,
  },
];

const HomePage = () => {
  return (
    <div className="relative min-h-screen text-white overflow-hidden">
      {/* top part */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-center text-5xl sm:text-6xl font-bold text-emerald-400 mb-4">
          Explore Our Categories
        </h1>
        <p className="text-center text-xl text-gray-300 mb-12">
          Discover the Latest Trends and Old Classics in Modern Literature
        </p>

        {/* pictures of genres */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((category) => (
            <CategoryItem category={category} key={category.name} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
