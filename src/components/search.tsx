import React, { useEffect, useState } from 'react';
import algoliasearch from 'algoliasearch/lite';
import { useInstantSearch, useSearchBox } from 'react-instantsearch-core';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";
import { InstantSearch, SearchBox, Hits, Configure } from 'react-instantsearch';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/pro-light-svg-icons';


import ModuleCard from './cards/module';
import UnitCard from './cards/unit';
import LessonCard from './cards/lesson';

const capitalizeFirstLetter = (string) => {
  if (!string) return '';
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const Hit = ({ hit }) => {
  // Just log the sys data
  console.log('Created at:', hit?.sys?.createdAt);

  const fields = hit.fields || {};
  const getEnUSValue = (field) => field?.['en-US'];
  const getImageUrl = (imageField) => {
    const url = imageField?.fields?.file?.url;
    return url?.startsWith('//') ? `https:${url}` : url ?? 'https://placehold.co/425x265';
  };

  const cardProps = {
    className: "transform transition-all duration-300 ease-in-out opacity-0 translate-y-4 animate-in",
    style: {
      animationFillMode: 'forwards',
      animationDelay: '100ms',
    }
  };

  if (fields.module_title) {
    return (
      <div {...cardProps}>
      <ModuleCard
        key={hit.objectID}
        id={hit.objectID}
        title={getEnUSValue(fields.module_title)}
        image={getImageUrl(fields.module_image)}
        shortDescription={getEnUSValue(fields.module_short_description)}
        level={getEnUSValue(fields.module_level)}
        unitsCount={fields.module_units?.length || 0}
        concept={getEnUSValue(fields.concept_name)}
        index={0}
      />
      </div>
    );
  } else if (fields.unit_title) {
    return (
      <div {...cardProps}>
      <UnitCard
        key={hit.objectID}
        id={hit.objectID}
        title={getEnUSValue(fields.unit_title)}
        image={getImageUrl(fields.unit_image)}
        shortDescription={getEnUSValue(fields.unit_short_description)}
        level={getEnUSValue(fields.unit_level) || []}
        lessonsCount={fields.unit_lessons?.length || 0}
      />
      </div>
    );
  } else if (fields.lesson_title) {
    return (
      <div {...cardProps}>
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
      </div>
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
    <div className="ais-Hits transition-all duration-300 ease-in-out">
      <Hits 
        hitComponent={Hit} 
        classNames={{
          list: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-300'
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
        <h2 className="text-center mt-4 mb-6 text-3xl font-semibold">
          Results for "<strong>{capitalizeFirstLetter(query || initialQuery)}</strong>"
        </h2>
      )}
    </div>
  );
};

const FilterTabs = ({ activeFilter, setActiveFilter, activeTimeframe, setActiveTimeframe }) => {
  const filters = [
    { label: 'All', value: '' },
    { label: 'Modules', value: 'module' },
    { label: 'Units', value: 'unit' },
    { label: 'Lessons', value: 'lesson' }
  ];

  const timeFilters = [
    { label: 'All Time', value: '' },
    { label: 'This Past Week', value: 'week' },
    { label: 'This Past Month', value: 'month' }
  ];

  const [selectedKeys, setSelectedKeys] = React.useState(new Set(["text"]));

  // Add this to handle the selected timeframe display
  const getSelectedTimeframe = () => {
    const selected = timeFilters.find(filter => filter.value === activeTimeframe);
    return (
      <div className="flex items-center gap-2">
        {selected?.label || 'All Time'}
        <FontAwesomeIcon icon={faChevronDown} className="text-sm" />
      </div>
    );
  };

  return (
    <div className="flex flex-row items-center justify-between gap-4 mb-8">
      {/* Content type filters */}
      <div className="flex justify-center gap-2">
        {filters.map(filter => (
          <button
            key={filter.value}
            onClick={() => setActiveFilter(filter.value)}
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeFilter === filter.value
                ? 'bg-primary text-white'
                : 'bg-default-100 hover:bg-default-200'
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* Time filters */}
      <Dropdown>
        <DropdownTrigger>
          <Button className="capitalize" variant="bordered">
            {getSelectedTimeframe()}
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          disallowEmptySelection
          aria-label="Choose Timeframe"
          selectedKeys={new Set([activeTimeframe || ''])}
          selectionMode="single"
          variant="flat"
          onSelectionChange={(keys) => setActiveTimeframe(Array.from(keys)[0])}
        >
          {timeFilters.map(filter => (
            <DropdownItem key={filter.value}>{filter.label}</DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

const Search = () => {
  const [initialQuery, setInitialQuery] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('');
  const [activeTimeframe, setActiveTimeframe] = useState('');

  const searchClient = {
    ...algoliasearch('AHDTI74E4C', '8a286c5cd2c0c5f5cbd68e8a8e4eeda2'),
    search(requests) {
      const newRequests = requests.map(request => {
        if (!request.params.query) {
          return {
            ...request,
            params: {
              ...request.params,
              distinct: false,
              hitsPerPage: 1000,
            },
          };
        }
        return request;
      });
  
      return algoliasearch('AHDTI74E4C', '8a286c5cd2c0c5f5cbd68e8a8e4eeda2')
        .search(newRequests)
        .then(response => {
          return {
            ...response,
            results: response.results.map(result => ({
              ...result,
              hits: result.hits
                .filter(hit => {
                  const fields = hit.fields || {};
                  return fields.module_title || fields.unit_title || fields.lesson_title;
                })
                // Add this new filter for timeframe
                .filter(hit => {
                  if (!activeTimeframe) return true;
                  const date = new Date(hit?.sys?.createdAt);
                  const now = new Date();
                  switch(activeTimeframe) {
                    case 'week':
                      const weekAgo = new Date();
                      weekAgo.setDate(weekAgo.getDate() - 7);
                      return date >= weekAgo;
                    case 'month':
                      const monthAgo = new Date();
                      monthAgo.setMonth(monthAgo.getMonth() - 1);
                      return date >= monthAgo;
                    default:
                      return true;
                  }
                })
                // Add this sort
                .sort((a, b) => new Date(b.sys.createdAt) - new Date(a.sys.createdAt))
            }))
          };
        });
    },
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const query = searchParams.get('q') || '';
    // Add this new param
    const timeframe = searchParams.get('timeframe') || '';
    setInitialQuery(query);
    setSearchTerm(query);
    // Add this new setter
    setActiveTimeframe(timeframe);
  }, []);

  // Build the filter string based on the active filter
  const getFilterString = () => {
    if (!activeFilter) {
      return "sys.contentType.sys.id:lesson OR sys.contentType.sys.id:unit OR sys.contentType.sys.id:module";
    }
    return `sys.contentType.sys.id:${activeFilter}`;
  };

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
        filters={getFilterString()}
        hitsPerPage={20}
        />
        <CustomSearchBox initialQuery={initialQuery} setSearchTerm={setSearchTerm} />
        <FilterTabs activeFilter={activeFilter} setActiveFilter={setActiveFilter} activeTimeframe={activeTimeframe} setActiveTimeframe={setActiveTimeframe} />
        <SearchResults searchTerm={searchTerm} />
    </InstantSearch>
  );
};

export default Search;