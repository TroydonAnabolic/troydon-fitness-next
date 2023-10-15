import React from "react";
import Image from "next/image";

const ContactUs = () => {
  return (
    <div className="py-16 bg-gray-100 dark:bg-gray-800">
      <title> Contact Us | Troydon Fitness </title>
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 m-12">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-4">
              Contact Us
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Get in touch with us for inquiries and feedback.
            </p>
          </div>
          <div className="md:w-1/2 m-12">
            <Image
              src="/contact-us.png"
              alt="Contact Image"
              width={600}
              height={350}
            />
          </div>
        </div>
        <div className="mt-10">
          <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
            Our Location
          </h3>
          <p className="text-gray-800 dark:text-gray-300 leading-relaxed mb-6">
            Henderson, Auckland
          </p>
          <p className="text-gray-800 dark:text-gray-300 leading-relaxed mb-6">
            Remote
          </p>
          <p className="text-gray-800 dark:text-gray-300 leading-relaxed mb-6">
            Online
          </p>
          <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
            Contact Information
          </h3>
          <p className="text-gray-800 dark:text-gray-300 leading-relaxed mb-6">
            Phone: (022) 431 9560
          </p>
          <p className="text-gray-800 dark:text-gray-300 leading-relaxed mb-6">
            Email: info@troydonfitness.com
          </p>
          <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
            Business Hours
          </h3>
          <p className="text-gray-800 dark:text-gray-300 leading-relaxed mb-6">
            Monday, Wednesday, Thursday: 5:00 PM - 8:00 PM
          </p>
          <p className="text-gray-800 dark:text-gray-300 leading-relaxed mb-6">
            Saturday, Sunday: 11:00 AM - 6:00 PM
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
