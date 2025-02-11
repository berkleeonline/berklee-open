import { useEffect, useState } from 'react';
import { reloadFavorites } from '../../stores/favorites';

const FavoritesLoader = () => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    reloadFavorites().then(() => {
      setIsLoaded(true);
    });
  }, []);

  return (
    <></>
  );
};

export default FavoritesLoader;
