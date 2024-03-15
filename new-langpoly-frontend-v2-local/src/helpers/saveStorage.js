import { localStorageKey, localFilesArr, localKeys, localSavePaths } from 'src/constant'
import { isEmpty } from 'lodash';

export const fetchFromStorage = key => {
	return JSON?.parse(localStorage?.getItem(key))
}

export const saveToStorage = (key,value) =>{
	localStorage.setItem(key,JSON?.stringify(value))
}

export const removeFromStorage = (key) => {
	localStorage.removeItem(key)
}


export const saveAllDataToLocal = ({ fileStorage, allFilesName, allKeys, savePaths }) => {
	if(!isEmpty(fileStorage) && !isEmpty(allFilesName) && !isEmpty(allKeys) && !isEmpty(savePaths)) {
		removeFromStorage(localStorageKey);
		removeFromStorage(localFilesArr);
		removeFromStorage(localKeys);
		removeFromStorage(localSavePaths);
		saveToStorage(localStorageKey,fileStorage);
		saveToStorage(localFilesArr, allFilesName);
		saveToStorage(localKeys, allKeys);
		saveToStorage(localSavePaths, savePaths);
	}
}