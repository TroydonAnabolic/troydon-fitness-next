import React from "react";

const MealPlanning = () => {
  return (
    <div className="py-16 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-10 text-center">
          Meal Planning
        </h2>

        <div className="max-w-3xl mx-auto">
          <p className="text-gray-600 dark:text-gray-400 mb-8 text-center">
            Achieve your fitness goals with personalized meal plans tailored to
            your dietary needs and preferences.
          </p>

          <div className="flex flex-col md:flex-row space-y-8 md:space-x-8">
            <div className="md:w-1/2 m-12">
              <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                Balanced Nutrition
              </h3>
              <p className="text-gray-800 dark:text-gray-300 leading-relaxed mb-6">
                Our meal plans focus on providing a balanced mix of proteins,
                carbohydrates, and healthy fats to support your fitness journey.
              </p>
            </div>
            <div className="md:w-1/2 m-12">
              <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                Customized for You
              </h3>
              <p className="text-gray-800 dark:text-gray-300 leading-relaxed mb-6">
                We take into account your dietary preferences, allergies, and
                specific fitness goals to create a meal plan that suits you
                best.
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row space-y-8 md:space-x-8">
            <div className="md:w-1/2 m-12">
              <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                Delicious Recipes
              </h3>
              <p className="text-gray-800 dark:text-gray-300 leading-relaxed mb-6">
                Enjoy a variety of tasty and nutritious recipes designed to
                support your fitness goals and keep you motivated on your
                journey.
              </p>
            </div>
            <div className="md:w-1/2 m-12">
              <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                Nutritional Guidance
              </h3>
              <p className="text-gray-800 dark:text-gray-300 leading-relaxed mb-6">
                Get expert advice on portion sizes, timing of meals, and
                nutrient-rich food choices to maximize the benefits of your
                fitness program.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MealPlanning;
