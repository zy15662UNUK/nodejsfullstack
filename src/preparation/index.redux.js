const ADD = "plus";
const MINUS = "minus";

export function reducerCounter(state = 0, action) {
    switch (action.type) {
        case ADD:
            return state + 1;
        case MINUS:
            return state - 1;
        default:
            return 10;
    }
}

// action creater
export function add() {
    return {type: ADD};
}

export function minus() {
    return {type: MINUS};
}

export function addAsync() {
    return (dispatch) => {
        setTimeout(() => {
            dispatch({type: ADD});
        }, 2000);
    };
}
