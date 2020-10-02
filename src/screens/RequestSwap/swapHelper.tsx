import { SelectItem } from '@ui-kitten/components';
import React from 'react';

//not sure where to put these two functions
//TODO re-file this somewhere else, or just put it into the SwapScreen? its only 9 lines of code
export const populateCandidates = (swapCandidates) =>
    swapCandidates.map((candidate, index) => (
        <SelectItem
            key={`${index}-${candidate.email}`}
            title={`${candidate.firstName} ${candidate.lastName}`}
        />
    ));

//TODO hook this up to real data eventually
export const populateTimes = (times) =>
    times.map((item, index) => <SelectItem key={index} title={item} />);
