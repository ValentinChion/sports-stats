/**
 * Utils that manipulate strings
 */

const stringUtils = {
    /**
     * Capitalize the first letter of input string
     * @param {string} value the string to capitalize
     * @returns {string} the string capitalized
     */
    capitalize: (value) => {
        return value.charAt(0).toUpperCase() + value.slice(1)
    }
}

export default stringUtils