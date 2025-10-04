import { Link } from 'react-router-dom';
import type { RecipeProps } from '../routes/Home';

import styles from '../styles/Recipe.module.css';

export default function Recipe({
  id,
  name,
  image,
  difficulty,
  tags,
}: RecipeProps) {
  return (
    <Link to={`/recipe/${id}`} className={styles.recipeCard} key={id}>
      <img
        className={styles.recipeImg}
        alt={`menu photo of ${name}`}
        src={image}
      ></img>
      <div className={styles.row}>
        <h2 className={styles.recipeTitle}>{name}</h2>
        <span className={styles.recipeDifficulty}>{difficulty}</span>
      </div>
      <ul className={styles.chips}>
        {tags.map((val) => {
          return (
            <li className={styles.chip} key={`${id} ${val}`}>
              {val}
            </li>
          );
        })}
      </ul>
    </Link>
  );
}
