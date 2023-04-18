import { ATTACKER_DETAILS_LOADING, ATTACKER_DETAILS_SUCCESS, ATTACKER_DETAILS_ERROR } from "../actionType";

const initialState = {
  attackerDetails: {
    isLoading: false,
    isError: false,
    data: []
  }
};

export const reducer = (state: any = initialState, action: any) => {
  const { type, payload } = action;

  switch (type) {
    case ATTACKER_DETAILS_LOADING:
      return {
        ...state,
        attackerDetails: {
          isLoading: true,
          isError: false,
          data: []
        }
      };

    case ATTACKER_DETAILS_SUCCESS:
      return {
        ...state,
        attackerDetails: {
          isLoading: false,
          isError: false,
          data: payload
        }
      };

    case ATTACKER_DETAILS_ERROR:
      return {
        ...state,
        attackerDetails: {
          isLoading: false,
          isError: true,
          data: []
        }
      };

    default:
      return state;
  }
};

