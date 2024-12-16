import React, { useEffect, useState } from 'react';
import algoliasearch from 'algoliasearch/lite';
import { useInstantSearch, useSearchBox } from 'react-instantsearch-core';
import { InstantSearch, SearchBox, Hits } from 'react-instantsearch';

import ModuleCard from './cards/module';
import UnitCard from './cards/unit';
import LessonCard from './cards/lesson';

const searchClient = algoliasearch('AHDTI74E4C', '8a286c5cd2c0c5f5cbd68e8a8e4eeda2');

// Utility function to capitalize the first letter of the search term safely
const capitalizeFirstLetter = (string) => {
  if (!string) return ''; // Ensure the string is valid
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const Hit = ({ hit }) => {
  const fields = hit.fields || {};
  const getEnUSValue = (field) => field?.['en-US'];
  const getImageUrl = (imageField) => {
    const url = imageField?.fields?.file?.url;
    return url?.startsWith('//') ? `https:${url}` : url ?? 'https://placehold.co/425x265';
  };

  if (fields.module_title) {
    return (
      <ModuleCard
        key={hit.objectID}
        id={hit.objectID}
        title={getEnUSValue(fields.module_title)}
        image={getImageUrl(fields.module_image)}
        shortDescription={getEnUSValue(fields.module_short_description)}
        level={getEnUSValue(fields.module_level)}
        unitsCount={fields.module_units?.length || 0}
        index={0}
      />
    );
  } else if (fields.unit_title) {
    return (
      <UnitCard
        key={hit.objectID}
        id={hit.objectID}
        title={getEnUSValue(fields.unit_title)}
        image={getImageUrl(fields.unit_image)}
        shortDescription={getEnUSValue(fields.unit_short_description)}
        level={getEnUSValue(fields.unit_level) || []}
        lessonsCount={fields.unit_lessons?.length || 0}
      />
    );
  } else if (fields.lesson_title) {
    return (
      <LessonCard
        key={hit.objectID}
        id={hit.objectID}
        title={getEnUSValue(fields.lesson_title)}
        duration={getEnUSValue(fields.lesson_duration)}
        shortDescription={getEnUSValue(fields.lesson_short_description)}
        audience={getEnUSValue(fields.lesson_audience)}
        imageUrl={getImageUrl(fields.lesson_image)}
        index={0}
      />
    );
  }
  
  return <div className="search-unknown-content">Unknown content type</div>;
};

// Updated NoResults to accept and display the search term
const NoResults = ({ searchTerm }) => (
    <div className="text-center">
      <p className="text-xl font-semibold">No results found.</p>
      <p className="text-gray-500 mt-2 demo">Try adjusting your search or filter to find what you're looking for.</p>
    </div>
);

const SearchResults = ({ searchTerm }) => {
  const { results } = useInstantSearch();

  if (!results.__isArtificial && results.nbHits === 0) {
    return <NoResults searchTerm={searchTerm} />;
  }

  return <Hits hitComponent={Hit} />;
};

const CustomSearchBox = ({ initialQuery, setSearchTerm }) => {
  const { query, refine } = useSearchBox(); // Provides the ability to update the search query

  useEffect(() => {
    if (initialQuery) {
      refine(initialQuery); // Set the initial search query from URL
      setSearchTerm(initialQuery); // Set the search term in the parent component
    }
  }, [initialQuery, refine, setSearchTerm]);

  // Update the search term whenever the user types
  const handleChange = (event) => {
    const searchTerm = event.currentTarget.value;
    refine(searchTerm);
    setSearchTerm(searchTerm || ''); // Ensure the search term is always a string
  };

  return (
    <div>
      <SearchBox placeholder="Search resources or concepts..." onInput={handleChange} className="w-3/4 mx-auto" />
      {/* Conditionally display the search term if not empty */}
      {query && (
        <h2 className="search-term text-center mb-4">Results for "<strong>{capitalizeFirstLetter(query || initialQuery)}</strong>"</h2>
      )}
    </div>
  );
};



const Search = () => {
  const [initialQuery, setInitialQuery] = useState('');
  const [searchTerm, setSearchTerm] = useState(''); // Store the current search term

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search); // Get query string from the URL
    const query = searchParams.get('q') || '';  // Get the query from URL
    setInitialQuery(query);
    setSearchTerm(query); // Initialize search term
  }, []);

  return (
    <InstantSearch searchClient={searchClient} indexName="BerkleeOpen" initialUiState={{BerkleeOpen: { query: initialQuery || '',page: 1, },}}>
      <CustomSearchBox initialQuery={initialQuery} setSearchTerm={setSearchTerm} />
      <SearchResults searchTerm={searchTerm} className="mt-24" />
    </InstantSearch>
  );
};

export default Search;
