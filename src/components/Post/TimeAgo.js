import React from 'react';
import { parseISO, formatDistanceToNow } from 'date-fns';

const TimeAgo = ({timePosted}) => {
    let timeAgo = '';
    if(timePosted) {
        const date = parseISO(timePosted);
        const timePeriod = formatDistanceToNow(date);
        timeAgo = `${timePeriod} ago`
    }

    return (
        <div className='mb-2'>
            <span title={timePosted}>
                <i>🕒 {timeAgo}</i>
            </span>
        </div>
    );
}

export default TimeAgo;
