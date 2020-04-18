/**
 * Utils to manipulate Weight Training data
 */
import moment from 'moment';

const weightTrainingUtils = {
    count: (weightTrainingData) => {
        const countRepByEx = (accumulator, current) => {
            current = current.exercises.reduce((accTraining, curTraining) => {
                const repCount = curTraining.training.reduce(
                    (accRep, curRep) => +curRep + +accRep
                );
                if (accTraining.hasOwnProperty(curTraining.name)) {
                    accTraining[curTraining.name] += repCount;
                    return accTraining;
                } else {
                    return {
                        ...accTraining,
                        [curTraining.name]: repCount
                    };
                }
            }, {});

            if (Object.keys(accumulator).length !== 0) {
                for (const exName in current) {
                    if (current.hasOwnProperty(exName)) {
                        const el = current[exName];
                        if (accumulator.hasOwnProperty(exName)) {
                            accumulator[exName] += el;
                        } else {
                            accumulator = {
                                ...accumulator,
                                [exName]: el
                            };
                        }
                    }
                }
                return accumulator;
            } else return current;
        };

        let count = weightTrainingData.sessions.reduce(countRepByEx, {});
        weightTrainingData.exercises.map((exercise) => {
            if (!count.hasOwnProperty(exercise.name)) {
                count[exercise.name] = 0;
            } else {
                if (exercise.type === "Temps") {
                    count[exercise.name] = moment.utc(moment.duration(count[exercise.name], "seconds").asMilliseconds()).format("HH:mm:ss");
                }
            }
            return "";
        });
        return count
    }
};

export default weightTrainingUtils;
