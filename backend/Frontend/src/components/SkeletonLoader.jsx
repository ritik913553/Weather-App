import { FaSun, FaCloudSunRain } from "react-icons/fa"; // You can import the icons you're using in your original code

const SkeletonLoader = () => {
  return (
    <div className="pt-3 bg-[#002843] h-auto w-full pb-10 text-white ">
      {/* Skeleton for Current Weather */}
      <div className="relative h-36 mt-5 w-full px-5 bg-transparent mix-blend-difference p-4">
        {/* Background Image Placeholder */}
        <div className="absolute top-0 left-0 w-full h-full bg-gray-400 animate-pulse"></div>
      </div>

      {/* Skeleton for Hourly Forecast */}
      <div className="mt-5 px-4">
        <h1 className=" h-6 w-32 mb-4">Hoourly Foercast</h1>
        <div className="scrollbar rounded-md h-26 animate-pulse bg-gray-700 overflow-auto flex gap-6 text-white py-3 px-8 justify-between flex-nowrap">
          {[...Array(6)].map((_, index) => (
            <div
              key={index}
              className="text-sm flex flex-col justify-between shrink-0 bg-gray-600 h-20 w-14 rounded-md"
            ></div>
          ))}
        </div>
      </div>

      {/* Skeleton for 5-Day Forecast */}
      <div className="mt-5 px-4">
        <h1 className=" h-6 w-32 mb-4">5 Day Foercast</h1>
        <div className="flex flex-col gap-2">
          {[...Array(5)].map((_, index) => (
            <div
              key={index}
              className="animate-pulse bg-gray-700 rounded-md text-sm  h-12"
            ></div>
          ))}
        </div>
      </div>

      {/* Skeleton for Current Conditions */}
      <div className="mt-8 px-4">
        <h1 className="h-6 w-32 mb-4">current condition</h1>
        <div className="mt-2 flex flex-wrap gap-4">
          {[...Array(4)].map((_, index) => (
            <div
              key={index}
              className="p-3 animate-pulse rounded-lg  text-white shrink-0 w-[calc(50%-0.5rem)] bg-gray-700 h-24"
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkeletonLoader;
