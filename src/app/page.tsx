"use client";

import { useEffect, useState } from "react";
import { debounce } from 'lodash';
import { AdvocatesTable } from '@/components/AdvocatesTable';
import { Advocate } from '@/types/advocate';

export default function Home() {
  const [advocates, setAdvocates] = useState<Advocate[]>([]);
  const [filteredAdvocates, setFilteredAdvocates] = useState<Advocate[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    console.log("fetching advocates...");
    fetchAdvocates();
  }, []);

  const fetchAdvocates = async () => {
    try {
      const response = await fetch("/api/advocates");
      const { data } = await response.json();
      setAdvocates(data);
      setFilteredAdvocates(data);
    } catch (error) {
      console.error("Failed to fetch advocates:", error);
      // Handle error appropriately
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value;

    setSearchTerm(searchTerm);

    console.log("filtering advocates...");
    const filteredAdvocates = advocates.filter((advocate) => {
      const searchTermLower = searchTerm.toLowerCase();
      return (
        advocate.firstName.toLowerCase().includes(searchTermLower) ||
        advocate.lastName.toLowerCase().includes(searchTermLower) ||
        advocate.city.toLowerCase().includes(searchTermLower) ||
        advocate.degree.toLowerCase().includes(searchTermLower) ||
        advocate.specialties.includes(searchTermLower) ||
        advocate.yearsOfExperience.includes(searchTermLower)
      );
    });

    setFilteredAdvocates(filteredAdvocates);
  };

  const onClick = () => {
    console.log(advocates);
    setFilteredAdvocates(advocates);
  };

  const debouncedSearch = debounce((searchTerm: string) => {
    const filtered = advocates.filter((advocate) => {
      // ... filtering logic
    });
    setFilteredAdvocates(filtered);
  }, 300);

  return (
    <main style={{ margin: "24px" }}>
      <h1>Solace Advocates</h1>
      <br />
      <br />
      <div>
        <p>Search</p>
        <p>
          Searching for: <span>{searchTerm}</span>
        </p>
        <input style={{ border: "1px solid black" }} onChange={onChange} />
        <button onClick={onClick}>Reset Search</button>
      </div>
      <br />
      <br />
      <AdvocatesTable advocates={filteredAdvocates} />
    </main>
  );
}
