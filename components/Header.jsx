import Link from "next/link";
import { useState, useEffect } from "react";
import { getCategories } from "../services";

const Header = () => {
  const [categories, setcategories] = useState([]);
  useEffect(() => {
    getCategories().then((newCategories) => setcategories(newCategories));
  }, []);
  return (
    <header className="container mx-auto px-10 mb-8">
      <div className="w-full border-blue-400 border-b inline-block py-8">
        <div className="block md:float-left">
          <Link href="/">
            <span className="cursor-pointer font-bold text-4xl text-white">
              Dev Daily
            </span>
          </Link>
        </div>
        <div className="hidden md:float-left md:contents">
          {categories.map((category) => (
            <Link key={category.slug} href={`/category/${category.slug}`}>
              <span className="text-white mt-2 align-middle ml-4 font-semibold cursor-pointer md:float-right">
                {category.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;
