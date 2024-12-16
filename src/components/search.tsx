import React, { useEffect, useState } from 'react';
import algoliasearch from 'algoliasearch/lite';
import { useInstantSearch, useSearchBox } from 'react-instantsearch-core';
import { InstantSearch, SearchBox, Hits, Configure } from 'react-instantsearch';

import ModuleCard from './cards/module';
import UnitCard from './cards/unit';
import LessonCard from './cards/lesson';

// Create a custom search client that returns all records when there's no query
const searchClient = {
  ...algoliasearch('AHDTI74E4C', '8a286c5cd2c0c5f5cbd68e8a8e4eeda2'),
  search(requests) {
    const newRequests = requests.map(request => {
      // If there's no query, modify the request to return all records
      if (!request.params.query) {
        return {
          ...request,
          params: {
            ...request.params,
            filters: '', // Clear any filters
            distinct: false, // Disable distinct
            hitsPerPage: 1000, // Increase hits per page
          },
        };
      }
      return request;
    });

    // Use the underlying Algolia client to perform the search
    return algoliasearch('AHDTI74E4C', '8a286c5cd2c0c5f5cbd68e8a8e4eeda2').search(newRequests);
  },
};

const capitalizeFirstLetter = (string) => {
  if (!string) return '';
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
  
  return null; // Return null instead of unknown content type div
};

const SearchResults = ({ searchTerm }) => {
  const { results } = useInstantSearch();

  if (!results.__isArtificial && results.nbHits === 0) {
    return (
      <div className="text-center">
        <h4 className="text-xl font-semibold">No results found.</h4>
        <p className="text-gray-500 mt-2">Try adjusting your search or filter to find what you're looking for.</p>
      </div>
    );
  }

  return (
    <div className="ais-Hits">
      <Hits 
        hitComponent={Hit} 
        classNames={{
          list: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
        }}
      />
    </div>
  );
};

const CustomSearchBox = ({ initialQuery, setSearchTerm }) => {
  const { query, refine } = useSearchBox();

  useEffect(() => {
    if (initialQuery) {
      refine(initialQuery);
      setSearchTerm(initialQuery);
    }
  }, [initialQuery, refine, setSearchTerm]);

  const handleChange = (event) => {
    const searchTerm = event.currentTarget.value;
    refine(searchTerm);
    setSearchTerm(searchTerm || '');
  };

  return (
    <div className="mb-8">
      <SearchBox 
        placeholder="Search resources or concepts..." 
        onInput={handleChange} 
        className="w-full md:w-3/4 mx-auto" 
      />
      {query && (
        <h2 className="text-center mt-4 mb-6">
          Results for "<strong>{capitalizeFirstLetter(query || initialQuery)}</strong>"
        </h2>
      )}
    </div>
  );
};

const Search = () => {
  const [initialQuery, setInitialQuery] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const query = searchParams.get('q') || '';
    setInitialQuery(query);
    setSearchTerm(query);
  }, []);

  return (
    <InstantSearch 
      searchClient={searchClient} 
      indexName="BerkleeOpen"
      initialUiState={{
        BerkleeOpen: {
          query: initialQuery || '',
          page: 1,
        },
      }}
    >
       <Configure
        analytics={false}
        filters="sys.contentType.sys.id:lesson OR sys.contentType.sys.id:unit OR sys.contentType.sys.id:module"
        hitsPerPage={20}
        />
        <CustomSearchBox initialQuery={initialQuery} setSearchTerm={setSearchTerm} />
        <SearchResults searchTerm={searchTerm} />
    </InstantSearch>
  );
};

export default Search;