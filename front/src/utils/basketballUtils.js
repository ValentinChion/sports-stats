import arrayUtils from './arrayUtils';

const basketBallUtils = {
    countTime: (basketBallData) => {
        if (!basketBallData.sessions.length) return 0
        else return basketBallData.sessions.map(session => session.duration).reduce(arrayUtils.sumReducer)
    },
    averageIntensity: (basketBallData) => {
        if (!basketBallData.sessions.length) return 0
        const length = basketBallData.sessions.length;
        return basketBallData.sessions.map(session => session.intensity).reduce(arrayUtils.sumReducer) / length
    }
}

export default basketBallUtils;
