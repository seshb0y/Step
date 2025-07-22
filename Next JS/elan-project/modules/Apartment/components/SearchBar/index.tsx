import ArrowDown from "@/components/Icons/ArrowDown";

const SearchBar = () => {
  return (
    <div className="h-[330px] bg-blue pt-16">
      <div className="mx-auto max-w-screen-xl">
        <div className="flex flex-col">
          <div>
            <div className="flex items-end justify-between px-6">
              <div className="flex items-center">
                <h1 className="text-3xl font-bold text-white">
                  Поиск квартиры
                </h1>
                <div className="ml-7 flex font-bold items-center text-white">
                  на{" "}
                  <span className="ml-2 flex cursor-pointer items-center text-primary">
                    сутки
                    <ArrowDown className={"ml-2"}/>
                  </span>
                </div>
              </div>
              <div>
                <div>Календаря Выбор дат</div>
              </div>
              <div>
                Ваш регион <span>Баку</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
