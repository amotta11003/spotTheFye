import React from 'react';
import RegularButton from '../CustomButton';

const timeRanges = ['shortterm', 'mediumterm', 'longterm'];
const labels = {
    'shortterm': 'Past Month',
    'mediumterm': 'Past 6 Months',
    'longterm': 'All Time'
}

const TimeRangeButton = ({
    onSelect
}) => (
    <div>
        {timeRanges.map(timeRange => (
            <RegularButton key={`${timeRange}-artist`} variant="contained" size='sm' color="warning" onClick={() => onSelect(timeRange)}>
            {labels[timeRange]}
            </RegularButton>
        ))}
    </div>
);

export default TimeRangeButton;

