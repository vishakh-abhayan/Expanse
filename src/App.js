import React, { useState } from "react";

import "./App.css";
import { initialize } from "workbox-google-analytics";

function App() {
  const [name, setName] = useState("");
  const [dt, setDt] = useState("");
  const [dis, setDis] = useState("");
  function Addtransactions(ev) {
    ev.preventDefault(ev);
    const url = process.env.REACT_APP_API_URL;
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
        <form onSubmit={Addtransactions} className="mt-10">
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
        <div className="mt-3 ">
          <div className="flex justify-between py-2 px-2 bg-gradient-to-r from-black to-gray-800 rounded-md">
            <div className="text-left">
              <div className="text-2xl">New Sumsung TV</div>
              <div className="text-md text-slate-200">
                it was time for new tv
              </div>
            </div>
            <div className="text-right">
              <div className="text-green-300">+ ₹50,000</div>
              <div>2022-12-18 15:45</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
