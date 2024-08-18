import React from 'react';
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, SearchBox, Hits } from 'react-instantsearch-hooks-web';
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
  
  return <div class="search-unknown-content">Unknown content type</div>;
};

const CustomHits = ({ hits }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    {hits.map(hit => <Hit key={hit.objectID} hit={hit} />)}
  </div>
);

const Search = () => {
    return (
      <InstantSearch searchClient={searchClient} indexName="BerkleeOpen">
        <SearchBox placeholder="Search for modules, units, or lessons..." />
        <Hits hitComponent={Hit} />
      </InstantSearch>
    );
  };

export default Search;