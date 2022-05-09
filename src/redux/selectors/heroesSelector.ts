import { ApplicationState } from '../rootReducer';

export const heroesStateSelector = (state: ApplicationState) => {
  const { heroes } = state;

  return heroes;
};
