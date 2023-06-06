"use client";

import { useState } from "react";
import { v4 as uuid } from "uuid";

export default function Home() {
  const [miles, setMiles] = useState([]);

  const total = miles.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.value * 0.45;
  }, 0);

  const addNewMile = () => {
    setMiles([...miles, { id: uuid(), value: 0 }]);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      addNewMile();
    }
  };

  const updateMile = (e, id) => {
    const updatedMiles = miles.map((mile) => {
      if (mile.id === id) {
        return { id, value: +e.target.value };
      }

      return mile;
    });

    setMiles(updatedMiles);
  };

  return (
    <main className="m-5 text-center">
      <button onClick={addNewMile} className="bg-amber-300 p-4 sticky top-0">
        Add new mileage
      </button>
      <section className="my-5">
        {miles.map((mile) => {
          return (
            <article className="my-3" key={mile.id}>
              <label>
                <span className="mr-3">Miles:</span>
                <input
                  type="number"
                  className="border-2 ml-2 p-2 w-12 text-center"
                  onChange={(e) => updateMile(e, mile.id)}
                  autoFocus
                  onKeyUp={handleKeyPress}
                />
                <span className="pl-3 font-black">
                  £{(mile.value * 0.45).toFixed(2)}
                </span>
              </label>
            </article>
          );
        })}
      </section>
      <section className="mb-16">
        <h2>Total cost:</h2>
        <p className="text-xl font-black">£{total.toFixed(2)}</p>
      </section>
      <section className="pt-16 border-t-4	">
        <h3>Note:</h3>
        <p>
          This is based on the <b>1 mile</b> costing <b>45p</b>
        </p>
      </section>
    </main>
  );
}
