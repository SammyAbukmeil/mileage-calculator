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
        Add new milage
      </button>
      <section className="my-5">
        {miles.map((mile) => {
          return (
            <article className="my-3" key={mile.id}>
              <label>
                Miles:
                <input
                  type="number"
                  className="border-2 ml-2 p-2"
                  onChange={(e) => updateMile(e, mile.id)}
                  autoFocus
                  onKeyUp={handleKeyPress}
                />
              </label>
            </article>
          );
        })}
      </section>
      <section className="mb-16">
        <h2>Total:</h2>
        <p className="text-xl">£{total.toFixed(2)}</p>
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
