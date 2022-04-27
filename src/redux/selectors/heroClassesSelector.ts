import { ApplicationState } from '../rootReducer';
import { createSelector } from '@reduxjs/toolkit';

export const heroClassesStateSelector = (state: ApplicationState) => {
    const { heroClasses } = state;

    return heroClasses;
};

export const hasNoSelectedHeroClassSelector = createSelector(heroClassesStateSelector, (maps) => {
    const {
        selectedClass: { label }
    } = maps;

    return !label;
});
