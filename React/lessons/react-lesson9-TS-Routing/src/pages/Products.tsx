import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";

export const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const params = useMemo(
    () => Object.fromEntries([...searchParams]),
    [searchParams]
  );

  const { name, price, color } = params;

  return (
    <div>
      <h1> Products</h1>

      <p>{name}</p>
      <p>{price}</p>
      <p>{color}</p>

      <input
        type="text"
        value={name}
        onChange={(e) =>
          setSearchParams({
            ...params,
            name: e.target.value,
          })
        }
      />
      <input
        type="text"
        value={color}
        onChange={(e) =>
          setSearchParams({
            ...params,
            color: e.target.value,
          })
        }
      />
      <input
        type="text"
        value={price}
        onChange={(e) =>
          setSearchParams({
            ...params,
            price: e.target.value,
          })
        }
      />
    </div>
  );
};
