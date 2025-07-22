import Image from "next/image";
import React from "react";

const Card = () => {
  return (
    <div className="relative h-[439px] w-[370px] shadow-lg bg-amber-500">
      <div className="h-2/3">
        <Image src="/home.jpg" alt="home" width={370} height={280} />
      </div>
      <div className="px-5 pt-2">
        <h3 className="text-lg text-blue">Ул. Петра Мстиславца, 24</h3>
        <div className="flex justify-between text-sm">
          <div>
            Спальные места: <span className="text-blue">2</span>
          </div>
          <div>
            Комнат: <span className="text-blue">2</span>
          </div>
        </div>
        <div>
          <div>
            <span className="text-dark font-extralight">Маяк Минск</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
