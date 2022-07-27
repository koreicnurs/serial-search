import React, {useEffect, useReducer} from 'react';
import {useRouteMatch} from "react-router-dom";
import axios from "axios";
import Spinner from "../../UI/Spinner/Spinner";
import './Serial.css';

const initialState = {
    serial: null,
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

    const [state, dispatch] = useReducer(reducer, initialState);
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

    return state.loading ? (<Spinner/>) : state.serial && (
        <div className='serial'>
            <div className='serial-block-img'>
                <img src={state.serial.image.medium} alt={state.serial.name}></img>
            </div>
            <div className='serial-block-left'>
                <p>{state.serial.name}</p>
                <p>Run time: {state.serial.runtime}</p>
                <p>Premiere date: {state.serial.premiered}</p>
                <div className='genres'>Genres:
                    {state.serial.genres.map(g => {
                        return <p key={g}>{g}</p>
                    })}
                </div>
                <p className='description'>Description: {state.serial.summary.replace(/[<p>/]/g, '')}</p>
            </div>
        </div>
    );
};

export default Serial;