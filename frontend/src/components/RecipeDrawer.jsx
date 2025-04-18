import React from "react";

const RecipeDrawer = ({ recipe, onClose }) => {
  return (
    <div className="drawer">
      <button className="button-close" onClick={onClose}>×</button>
      <h2>{recipe.title}</h2>
      <p><strong>Cuisine:</strong> {recipe.cuisine}</p>
      <p><strong>Description:</strong> {recipe.description}</p>
      <p><strong>Total Time:</strong> {recipe.total_time} mins</p>
      <p style={{ marginLeft: "20px" }}>
        <strong>Prep:</strong> {recipe.prep_time} mins <br />
        <strong>Cook:</strong> {recipe.cook_time} mins
      </p>

      <h4>Nutrition</h4>
      <table>
        <tbody>
          {Object.entries(recipe.nutrients).map(([key, val], i) => (
            <tr key={i}>
              <td>{key.replace("Content", "")}</td>
              <td>{val}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecipeDrawer;
