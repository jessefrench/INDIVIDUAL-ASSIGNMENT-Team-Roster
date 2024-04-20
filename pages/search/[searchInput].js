/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../utils/context/authContext';
import MemberCard from '../../components/MemberCard';
import { searchMembers } from '../../api/memberData';

export default function Search() {
  const [searchResults, setSearchResults] = useState([]);
  const { user } = useAuth();

  const router = useRouter();
  const { searchInput } = router.query;

  const getSearchResults = async () => {
    const filteredResults = await searchMembers(searchInput, user.uid);
    setSearchResults(filteredResults);
  };

  useEffect(() => {
    getSearchResults();
  }, [searchInput, user.uid]);

  return (
    <div className="d-flex flex-wrap">
      {searchResults.length === 0
        ? (<h1>No fighters found.</h1>)
        : (searchResults.map((results) => (
          <MemberCard key={results.firebaseKey} memberObj={results} onUpdate={getSearchResults} />)))}
    </div>
  );
}
