import { useNavigate } from "react-router-dom";

export const Home = () => {
  const navigate = useNavigate();
  const handleOpenAbout = () => {
    navigate("/");
  };
  return (
    <div>
      <h1>Home Page</h1>

      <button onClick={handleOpenAbout}>Open About</button>
    </div>
  );
};
