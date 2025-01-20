import { useState, useEffect } from "react";
import { logos } from "../constants/logoPartners";

export default function LogoSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex(
        prevIndex => (prevIndex + 1) % Math.ceil(logos.length / 4)
      );
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const visibleLogos = logos.slice(currentIndex * 4, currentIndex * 4 + 4);

  return (
    <div className="p-8 rounded-lg shadow-lg bg-gradient-to-r from-white to-second_bg">
      <div className="w-full mb-6 lg:w-1/2 lg:mb-10">
        <h2
          id="campañasTop"
          className="mb-2 text-2xl font-medium text-gray-900 sm:text-3xl title-font"
        >
          Trabajamos de la mano con:
        </h2>
        <div className="w-20 h-1 rounded bg-main"></div>
      </div>
      <div className="relative overflow-hidden">
        <div
          className="flex items-center transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${currentIndex}%)` }}
        >
          {visibleLogos.map(logo => (
            <div key={logo.name} className="flex-shrink-0 w-1/4 px-2">
              <div className="relative flex flex-col items-center group">
                <a
                  className="object-cover"
                  href={logo.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    loading="lazy"
                    width={150}
                    height={150}
                    alt={logo.name}
                    src={logo.icon}
                    className="object-cover mx-auto"
                  />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center mt-4">
        {Array.from({ length: Math.ceil(logos.length / 4) }).map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 mx-1 rounded-full ${
              index === currentIndex ? "bg-main" : "bg-gray-300"
            }`}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Ir a la diapositiva ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
