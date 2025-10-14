'use client';

import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";
import { useEffect, useState } from "react";

type ProductType = {
  name: string;
  image: string;
  model: string;
  treadwear: number;
  traction: string;
  temperature: string;
  pattern: string;
  loadIndex: string;
  speedRating: string;
  noise: number;
  rollingResistance: string;
  wetGrip: string;
  cars: string[];
};

export default function Products() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [search, setSearch] = useState('');


  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch('/api/products');
        const data = await res.json();
        setProducts(data);
        console.log('Produtos', data);
      } catch (error) {
        console.log("Error:", error);
      }
    }
    fetchProducts();
  }, []);


  const filter = products.filter(products => {
    return products.name.toLowerCase().includes(search.toLowerCase()) || products.model.toLowerCase().includes(search.toLowerCase())
  })

  return (
    <div className="w-full flex flex-col items-center h-full px-4">

      <div className="w-full max-w-md mb-6">
        <label htmlFor="search" className="block text-sm font-medium text-gray-900">
          Pesquisa
        </label>
        <div className="mt-2 relative">

          <input
            id="search"
            name="search"
            type="search"
            placeholder="Pesquisar produtos"
            className="block w-full rounded-md bg-white py-2 pl-10 pr-3 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
            onChange={(e) => setSearch(e.target.value)}
          />
          <MagnifyingGlassIcon
            aria-hidden="true"
            className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none"
          />
        </div>
      </div>

      <div className="w-3/4 max-w-6xl grid grid-cols-1 sm:grid-cols-1 gap-6 ">
        {filter.map((product, index) => (
          <div
            key={index}
            className="flex flex-col sm:flex-row border rounded-2xl p-4 gap-6 bg-white"
            style={{ boxShadow: "8px 8px 20px rgba(0,0,0,0.25)" }}
          >
         
            <div className="flex flex-col items-center w-full sm:w-1/3">
              <img
                src={product.image}
                alt={product.name}
                className="w-40 h-40 object-contain mb-2"
              />
              <span className="font-semibold text-center">{product.model}</span>
            </div>
            <div className=" sm:block border-2 border-black mx-2" />
            
            <div className="flex-1 flex flex-col gap-4">

           
              <h2 className="w-full text-xl font-bold">{product.name}</h2>

              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 items-start" >
                <div>
                  <p className="text-sm text-gray-400">Durabilidade</p>
                  <p className="font-semibold">{product.treadwear}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Tração</p>
                  <p className="font-semibold">{product.traction}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Temperatura</p>
                  <p className="font-semibold">{product.temperature}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Índice de velocidade</p>
                  <p className="font-semibold">{product.speedRating}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Capacidade de carga</p>
                  <p className="font-semibold">{product.loadIndex}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Desenho</p>
                  <p className="font-semibold">{product.pattern}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
