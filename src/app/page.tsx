"use client";

import { useEffect, useState } from "react";
import { debounce } from 'lodash';
import { AdvocatesTable } from '@/components/AdvocatesTable';
import { Advocate } from '@/types/advocate';
import { fetchAdvocates } from '@/app/api_utils';

export default function Home() {
  const [advocates, setAdvocates] = useState<Advocate[]>([]);
  const [filteredAdvocates, setFilteredAdvocates] = useState<Advocate[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    console.log("fetching advocates...");
    fetchAdvocates();
  }, []);


  useEffect(() => {
    const loadAdvocates = async () => {
      const data = await fetchAdvocates();
      setAdvocates(data);
      setFilteredAdvocates(data);
    };

    loadAdvocates();
  }, []);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value;

    setSearchTerm(searchTerm);
    debouncedSearch(searchTerm);

    console.log("filtering advocates...");
  };

  const onClick = () => {
    console.log(advocates);
    setFilteredAdvocates(advocates);
  };

  const debouncedSearch = debounce((searchTerm: string) => {
    const filtered = advocates.filter((advocate) => {
      const searchTermLower = searchTerm.toLowerCase();

      return (
        advocate.firstName.toLowerCase().includes(searchTermLower) ||
        advocate.lastName.toLowerCase().includes(searchTermLower) ||
        advocate.city.toLowerCase().includes(searchTermLower) ||
        advocate.degree.toLowerCase().includes(searchTermLower) ||
        advocate.specialties.some(specialty =>
          specialty.toLowerCase().includes(searchTermLower)
        )
      );
    });
    setFilteredAdvocates(filtered);
  }, 300);

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-5xl font-extrabold text-[#0A3B3A] text-center mb-8 pb-4 border-b-2 border-[#0A3B3A] tracking-tight">
        Solace Advocates
      </h1>
      <br />
      <br />
      <div className="flex flex-col gap-4 my-8">
        <p className="text-lg font-semibold">Search</p>
        <div className="flex gap-4">
          <input
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            onChange={onChange}
          />
          <button
            onClick={onClick}
            className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Reset Search
          </button>
        </div>
        <p className="text-sm text-gray-600">
          Searching for: <span className="font-medium">{searchTerm}</span>
        </p>
        <br />
        <AdvocatesTable advocates={filteredAdvocates} />
      </div>
    </main>
  );
}
