import { Dispatch, AnyAction } from 'redux';
import { fetchAttackersData } from '../../utils/api';

import { ATTACKER_DETAILS_ERROR, ATTACKER_DETAILS_LOADING, ATTACKER_DETAILS_SUCCESS } from '../actionType';


  export const getAttackerData = () => {
    return async (dispatch: Dispatch<AnyAction>) => {
      dispatch({ type: ATTACKER_DETAILS_LOADING });
  
      try {
        const response = await fetchAttackersData();
        dispatch({ type: ATTACKER_DETAILS_SUCCESS, payload: response });
      } catch (error) {
        dispatch({ type: ATTACKER_DETAILS_ERROR });
      }
    };
  };