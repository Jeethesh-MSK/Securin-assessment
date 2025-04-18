import React, { useEffect, useState } from "react";
import axios from "axios";
import RecipeDrawer from "./RecipeDrawer";

const RecipeTable = () => {
  const [recipes, setRecipes] = useState([]);
  const [selected, setSelected] = useState(null);
  const [page, setPage] = useState(1);
  const [isSearching, setIsSearching] = useState(false);

  // 🔍 Search State
  const [searchParams, setSearchParams] = useState({
    title: "",
    cuisine: "",
    rating: "",
    calories: "",
    total_time: ""
  });

  const handleChange = (e) => {
    setSearchParams({ ...searchParams, [e.target.name]: e.target.value });
  };

  const fetchRecipes = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/recipes?page=${page}&limit=10`);
      setRecipes(res.data.data);
      setIsSearching(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = async () => {
    try {
      const query = Object.entries(searchParams)
        .filter(([_, value]) => value.trim() !== "")
        .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
        .join("&");

      const res = await axios.get(`http://localhost:5000/api/recipes/search?${query}`);
      setRecipes(res.data.data);
      setIsSearching(true);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, [page]);

  return (
    <div>
      {/* 🔍 Search UI */}
      <div style={{ marginBottom: "20px" }}>
        <input name="title" placeholder="Title" onChange={handleChange} />
        <input name="cuisine" placeholder="Cuisine" onChange={handleChange} />
        <input name="rating" placeholder="Min Rating" onChange={handleChange} />
        <input name="calories" placeholder="Max Calories" onChange={handleChange} />
        <input name="total_time" placeholder="Max Time" onChange={handleChange} />
        <button className="button" onClick={handleSearch}>Search</button>
        {!isSearching && <button className="button" onClick={fetchRecipes}>Reset</button>}
      </div>

      {/* 📋 Recipe Table */}
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Cuisine</th>
            <th>Rating</th>
            <th>Total Time</th>
            <th>Serves</th>
          </tr>
        </thead>
        <tbody>
          {recipes.map((r, i) => (
            <tr key={i} onClick={() => setSelected(r)}>
              <td>{r.title}</td>
              <td>{r.cuisine}</td>
              <td>{r.rating} ★</td>
              <td>{r.total_time} mins</td>
              <td>{r.serves}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 📄 Pagination (only if not searching) */}
      {!isSearching && (
        <div>
          <button className="button" onClick={() => setPage(page - 1)} disabled={page === 1}>Prev</button>
          <span> Page {page} </span>
          <button className="button" onClick={() => setPage(page + 1)}>Next</button>
        </div>
      )}

      {/* 📋 Drawer */}
      {selected && <RecipeDrawer recipe={selected} onClose={() => setSelected(null)} />}
    </div>
  );
};

export default RecipeTable;
