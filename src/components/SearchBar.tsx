import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { SearchProducts } from "@/components/SearchProducts";
import Logo from "@/assets/logo.png";

export const SearchBar = ({classname}: {classname?: string}) => {
  const [showSearch, setShowSearch] = useState(false);

  return showSearch ? (
    <div className="fixed top-0 left-0 right-0 z-50 bg-white px-4 py-2 shadow-md border-b">
      <div className="flex justify-between">
        <img src={Logo} alt="logo" className="h-12 w-12 pointer-events-none" />
        <div className="mx-24 w-full">
          <SearchProducts />
        </div>
        <Button onClick={() => setShowSearch(false)} variant="ghost">
          Cancel
        </Button>
      </div>
    </div>
  ) : (
    <Button size="icon" variant="ghost" onClick={() => setShowSearch(true)} className={classname}>
      <Search />
    </Button>
  );
};
