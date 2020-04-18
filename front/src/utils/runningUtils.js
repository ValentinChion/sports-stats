import moment from 'moment';
import globalUtils from './globalUtils';

/**
 * Utils to manipulate Running data
 */

const runningUtils = {
    sumReducerTimes: (timesArray, kms) =>
        timesArray.reduce((accTime, time, idx) => {
        if (timesArray.length === idx + 1 && !Number.isInteger(+kms)) {
            const lastKmValue = kms - Math.floor(kms);
            return +accTime + lastKmValue * +time;
        } else return +accTime + +time;
    }, 0),

    countKmsAndTime: (runningData) => {
        return {
        Kilomètres: runningData.sessions.reduce((accSes, session) => {
            return accSes + session.exercises.reduce((accEx, exercise) => accEx + +exercise.kms, 0);
        }, 0),
        Temps: globalUtils.formatDuration(runningData.sessions.reduce((accSes, session) => {
            return (
            accSes +
            session.exercises.reduce((accEx, exercise) => {
                return accEx + runningUtils.sumReducerTimes(exercise.kmsTimes, exercise.kms)}, 0)
            );
        }, 0))
        };
    },

    countKmsAndTimeByEx: (runningData) => {
        return runningData.sessions.reduce((accSes, session) => {
        session.exercises.reduce((accEx, exercise) => {
            if (!accSes.hasOwnProperty(exercise.name)) accSes[exercise.name] = 0;
            accSes[exercise.name] += +exercise.kms;
            return;
        }, {});
        return accSes;
        }, {});
    },
};

export default runningUtils;
