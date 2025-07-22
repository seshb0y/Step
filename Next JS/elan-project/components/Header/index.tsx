import Nav from "../Nav";

const Header = () => {
  return (
    <div className="h-20 bg-dark">
      <div className="mx-auto flex max-w-screen-xl h-full items-center justify-between">
        <div>Logo</div>
        <Nav/>

        <div>
          <div></div>
          <div>
            <div></div>
            <div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        </div>
        <button>
          <div></div>Добавить объявление
        </button>
      </div>
    </div>
  );
};

export default Header;
