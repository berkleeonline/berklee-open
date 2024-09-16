import React, { useEffect, useState } from 'react';
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, SearchBox, Hits, useInstantSearch, useSearchBox } from 'react-instantsearch-hooks-web';
import ModuleCard from './cards/module';
import UnitCard from './cards/unit';
import LessonCard from './cards/lesson';

const searchClient = algoliasearch('AHDTI74E4C', '8a286c5cd2c0c5f5cbd68e8a8e4eeda2');

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

const NoResults = () => (
    <div className="text-center py-10">
      <p className="text-xl font-semibold">No results found for that search.</p>
      <p className="text-gray-500 mt-2 demo">Try adjusting your search or filter to find what you're looking for.</p>
    </div>
);

const SearchResults = () => {
  const { results } = useInstantSearch();

  if (!results.__isArtificial && results.nbHits === 0) {
    return <NoResults />;
  }

  return <Hits hitComponent={Hit} />;
};

const CustomSearchBox = ({ initialQuery }) => {
  const { query, refine } = useSearchBox(); // Provides the ability to update the search query

  useEffect(() => {
    if (initialQuery) {
      refine(initialQuery); // Set the initial search query from URL
    }
  }, [initialQuery, refine]);

  return <SearchBox placeholder="Search resources or concepts..." />;
};

const Search = () => {
  const [initialQuery, setInitialQuery] = useState('');

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search); // Get query string from the URL
    const query = searchParams.get('q') || '';  // Get the query from URL
    setInitialQuery(query);
  }, []);

  return (
    <InstantSearch searchClient={searchClient} indexName="BerkleeOpen">
      <CustomSearchBox initialQuery={initialQuery} />
      <SearchResults />
    </InstantSearch>
  );
};

export default Search;