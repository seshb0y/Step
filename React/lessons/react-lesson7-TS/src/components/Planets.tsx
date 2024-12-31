import { memo, useMemo, useState } from "react";

const planetsArray = ["Earth", "Venus", "Jupiter", "Mars"];

interface Props {
  someProp: string;
}

const PlanetItem = memo(({planet} : {planet:string}) => {
    console.log(`Rendering planet - ${planet}`)
    return(
        <li>
            <h2>{planet}</h2>
        </li>
    )
})

const Planets: React.FC<Props> = ({ someProp }) => {
  const [planets, setPlanets] = useState<string[]>(planetsArray);
  const [query, setQuery] = useState<string>("");
  const [click, setClick] = useState<number>(0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const filteredPlanets = useMemo(() => {
    console.log("Filtering planets");
    return planets.filter((planet) =>
      planet.toLowerCase().includes(query.toLowerCase())
    );
  }, [query, planets]);

  return (
    <div>
      <button onClick={() => setClick((prev) => prev + 1)}>Click</button>
      <div>Some props: {someProp}</div>
      <input value={query} onChange={handleChange} type="text" />
      <ul>
        {filteredPlanets.map((planet) => (
          <li key={planet}>
            <h2>{planet}</h2>
          </li>
        ))}
      </ul>

      <button
      onClick={() => setPlanets((prev) => [...prev, `Planet ${prev.length+1}`])}>
        Add planet
      </button>
    </div>
  );
};

export default Planets;
