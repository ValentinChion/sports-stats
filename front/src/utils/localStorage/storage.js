/**
 * Contains different type of functions to query the local storage
 * In the future, we may use a server-side data
 */

const originalSetItem = localStorage.setItem;
localStorage.setItem = function(key, value) {
    var event = new Event('storageSet');
    event.value = value;
    event.key = key;
    document.dispatchEvent(event);

    originalSetItem.apply(this, arguments);
}

const ls = localStorage;
const setItem = (objectKey, data) => ls.setItem(objectKey, JSON.stringify(data));
const getItem = (objectKey) => JSON.parse(ls.getItem(objectKey));
const idsChecker = (itemsContainer, ids) => {
    return ids.some((id) => {
        id = +id;
        if(isNaN(id) || !Number.isInteger(id)) return true
        if (id > itemsContainer.autoIncrement) return true 
        return false;
    })
}

const storageHandler = {
    /**
     * Set some Data in Local Storage
     * Ids are auto-increment, and cannot be inputed.
     * @param {string} objectKey key of data. Will be used to get it later.
     * @param {Object} data JSON object to store in local storage
     * @param {string} [id] By default, data will not be erased. If you want to replace it, put id of data here.
     * 
     * @returns {(boolean|string)} True if succeeded, False if not. Will try to find why and send you a string in that case. 
     */
    set: (objectKey, data, id) => {
        if (objectKey && typeof objectKey === "string") {
            let dataType;
            let dataHasId = false;
            // First, let's check the data
            if (typeof data === "object") {
                if (Array.isArray(data)) {
                    dataType = "array";
                    data = {
                        id: 1,
                        value: data
                    }
                } else {
                    dataType = "object";
                    if (data.hasOwnProperty("id")) {
                        dataHasId = true
                    } else {
                        data = {
                            id: 1,
                            ...data
                        }
                    }
                }
            } else if (typeof data === "number" || typeof data === "string") {
                dataType = typeof data;
                data = {
                    id: 1,
                    value: data
                }
            } else if (typeof data === "undefined" || typeof data === "function") {
                return 'You should not try to insert undefined or function objects in local Storage.'
            }

            // New key to insert
            if (!ls.hasOwnProperty(objectKey)) {
                if(id) return "An id is entered but objectKey does not exist !\n You should create the object first before trying to replace by id."
                data = {
                    autoIncrement: 1,
                    values: [data]
                }
                setItem(objectKey, data);
                return true;
            // Add or replace inside a key
            } else {
                let datas = getItem(objectKey);
                // Replace with id
                if (id) {
                    id = +id;
                    if(isNaN(id) || !Number.isInteger(id)) return "Id could not be read. Note that only integers can be used."
                    if (id > datas.autoIncrement) return "Id does not exist."
                    let isIdFound = false;
                    for (let i = 0; i < datas.values.length; i++) {
                        const element = datas.values[i];
                        if (element.id === id) {
                            data.id = id
                            if (data.hasOwnProperty("value") !== datas.values[i].hasOwnProperty("value") || (data.hasOwnProperty("value") && dataType !== typeof datas.values[i].value)) {
                                return "You are trying to replace object without the same type, you should not."
                            }
                            datas.values[i] = data;
                            isIdFound = true;
                            break;
                        }
                    };
                    if (!isIdFound) return "Id does not exist."
                    setItem(objectKey, datas);
                    return true
                } else {
                    // If an id is provided inside data, we replace id found.
                    if (dataHasId) {
                        id = data.id
                        let idxData;
                        let replaceData = datas.values.filter((item, idx) => {
                            if (id === item.id) {
                                idxData = idx;
                                return true
                            } return false
                        })
                        if (replaceData.length !== 1) return "There is none or multiple objects with id provided inside the object."
                        datas.values[idxData] = data;
                        setItem(objectKey, datas);
                    } else {
                        // Add inside a key.
                        datas.autoIncrement++;
                        data.id = datas.autoIncrement;
                        datas.values.push(data);
                        setItem(objectKey, datas);
                    }
                    return true
                }
            }
        } else return "ObjectKey is not a string or is empty."
    },

    /**
     * Retrieve data from Local Storage
     * @param {string} objectKey key of data. Must be the one used during setData.
     * @param {(string|number|string[]|number[])} [ids] If empty, will return all objects that it can found. Otherwise, it will try to find based on this parameter.
     * 
     * @returns {(Object|string)} If string, an error occurred. If it could not find any data, JSON will be empty.
     */
    get: (objectKey, ids) => {
        if (ls.hasOwnProperty(objectKey)) {
            const loopItems = (id, items) => {
                for (let i = 0; i < items.length; i++) {
                    const item = items[i];
                    if (id === item.id) {
                        return item
                    }
                }
                return undefined;
            }
            let itemsContainer = getItem(objectKey);
            if (ids) {
                let result;
                if (Array.isArray(ids)) {
                    if (idsChecker(itemsContainer, ids)) return "Multiple ids provided: One of them is a syntax error.";
                    result = [];
                    ids.forEach(id => {
                        const tempResult = loopItems(id, itemsContainer.values);
                        if (!tempResult) return "Multiple ids provided: One of them could not be found.";
                        result.push(tempResult);
                    })
                } else {
                    ids = +ids;
                    if(isNaN(ids) || !Number.isInteger(ids)) return "Single id provided: It is not an integer."
                    if (ids > itemsContainer.autoIncrement) return "Single id provided: Could not be found."
                    result = loopItems(ids, itemsContainer.values);
                    if (!result) return "Single id provided: Could not be found";
                }
                return result;
            } else return itemsContainer.values;
        } else return "ObjectKey does not exist in storage !"
    },

    /**
     * Remove data from Local Storage.
     * @param {string} objectKey key of data. Must be the one used during setData.
     * @param {(string|number|string[]|number[])} [ids] If empty, will return all objects that it can found. Otherwise, it will try to find based on this parameter.
     * 
     * @returns {boolean|string} True if succeded, False if not. Some errors are catched and returned.
     */
    delete: (objectKey, ids) => {
        if (ls.hasOwnProperty(objectKey)) {
            let itemsContainer = getItem(objectKey); 
            if (ids) {
                if (!Array.isArray(ids)) ids = [ids]; 
                if (idsChecker(itemsContainer, ids)) return "One of the ids provided could not be found.";
                else {
                    let newValues = [];
                    let deletedValues = [];
                    itemsContainer.values.forEach(item => {
                        if (!ids.includes(item.id)) newValues.push(item);
                        else deletedValues.push(item);
                    })
                    itemsContainer.values = newValues;
                    setItem(objectKey, itemsContainer);
                    return deletedValues;
                }
            } else {
                ls.removeItem(objectKey);
                return itemsContainer;
            }
        } return "ObjectKey does not exist in storage !"
    },

    /**
     * Checks if the passing parameter is a string, if it is, returns true, else false.
     * All the functions above return string if any error occurred.
     * @param {} response the return object from one of the function of this local storage util.
     * @returns {boolean}
     */
    isError: (response) => {
        return typeof response === "string";
    },

    /**
     * Check if a key exists or not in storage
     * @param {string} objectKey the value of the key to check
     * 
     * @returns {boolean}
     */
    exists: (objectKey) => {
        return ls.hasOwnProperty(objectKey);
    }
};

export default storageHandler;