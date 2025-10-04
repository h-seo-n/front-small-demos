import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from '../styles/Detail.module.css';

interface RecipeDetail {
  id: number;
  name: string;
  ingredients: string[];
  instructions: string[];
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  servings: number;
  difficulty: string;
  cuisine: string;
  caloriesPerServing: number;
  tags: string[];
  image: string;
  rating: number;
  reviewCount: number;
  mealType: string[];
}

const Detail = () => {
  const [loading, setLoading] = useState(true);
  const [recipe, setRecipe] = useState<RecipeDetail>();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const getRecipe = async () => {
      const response = await fetch(`https://dummyjson.com/recipes/${id}`);
      const data = await response.json();
      setRecipe(data);
      setLoading(false);
    };
    getRecipe();
  }, [id]);

  if (loading) {
    return (
      <div className={styles.loadingWrap} aria-busy="true" aria-live="polite">
        <div className={styles.loader} />
        <p className={styles.loadingText}>Fetching Recipes . . .</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.topSection}>
        {/* 사진 */}
        <div className={styles.imageContainer}>
          <img src={recipe?.image} alt={recipe?.name}></img>
        </div>

        <div className={styles.infoContainer}>
          {/* 요리이름 + 난이도 */}
          <div className={styles.titleRow}>
            <h1 className={styles.recipeTitle}>{recipe?.name}</h1>
            <span className={styles.recipeDifficulty}>
              {recipe?.difficulty}
            </span>
          </div>
          {/* 요리 시간 */}
          <p className={styles.timeInfo}>
            <strong>
              Total cooking time{' '}
              {(recipe?.cookTimeMinutes || 0) + (recipe?.prepTimeMinutes || 0)}{' '}
              minutes
            </strong>
            <br />
            <span>Preparation time {recipe?.prepTimeMinutes} minutes</span>
            <br />
            <span>Cooking time {recipe?.cookTimeMinutes} minutes</span>
          </p>
          {/* 태그 */}
          <ul className={styles.chips}>
            {recipe?.tags.map((val) => {
              return (
                <li className={styles.chip} key={`${id} ${val}`}>
                  {val}
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      {/* 재료 */}
      <div className={styles.ingredients}>
        <h3>Ingredients</h3>
        <p>{recipe?.ingredients.join(' / ')};</p>
      </div>

      {/* 레시피 */}
      <div className={styles.recipeSection}>
        <h3>Recipe</h3>
        <ol>
          {recipe?.instructions.map((inst, idx) => (
            <>
              <li key={`inst${idx}`}>{inst}</li>
            </>
          ))}
        </ol>
      </div>

      {/* 요리 정보 */}
      <div className={styles.menuInfo}>
        <h3>Menu Info</h3>
        <ul>
          <li>Cuisine : {recipe?.cuisine}</li>
          <li>Meal Type : {recipe?.mealType}</li>
          <li>
            Calories Per Serving : {recipe?.caloriesPerServing}, Serving :{' '}
            {recipe?.servings}
          </li>
          <li>
            Rating : {recipe?.rating}, Review counts : {recipe?.reviewCount}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Detail;
