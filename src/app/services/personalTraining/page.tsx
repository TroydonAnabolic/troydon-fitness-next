import React from "react";

const PersonalTrainingServices = () => {
  return (
    <div className="py-16 bg-gray-100 dark:bg-gray-800">
      <title> Personal Training | Troydon Fitness </title>
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-10 text-center">
          Personal Training Services
        </h2>

        <div className="max-w-3xl mx-auto">
          <p className="text-gray-600 dark:text-gray-400 mb-8 text-center">
            Transform your physique with our specialized personal training
            service, focusing on muscle building and effective fat loss for a
            stronger, leaner you.
          </p>

          <div className="flex flex-col md:flex-row space-y-8 md:space-x-8">
            <div className="md:w-1/2 m-12">
              <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                Essential Fitness (Once a Week)
              </h3>
              <p className="text-gray-800 dark:text-gray-300 leading-relaxed mb-6">
                Ideal for those starting their fitness journey.
              </p>
              <p className="text-gray-800 dark:text-gray-300 leading-relaxed mb-6">
                $65 per session.
              </p>
            </div>
            <div className="md:w-1/2 m-12">
              <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                Balanced Transformation (Three Times a Week)
              </h3>
              <p className="text-gray-800 dark:text-gray-300 leading-relaxed mb-6">
                Comprehensive training for accelerated results.
              </p>
              <p className="text-gray-800 dark:text-gray-300 leading-relaxed mb-6">
                $60 per session.
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row space-y-8 md:space-x-8">
            <div className="md:w-1/2 m-12">
              <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                Total Body Mastery (Five Times a Week)
              </h3>
              <p className="text-gray-800 dark:text-gray-300 leading-relaxed mb-6">
                Intensive, daily sessions for the ultimate transformation.
              </p>
              <p className="text-gray-800 dark:text-gray-300 leading-relaxed mb-6">
                $50 per session.
              </p>
            </div>
            <div className="md:w-1/2 m-12">
              <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                Customized Packages
              </h3>
              <p className="text-gray-800 dark:text-gray-300 leading-relaxed mb-6">
                Tailored programs to suit your specific needs and goals.
              </p>
              <p className="text-gray-800 dark:text-gray-300 leading-relaxed mb-6">
                Contact us for pricing.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalTrainingServices;
