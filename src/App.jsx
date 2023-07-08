import React, { useEffect, useState } from 'react';
import MillionStockTable from './MillionStockTable';
import ReactStockTable from './ReactStockTable';
import { allFakers } from '@faker-js/faker';
import LagRadar from 'react-lag-radar';

const Market = ({ useReact, faker }) => {
  const [market, setMarket] = useState(() => {
    return Array.from({ length: 1000 }, () => ({
      name: faker.company.name(),
      symbol: faker.finance.currencyCode(),
      price: Math.floor(Math.random() * 1000),
      delta: 0,
    }));
  });

  useEffect(() => {
    setInterval(() => {
      for (const stock of market) {
        const chance = Math.random();
        const delta = Math.floor(Math.random() * 100);
        if (chance < 0.1) {
          stock.price -= delta;
          stock.delta = -delta;
        } else if (chance > 0.9) {
          stock.price += delta;
          stock.delta = delta;
        }
      }

      market.sort((a, b) => b.price - a.price);
      setMarket([...market]);
    }, 1000);
  }, []);
  return useReact ? (
    <ReactStockTable data={market} />
  ) : (
    <MillionStockTable data={market} />
  );
};

const App = () => {
  const [useReact, setUseReact] = useState(true);
  return (
    <div className="p-3">
      <LagRadar />
      <button
        className="bg-gray-200 rounded border border-gray-500 py-3 px-6"
        onClick={() => setUseReact(!useReact)}
      >
        Switch
      </button>
      <p>
        Currently Using: <b>{useReact ? 'React' : 'Million.js'}</b>
      </p>
      <div className="flex">
        <Market useReact={useReact} faker={allFakers['en']} />
        <Market useReact={useReact} faker={allFakers['es_MX']} />
        <Market useReact={useReact} faker={allFakers['zh_CN']} />
      </div>
    </div>
  );
};

export default App;
