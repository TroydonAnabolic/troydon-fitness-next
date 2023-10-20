import React from "react";

const TrainingProgram = () => {
  return (
    <div className="py-16 bg-white dark:bg-gray-800">
      <title> Training Programs | Troydon Fitness </title>
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-10 text-center">
          Training Programs
        </h2>

        <div className="max-w-3xl mx-auto">
          <p className="text-gray-600 dark:text-gray-400 mb-8 text-center">
            Achieve your fitness goals with personalized training programs
            tailored to your needs and goals.
          </p>

          <div className="flex flex-col md:flex-row space-y-8 md:space-x-8">
            <div className="md:w-1/2 m-12">
              <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                Strength Building
              </h3>
              <p className="text-gray-800 dark:text-gray-300 leading-relaxed mb-6">
                Our strength-building programs focus on progressive overload and
                compound movements to help you build muscle and increase
                strength.
              </p>
            </div>
            <div className="md:w-1/2 m-12">
              <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                Cardiovascular Health
              </h3>
              <p className="text-gray-800 dark:text-gray-300 leading-relaxed mb-6">
                Improve your cardiovascular fitness with targeted workouts that
                enhance your heart and lung health.
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row space-y-8 md:space-x-8">
            <div className="md:w-1/2 m-12">
              <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                Flexibility and Mobility
              </h3>
              <p className="text-gray-800 dark:text-gray-300 leading-relaxed mb-6">
                Increase your range of motion and reduce the risk of injuries
                with programs designed to enhance flexibility and mobility.
              </p>
            </div>
            {/* <div className="md:w-1/2 m-12">
              <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                Sports Specific Training
              </h3>
              <p className="text-gray-800 dark:text-gray-300 leading-relaxed mb-6">
                Tailored programs to improve performance in your specific sport,
                focusing on skills, strength, and conditioning.
              </p>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainingProgram;
