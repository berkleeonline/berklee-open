import { useEffect, useMemo, useState } from 'react';
import { Authenticator } from '@aws-amplify/ui-react';
import { useStore } from '@nanostores/react';
import { Button, Link } from "@heroui/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faSpinner } from '@fortawesome/pro-light-svg-icons';
import { favoriteStore, reloadFavorites } from '../../stores/favorites';
import { getEntriesByIds } from '../../lib/contentful';
import ModuleCard from '../cards/module';
import UnitCard from '../cards/unit';
import LessonCard from '../cards/lesson';

const FavoritesList = () => {
  const $favorites = useStore(favoriteStore);
  const [favoritesLoaded, setFavoritesLoaded] = useState<boolean>(false);
  const [contentLoaded, setContentLoaded] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true); // Prevents flashing

  const favoritesByType = useMemo(() => {
    return Object.values($favorites || {}).reduce((acc, cur) => {
      if (!(cur.contentType in acc)) {
        acc[cur.contentType] = [];
      }
      acc[cur.contentType].push(cur);
      return acc;
    }, {});
  }, [$favorites]);

  useEffect(() => {
    // Start loading favorites
    reloadFavorites().then(() => {
      setFavoritesLoaded(true);
    });
  }, []);

  useEffect(() => {
    // Wait until favorites are loaded to process content
    if (favoritesLoaded) {
      if (Object.keys(favoritesByType).length > 0) {
        loadFavoritesContent();
      } else {
        // If no favorites exist, stop loading immediately
        setIsLoading(false);
      }
    }
  }, [favoritesLoaded, favoritesByType]);

  const loadFavoritesContent = async () => {
    for (const contentType in favoritesByType) {
      const contentIds = favoritesByType[contentType].map(f => f.contentId);
      const contentItems = await getEntriesByIds(contentType, contentIds);

      contentItems.forEach(c => {
        const fav = favoritesByType[contentType].find(f => f.contentId === c.sys.id);
        fav.content = c;
      });
    }

    setContentLoaded(true);
    setIsLoading(false); // Now we are 100% done loading
  };

  return (
    <Authenticator.Provider>
      {/* Show loading state before rendering any content */}
      {isLoading ? (
        <div className="loading-container flex justify-center items-center min-h-[200px]">
          <FontAwesomeIcon icon={faSpinner} className="text-4xl text-slate-500 animate-spin w-16" />
        </div>
      ) : favoritesLoaded && contentLoaded && Object.keys(favoritesByType).length > 0 ? (
        Object.keys(favoritesByType).map(favType => (
          <div key={`favorite-${favType}s`}>
            <h3 className="text-2xl font-bold mb-8">
              Favorite {favType.charAt(0).toUpperCase()}{favType.substring(1)}s
            </h3>
            <ul className={`${favType}-cards-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-300 mb-24`}>
              {favoritesByType[favType].map((fav, index) => {
                const fields = fav.content?.fields;
                if (!fields) return null;
                return (
                  <li key={`favorite-${favType}-${fav.contentId}`}>
                    {favType === 'module' && (
                      <ModuleCard
                        id={fav.contentId}
                        title={fields.module_title}
                        image={fields.module_image}
                        shortDescription={fields.module_short_description}
                        level={fields.module_level}
                        unitsCount={fields.module_units?.length || 0}
                        concept={fields.concept_name}
                        index={index}
                      />
                    )}
                    {favType === 'unit' && (
                      <UnitCard
                        id={fav.contentId}
                        title={fields.unit_title}
                        image={fields.unit_image}
                        shortDescription={fields.unit_short_description}
                        level={fields.unit_level || []}
                        lessonsCount={fields.unit_lessons?.length || 0}
                      />
                    )}
                    {favType === 'lesson' && (
                      <LessonCard
                        id={fav.contentId}
                        title={fields.lesson_title}
                        duration={fields.lesson_duration}
                        shortDescription={fields.lesson_short_description}
                        audience={fields.lesson_audience}
                        imageUrl={fields.lesson_image}
                        index={index}
                      />
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        ))
      ) : (
        <ul className="empty-cards-list">
          <li className="card-placeholder card-instruct rounded-large text-center p-6">
            <div className="upload-upsell-container">
              <FontAwesomeIcon icon={faHeart} className="h-8 mb-6 mt-4 mx-auto border rounded-full p-4 border-slate-400" />
              <h2 className="text-1xl font-bold mb-2 leading-5 mb-8">
                Favoriting <a href="/modules" className="underline">modules</a>, 
                <a href="/units" className="underline">units</a>, or 
                <a href="/lessons" className="underline">lessons</a> 
                will build your collection of Berklee Open resources here.
              </h2>
              <Button 
                  href={`/search`} 
                  as={Link}
                  isExternal 
                  className="font-bold background-slate-400 w-41 mb-2" 
                  variant="solid"
                  color="primary"
                  aria-label="Browse all Resources"
                >
                Browse All Resources
              </Button>
            </div>
          </li>
        </ul>
      )}
    </Authenticator.Provider>
  );
};


export default FavoritesList;




