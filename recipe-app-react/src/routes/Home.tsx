import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Pagination from '../components/Pagination';
import Recipe from '../components/Recipe';

import styles from '../styles/home.module.css';

export interface RecipeProps {
  id: number;
  name: string;
  image: string;
  difficulty: string;
  tags: Array<string>;
}

const Home = () => {
  // Page state
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [recipes, setRecipes] = useState<RecipeProps[]>();
  const [totalItems, setTotalItems] = useState<number>(0);

  // current page & other parameters
  const [searchParams] = useSearchParams();
  const ITEM_COUNT_PER_PAGE = 6;
  const PAGE_COUNT = 10;

  useEffect(() => {
    setCurrentPage(parseInt(searchParams.get('page') || '1', 10));
  }, [searchParams]);

  useEffect(() => {
    const getRecipes = async (
      currentPage: number,
      itemCountPerPage: number
    ) => {
      const response = await fetch(
        `https://dummyjson.com/recipes?limit=${itemCountPerPage}&skip=${(currentPage - 1) * itemCountPerPage}&select=name,image,difficulty,tags`
      );
      const data = await response.json();
      setLoading(false);
      setRecipes(data.recipes);
      setTotalItems(data.total);
    };

    getRecipes(currentPage, ITEM_COUNT_PER_PAGE);
  }, [currentPage]);

  return (
    <main className={styles.container}>
      <div>
        {loading ? (
          <div
            className={styles.loadingWrap}
            aria-busy="true"
            aria-live="polite"
          >
            <div className={styles.loader} />
            <p className={styles.loadingText}>Fetching Recipes . . .</p>
          </div>
        ) : (
          <>
            <div className={styles.recipeGrid}>
              {recipes?.map((recipe) => (
                <Recipe
                  key={recipe.id}
                  id={recipe.id}
                  name={recipe.name}
                  image={recipe.image}
                  difficulty={recipe.difficulty}
                  tags={recipe.tags}
                />
              ))}
            </div>
            <Pagination
              totalItems={totalItems}
              itemCountPerPage={ITEM_COUNT_PER_PAGE}
              pageCount={PAGE_COUNT}
              currentPage={currentPage}
            />
          </>
        )}
      </div>
    </main>
  );
};
export default Home;
