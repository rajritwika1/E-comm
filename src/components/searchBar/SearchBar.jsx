import { useContext, useState } from "react";
import myContext from "../../context/myContext";
import { useNavigate } from "react-router";
import './SearchBar.css';



const SearchBar = () => {
      const context = useContext(myContext);
    const { getAllProduct } = context

  const [search, setSearch] = useState("");
    const filterSearchData = getAllProduct.filter((obj) => obj.title.toLowerCase().includes(search)).slice(0, 8)

    const navigate = useNavigate();



  return (
    <div className="searchbar-container">
      {/* search input */}
      <div className="searchbar-input-wrapper">
        <input
          type="text"
          placeholder="Search here"
          onChange={(e) => setSearch(e.target.value)}
          className="searchbar-input"
        />
      </div>

      {/* search drop-down */}
      <div className="searchbar-dropdown-wrapper">
        {search && (
          <div className="searchbar-dropdown">
            {filterSearchData.length > 0 ? (
              <>
                {filterSearchData.map((item, index) => (
                  <div key={index} className="searchbar-item"
                    onClick={() => {
                      navigate(`/productinfo/${item.id}`);
                    }}>
                    <div className="searchbar-item-inner">
                      <img src={item.productImageUrl} alt="" />
                      {item.title}
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <div className="flex justify-center">
                <img
                  className="no-result-img"
                  src="https://cdn-icons-png.flaticon.com/128/10437/10437090.png"
                  alt="Not found"
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
