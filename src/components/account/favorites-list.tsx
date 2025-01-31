import { useEffect, useMemo, useState } from 'react';
import { Authenticator } from '@aws-amplify/ui-react';
import { useStore } from '@nanostores/react';
import { Button, Link } from "@heroui/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/pro-light-svg-icons';
import { faHeart as faHeartSolid } from '@fortawesome/pro-solid-svg-icons';
import { favoriteStore, reloadFavorites } from '../../stores/favorites';
import { getEntriesByIds } from '../../lib/contentful';

const FavoritesList = () => {
  const $favorites = useStore(favoriteStore);
  const [favoritesLoaded, setFavoritesLoaded] = useState<boolean>(false);
  const [contentLoaded, setContentLoaded] = useState<boolean>(false);

  const favoritesByType = useMemo(() => {
    if (!favoritesLoaded) {
      return {};
    }

    return Object.values($favorites).reduce((acc, cur) => {
      if (!(cur.contentType in acc)) {
        acc[cur.contentType] = [];
      }
      acc[cur.contentType].push(cur);
      return acc;
    }, {});
  }, [favoritesLoaded]);

  useEffect(() => {
    reloadFavorites().then(() => {
      setFavoritesLoaded(true);
    });
  }, []);

  useEffect(() => {
    loadFavoritesContent();
  }, [favoritesByType]);

  const loadFavoritesContent = async () => {

    //console.log('favoritesByType, pre-content', favoritesByType);

    for (const contentType in favoritesByType) {
      const contentIds = favoritesByType[contentType].map(f => f.contentId);

      const contentItems = await getEntriesByIds(contentType, contentIds);

      contentItems.forEach(c => {
        const fav = favoritesByType[contentType].find(f => f.contentId === c.sys.id);
        fav.content = c;
      });
    }

    //console.log('favoritesByType, post-content', favoritesByType);

    setContentLoaded(true);
  };

  return (
    <Authenticator.Provider>
      {favoritesLoaded && contentLoaded && Object.keys(favoritesByType).length ? (
        Object.keys(favoritesByType).map(favType => (
          <div key={`favorite-${favType}s`}>
            <h3 className="text-2xl font-bold mb-8">Favorite {favType.charAt(0).toUpperCase()}{favType.substring(1)}s</h3>
            <ul className={`${favType}-cards-list`}>
              {favoritesByType[favType].map((fav, index) => (
                <div key={`favorite-favType-${fav.contentId}`} className="w-full h-full">
                  ID: {fav.contentId}&nbsp;&nbsp;Added: {new Date(fav.createdDate).toString()}
                </div>
              ))}
            </ul>
          </div>
        ))
      ) : (
        <ul className="empty-cards-list">
          <li className="card-placeholder card-instruct rounded-large text-center p-6">
            <div className="upload-upsell-container">
              <div className="upload-upsell-icon">
                <div className="triangle-up light"></div>
                <div className="triangle-up dark"></div>
              </div>
              <FontAwesomeIcon icon={faHeart} className="h-8 mb-6 mt-4 mx-* border rounded-full p-4 border-slate-400" />
              <h2 className="text-1xl font-bold mb-2 leading-5 mb-8">Favoriting <a href="/modules" className="underline">modules</a>, <a href="/units" className="underline">units</a>, or <a href="/lessons" className="underline">lessons</a> will build your collection of Berklee Open resources here.</h2>
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
          <li className="card-placeholder empty-card-item rounded-large"></li>
          <li className="card-placeholder empty-card-item rounded-large"></li>
          <li className="card-placeholder empty-card-item rounded-large"></li>
          <li className="card-placeholder empty-card-item rounded-large"></li>
          <li className="card-placeholder empty-card-item rounded-large"></li>
          <li className="card-placeholder empty-card-item rounded-large"></li>
          <li className="card-placeholder empty-card-item rounded-large"></li>
          <li className="card-placeholder empty-card-item rounded-large"></li>
        </ul>
      )}
    </Authenticator.Provider>
  );
};

export default FavoritesList;
