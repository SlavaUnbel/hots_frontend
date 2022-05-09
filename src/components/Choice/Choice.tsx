import { Grid, Box, Container } from '@mui/material';
import React, { useEffect } from 'react';
import { mapsStateSelector, hasNoSelectedMapSelector } from '../../redux/selectors/mapsSelector';
import { fetchMaps, setSelectedMap } from '../../redux/reducers/mapsReducer';
import { useAppSelector, useAppDispatch } from '../../store';
import CustomAutocomplete from '../../utils/CustomAutocomplete';
import { useNavigate } from 'react-router-dom';
import {
  hasNoSelectedHeroClassSelector,
  heroClassesStateSelector,
} from '../../redux/selectors/heroClassesSelector';
import { fetchHeroClasses, setSelectedHeroClass } from '../../redux/reducers/heroClassesReducer';
import logoSrc from '../../assets/images/choice/logo.png';

const Choice: React.FC = () => {
  const dispatch = useAppDispatch();
  const {
    maps: { mapList, isFetching: isFetchingMaps },
    selectedMap,
  } = useAppSelector(mapsStateSelector);
  const hasNoMapSelected = useAppSelector(hasNoSelectedMapSelector);
  const {
    heroClasses: { classList, isFetching: isFetchingHeroClasses },
    selectedClass,
  } = useAppSelector(heroClassesStateSelector);
  const hasNoHeroClassSelected = useAppSelector(hasNoSelectedHeroClassSelector);

  const navigate = useNavigate();

  const isDisabled = hasNoMapSelected || hasNoHeroClassSelected;

  useEffect(() => {
    dispatch(fetchMaps());
    dispatch(fetchHeroClasses());
    // eslint-disable-next-line
    }, []);

  const handleChangeMap = (
    _: React.SyntheticEvent<Element, Event>,
    newValue: { label: string } | null,
  ) => {
    newValue && dispatch(setSelectedMap(newValue));
  };

  const handleChangeClass = (
    _: React.SyntheticEvent<Element, Event>,
    newValue: { label: string } | null,
  ) => {
    newValue && dispatch(setSelectedHeroClass(newValue));
  };

  const handleSubmitChoice = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/picked');
  };

  return (
    <Box className='choice-wrapper'>
      <Container maxWidth='md' style={{ height: '100%' }}>
        <form className='choice-form' onSubmit={handleSubmitChoice}>
          <div className='logo-wrapper'>
            <img src={logoSrc} alt='' />
          </div>

          <Grid container className='choice-selects'>
            <Grid item xs={5} className='choice-maps'>
              <CustomAutocomplete
                options={mapList}
                loading={isFetchingMaps}
                value={selectedMap}
                label='Choose map'
                className='choice-maps-select'
                onChange={handleChangeMap}
              />
            </Grid>
            <Grid item xs={5} className='choice-hero-classes'>
              <CustomAutocomplete
                options={classList}
                loading={isFetchingHeroClasses}
                value={selectedClass}
                label='Choose hero class'
                className='choice-hero-classes-select'
                onChange={handleChangeClass}
              />
            </Grid>
          </Grid>

          <button
            type='submit'
            className={`choice-submit ${isDisabled ? 'choice-submit-disabled' : ''}`}
            disabled={isDisabled}
          />
        </form>
      </Container>
    </Box>
  );
};

export default Choice;
