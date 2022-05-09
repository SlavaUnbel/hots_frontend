import React from 'react';
import { heroesStateSelector } from '../../redux/selectors/heroesSelector';
import { useAppSelector } from '../../store';

const PickedHeroes: React.FC = () => {
  // const dispatch = useAppDispatch();
  const {
    heroes: { heroesList },
  } = useAppSelector(heroesStateSelector);

  return <div>{JSON.stringify(heroesList, null, 2)}</div>;
};

export default PickedHeroes;
