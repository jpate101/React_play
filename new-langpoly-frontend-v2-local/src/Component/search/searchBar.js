import React, { useRef } from 'react'
import filterKeys from './filterByKeys'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import SearchIcon from '@mui/icons-material/Search'


const SearchBar = ({ pathKeys, setAllKeys }) => {

    const searchQuery = useRef()

    const handleFilterKeys = () => {
        const filtedKeys = filterKeys(pathKeys, searchQuery)
        setAllKeys(filtedKeys)
    }

    const handleClear = () => {
        searchQuery.current.value = ''
        setAllKeys(pathKeys)
    }

    return (
        <>
            <input
                ref={searchQuery}
                type="text"
                id="header-search"
                placeholder="Search Key-name"
            />

            <IconButton type="submit" sx={{ p: '10px' }} aria-label="search" onClick={handleFilterKeys}>
                <SearchIcon />
            </IconButton>
            <Button variant="text" size="small" onClick={handleClear}>clear</Button>
        </>
    )
}

export default SearchBar