import React from "react";
import Image from "next/image";
const About = () => {
  return (
    <div className="py-16 light:bg-gray-100 ">
      <title> About | Troydon Fitness </title>
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-10">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-4">
            About Us
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Learn more about our story and mission.
          </p>
        </div>
        <div className="flex flex-col md:flex-row space-y-8 md:space-x-8 items-center">
          <div className="md:w-1/2">
            <Image
              src="/weightlifter.jpg"
              alt="Fitness Image"
              width={600}
              height={350}
            />
          </div>
          <div className="md:w-1/2">
            <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
              Our Story
            </h3>
            <p className="text-gray-800 dark:text-gray-300 leading-relaxed mb-6">
              Troydon Fitness was born out of a shared passion for fitness and a
              collective commitment to helping others achieve their health and
              wellness goals. Our diverse team of certified trainers brings a
              wealth of experience and expertise to guide you on your fitness
              journey.
            </p>
            <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
              Mission
            </h3>
            <p className="text-gray-800 dark:text-gray-300 leading-relaxed mb-6">
              We are dedicated to providing personalized training programs
              designed to optimize muscle building and effective fat loss. Our
              mission is to empower individuals to become the strongest,
              healthiest, and most confident versions of themselves. We believe
              in fostering a supportive community where every person feels
              valued and motivated.
            </p>
            <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
              Our Team
            </h3>
            <p className="text-gray-800 dark:text-gray-300 leading-relaxed mb-6">
              Our team consists of certified fitness trainers who are passionate
              about helping you reach your full potential. Together, we bring a
              diverse range of specialties and training styles to cater to your
              unique needs. We work collaboratively to create a positive and
              inclusive environment that encourages growth and celebrates
              achievements.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
