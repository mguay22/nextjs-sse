"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [cryptos, setCryptos] = useState<any[]>([]);

  useEffect(() => {
    const eventSource = new EventSource("api/crypto/assets");
    eventSource.onmessage = ({ data }) => {
      const updatedCryptos = JSON.parse(data).data.sort((a: any, b: any) => {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      });
      setCryptos(updatedCryptos);
    };

    return () => eventSource.close();
  }, []);

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="overflow-x-auto max-h-[75%] overflow-scroll">
        <table className="table table-pin-rows">
          <thead>
            <tr>
              <th>Name</th>
              <th>Change 24h</th>
              <th>Price USD</th>
            </tr>
          </thead>
          <tbody>
            {cryptos.map((crypto) => (
              <tr key={crypto.name}>
                <th>{crypto.name}</th>
                <th>{crypto.changePercent24Hr}</th>
                <th>{crypto.priceUsd}</th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
