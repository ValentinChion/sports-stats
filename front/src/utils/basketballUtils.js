import arrayUtils from './arrayUtils';

const basketBallUtils = {
    countTime: (basketBallData) => basketBallData.sessions.map(session => session.duration).reduce(arrayUtils.sumReducer),
    averageIntensity: (basketBallData) => {
        const length = basketBallData.sessions.length;
        return basketBallData.sessions.map(session => session.intensity).reduce(arrayUtils.sumReducer) / length
    }
}

export default basketBallUtils;
