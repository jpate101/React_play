const filterKeys = (pathKeys, searchQuery) => {
    const query = searchQuery?.current?.value
    if (!query) {
        return pathKeys;
    }
    const filteredKeys = pathKeys.filter((keys)=>{
        return keys.includes(query);
    })
    return filteredKeys
};

export default filterKeys