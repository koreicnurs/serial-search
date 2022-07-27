import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Autocomplete, TextField} from "@mui/material";
import {useHistory} from "react-router-dom";

const SearchSerials = () => {
    const [serial, setSerial] = useState([]);
    const [value, setValue] = useState('');

    const history = useHistory();

    const getSerial = async () => {
        // setLoading(true);
        try {

            const response = await axios(`http://api.tvmaze.com/search/shows?q=${value}`);
            const allNameSerial = response.data.map(r => {
                return {
                    serialName: r.show.name,
                    id: r.show.id
                }
            });
            setSerial(allNameSerial);
        } catch (e) {
            console.log(e);
        } finally {
            // setLoading(false);
            // console.log(allNameSerial);
        }
    };

    const onChangeInput = async (e) => {
        history.push(`/shows/${e.id}`)
    };

    const getValue = (e) => {
        setValue(e);
    };

    useEffect(() => {
        getSerial().catch();
    }, [getSerial, value])

    return (
        <>
            <Autocomplete
                disablePortal
                id="combo-box-demo"
                onChange={(e, value) => onChangeInput(value)}
                onInputChange={(e) => getValue(e.target.value)}
                options={serial}
                getOptionLabel={(option) => option.serialName}
                sx={{width: 300}}
                renderInput={(params) => <TextField {...params} label="Serial"/>}
            />
        </>
    );
};


export default SearchSerials;