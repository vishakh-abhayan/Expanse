import React, { useEffect, useState } from "react";

import "./App.css";

function App() {
  const [name, setName] = useState("");
  const [dt, setDt] = useState("");
  const [dis, setDis] = useState("");
  const [transaction, setTransaction] = useState([]);

  useEffect(() => {
    getTransactions().then(setTransaction);
  }, []);

  async function getTransactions() {
    const url = process.env.REACT_APP_API_URL + "/transactions";
    const response = await fetch(url);
    return await response.json();
  }

  function addTransactions(ev) {
    ev.preventDefault(ev);
    const url = process.env.REACT_APP_API_URL + "/transaction";
    const price = name.split(" ")[0];
    fetch(url, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        name: name.substring(price.length + 1),
        price,
        dt,
        dis,
      }),
    }).then((response) => {
      response.json().then((json) => {
        setName("");
        setDt("");
        setDis("");
        console.log("result", json);
      });
    });
  }
  return (
    <div className=" w-full h-screen">
      <div className="max-w-sm mx-auto my-20 h-screen text-white text-center ">
        <h1 className="text-4xl font-bold text-fuchsia-100 ">
          ₹20,000 <span>.00</span>
        </h1>
        <form onSubmit={addTransactions} className="mt-10">
          <div className="flex gap-1 mb-2">
            <input
              className=" rounded-md py-1 px-3 border-solid border-2 border-rose-200 bg-transparent w-full placeholder-amber-100/50"
              placeholder="+200 Iphone 14pro"
              value={name}
              onChange={(ev) => setName(ev.target.value)}
              type="text"
            />
            <input
              className=" rounded-md py-1 px-3 border-solid border-2 border-rose-200 bg-transparent w-full  placeholder-amber-100/50 "
              value={dt}
              onChange={(ev) => setDt(ev.target.value)}
              type="datetime-local"
            />
          </div>
          <div>
            <input
              className=" rounded-md py-1 px-3 border-solid border-2 border-rose-200 bg-transparent w-full placeholder-amber-100/50"
              value={dis}
              onChange={(ev) => setDis(ev.target.value)}
              placeholder="description"
              type="text"
            />
          </div>
          <button
            className="mt-2 p-2 w-full bg-gradient-to-r from-fuchsia-700 to-purple-800 text-white rounded-md"
            type="submit"
          >
            Add new transaction
          </button>
        </form>
        <div className="mt-3  ">
          {transaction.length > 0 &&
            transaction.map((transaction) => (
              <div className="flex justify-between py-2 px-2 bg-gradient-to-r from-black to-gray-800 rounded-md my-2 shadow-md shadow-slate-500 ">
                <div className="text-left">
                  <div className="text-2xl">{transaction.name}</div>
                  <div className="text-md text-slate-200">
                    {transaction.dis}
                  </div>
                </div>
                <div className="text-right">
                  <div
                    className={
                      transaction.price < 0 ? "text-red-500" : "text-green-500"
                    }
                  >
                    ₹{transaction.price}
                  </div>
                  <div>2022-12-18 15:45</div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default App;
