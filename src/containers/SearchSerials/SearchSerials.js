import React, {useEffect} from 'react';
import axios from "axios";
import {Autocomplete, TextField} from "@mui/material";
import {useHistory} from "react-router-dom";
import {useReducer} from "react";
import './SearchSerials.css';

const initialState = {
    serials: [],
    value: '',
    loading: false,
};

export const FETCH_TODO_REQUEST = 'FETCH_TODO_REQUEST';
export const FETCH_TODO_SUCCESS = 'FETCH_TODO_SUCCESS';
export const FETCH_TODO_FAILURE = 'FETCH_TODO_FAILURE';
export const FETCH_TODO_SUCCESS_VALUE = 'FETCH_TODO_SUCCESS_VALUE';

export const fetchTodoRequest = () => ({type: FETCH_TODO_REQUEST});
export const fetchTodoSuccess = value => ({type: FETCH_TODO_SUCCESS, payload: value});
export const fetchTodoSuccessValue = value => ({type: FETCH_TODO_SUCCESS_VALUE, payload: value});
export const fetchTodoFailure = () => ({type: FETCH_TODO_FAILURE});


const reducer = (state, action) => {
    switch (action.type) {
        case FETCH_TODO_REQUEST:
            return {...state, loading: true};
        case FETCH_TODO_SUCCESS:
            return {...state, serials: action.payload, loading: false};
        case FETCH_TODO_SUCCESS_VALUE:
            return {...state, value: action.payload, loading: false};
        case FETCH_TODO_FAILURE:
            return {...state};
        default:
            return state;
    }
};

const SearchSerials = () => {

    const [state, dispatch] = useReducer(reducer, initialState);

    const history = useHistory();

    const getValue = e => {
        if (e !== null) {
            dispatch(fetchTodoSuccessValue(e));
        }
    };

    const onChangeInput = e => {
        if (e !== null) {
            history.push(`/shows/${e.id}`)
        }
    };

    useEffect(() => {
        const fetchTodo = async () => {
            dispatch(fetchTodoRequest());
            if (state.value) {
                if (state.value.length >= 3) {
                    try {
                        const response = await axios(`http://api.tvmaze.com/search/shows?q=${state.value}`);
                        const allNameSerial = response.data.map(r => {
                            return {
                                serialName: r.show.name,
                                id: r.show.id
                            }
                        });

                        if (response.data) {
                            dispatch(fetchTodoSuccess(allNameSerial));
                        } else {
                            dispatch(fetchTodoSuccess(null));
                        }

                    } catch (e) {
                        dispatch(fetchTodoFailure());
                    }
                }
            }

        };
        fetchTodo().catch();
    }, [state.value])

    return (
        <>
            <Autocomplete
                disablePortal
                id="combo-box-demo"
                onChange={(e, value) => onChangeInput(value)}
                onInputChange={(e) => getValue(e.target.value)}
                options={state.serials}
                getOptionLabel={(option) => option.serialName}
                sx={{width: 300}}
                renderInput={(params) => <TextField {...params} label="Serial"/>}
            />
        </>
    );
};


export default SearchSerials;