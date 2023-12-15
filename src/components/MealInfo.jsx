import React, { useEffect, useState } from "react";

const MealInfo = () => {
  const url = "https://www.themealdb.com/api/json/v1/1/random.php";
  const [mealData, setMealData] = useState(null);
  const [showMealInfo, setShowMealInfo] = useState(false);

  const toggleMealInfo = () => {
    setShowMealInfo(!showMealInfo);
  };

  useEffect(() => {
    fetch(url)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setMealData(data);
      })
      .catch((err) => {
        console.error("Error: ", err);
      });
  }, []);

  if (!mealData) {
    return <div className="hidden"></div>;
  }

  const mealInfo = mealData.meals[0];

  return (
    <div className="flex flex-col justify-center items-center">
      {showMealInfo && (
        <div className="fixed bg-white h-[800px] w-[600px] border-2 border-black">
          <h1>{mealInfo.strInstructions}</h1>
          <button
            onClick={toggleMealInfo}
            className="absolute bottom-0 left-1/2 "
          >
            Close
          </button>
        </div>
      )}
      <div
        className="flex flex-col bg-white p-4 max-w-[240px]  justify-center text-center shadow-lg border-2 border-gray-700 cursor-pointer hover:opacity-30 mx-2"
        onClick={toggleMealInfo}
      >
        <img
          src={mealInfo.strMealThumb}
          alt=""
          style={{ width: "200px", height: "200px" }}
        />
        <h1 className="py-3 text-[18px] ">{mealInfo.strMeal}</h1>
      </div>
      <h1 className="text-center font-semibold">Click for more info</h1>
    </div>
  );
};

export default MealInfo;
