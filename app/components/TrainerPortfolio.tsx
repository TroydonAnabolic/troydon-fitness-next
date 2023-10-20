import React from "react";
import Image from "next/image";

interface TrainerPortfolioProps {
  name: string;
  image: string;
  experience: string;
  trainingExperience: string;
  about: string;
  qualifications: string;
}

const TrainerPortfolio: React.FC<TrainerPortfolioProps> = ({
  name,
  image,
  experience,
  trainingExperience,
  about,
  qualifications,
}) => {
  return (
    <div className="mb-8 bg-gray-100 dark:bg-gray-700 p-6 rounded-lg">
      <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
        {name}
      </h3>

      <Image
        src={image}
        alt="Troydon Face Pic"
        width={600}
        height={350}
        className="w-32 h-32 rounded-full mb-2"
      />
      <p className="text-gray-800 dark:text-gray-300 mb-2">{experience}</p>
      <p className="text-gray-800 dark:text-gray-300 mb-2">
        {trainingExperience}
      </p>
      <p className="text-gray-800 dark:text-gray-300 mb-6">{about}</p>
      <p className="text-gray-800 dark:text-gray-300">{qualifications}</p>
    </div>
  );
};

export default TrainerPortfolio;
