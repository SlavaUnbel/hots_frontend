import { Grid, Container, Button } from '@mui/material';
import React, { useEffect } from 'react';
import { mapsStateSelector, hasNoSelectedMapSelector } from '../../redux/selectors/mapsSelector';
import { fetchMaps, setSelectedMap } from '../../redux/reducers/mapsReducer';
import { useAppSelector, useAppDispatch } from '../../store';
import CustomAutocomplete from '../../utils/CustomAutocomplete';
import { useNavigate } from 'react-router-dom';
import {
    hasNoSelectedHeroClassSelector,
    heroClassesStateSelector
} from '../../redux/selectors/heroClassesSelector';
import { fetchHeroClasses, setSelectedHeroClass } from '../../redux/reducers/heroClassesReducer';

const Choice: React.FC = () => {
    const dispatch = useAppDispatch();
    const {
        maps: { mapList, isFetching: isFetchingMaps },
        selectedMap
    } = useAppSelector(mapsStateSelector);
    const hasNoMapSelected = useAppSelector(hasNoSelectedMapSelector);
    const {
        heroClasses: { classList, isFetching: isFetchingHeroClasses },
        selectedClass
    } = useAppSelector(heroClassesStateSelector);
    const hasNoHeroClassSelected = useAppSelector(hasNoSelectedHeroClassSelector);
    const navigate = useNavigate();
    const isDisabled = hasNoMapSelected || hasNoHeroClassSelected;

    useEffect(() => {
        dispatch(fetchMaps());
        dispatch(fetchHeroClasses());
    }, [dispatch]);

    const handleChangeMap = (
        _: React.SyntheticEvent<Element, Event>,
        newValue: { label: string } | null
    ) => {
        newValue && dispatch(setSelectedMap(newValue));
    };

    const handleChangeClass = (
        _: React.SyntheticEvent<Element, Event>,
        newValue: { label: string } | null
    ) => {
        newValue && dispatch(setSelectedHeroClass(newValue));
    };

    const handleSubmitChoice = (e: React.FormEvent) => {
        e.preventDefault();
        navigate('/picked');
    };

    return (
        <Container maxWidth="md">
            <form className="choice-wrapper" onSubmit={handleSubmitChoice}>
                <div className="logo-wrapper">
                    <img alt="" />
                </div>

                <Grid container className="choice-selects">
                    <Grid item xs={5} className="choice-maps">
                        <CustomAutocomplete
                            options={mapList}
                            loading={isFetchingMaps}
                            value={selectedMap}
                            label="Choose map"
                            onChange={handleChangeMap}
                        />
                    </Grid>
                    <Grid item xs={5} className="choice-hero-classes">
                        <CustomAutocomplete
                            options={classList}
                            loading={isFetchingHeroClasses}
                            value={selectedClass}
                            label="Choose hero class"
                            onChange={handleChangeClass}
                        />
                    </Grid>
                </Grid>

                <div className="choice-submit">
                    <Button type="submit" variant="contained" fullWidth disabled={isDisabled}>
                        {isFetchingMaps ? <div className="dot-pulse" /> : 'Submit'}
                    </Button>
                </div>
            </form>
        </Container>
    );
};

export default Choice;
