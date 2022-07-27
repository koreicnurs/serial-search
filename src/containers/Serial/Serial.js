import React, {useEffect, useReducer} from 'react';
import {useRouteMatch} from "react-router-dom";
import axios from "axios";

const initalState = {
    serial: [],
    loading: false,
};

export const FETCH_TODO_REQUEST = 'FETCH_TODO_REQUEST';
export const FETCH_TODO_SUCCESS = 'FETCH_TODO_SUCCESS';
export const FETCH_TODO_FAILURE = 'FETCH_TODO_FAILURE';

export const fetchTodoRequest = () => ({type: FETCH_TODO_REQUEST});
export const fetchTodoSuccess = value => ({type: FETCH_TODO_SUCCESS, payload: value});
export const fetchTodoFailure = () => ({type: FETCH_TODO_FAILURE});


const reducer = (state, action) => {
    switch (action.type) {
        case FETCH_TODO_REQUEST:
            return {...state, loading: true};
        case FETCH_TODO_SUCCESS:
            return {...state, serial: action.payload, loading: false};
        case FETCH_TODO_FAILURE:
            return {...state};
        default:
            return state;
    }
};

const Serial = () => {

    const [state, dispatch] = useReducer(reducer, initalState);
    const match = useRouteMatch();

    useEffect(() => {
        const fetchTodo = async () => {
            dispatch(fetchTodoRequest());

            try {
                const response = await axios(`http://api.tvmaze.com/shows/${match.params.id}`);

                if (response.data) {
                    dispatch(fetchTodoSuccess(response.data));
                } else {
                    dispatch(fetchTodoSuccess(null));
                }

            } catch (e) {
                dispatch(fetchTodoFailure());
            }
        };
        fetchTodo().catch();
    }, [match.params.id])

    return (
        <>
            <p>{state.serial.name}</p>
        </>
    );
};

export default Serial;