//STEPPER ACTIONS
export const updateStep = (step, next) => dispatch => {
    if (step === 3){dispatch(updateStepSuccess(0));}
    else {
        if (next) { dispatch(updateStepSuccess(step + 1)); }
        else { dispatch(updateStepSuccess(step - 1)); }
    }
};

export function updateStepSuccess (step) {
    return {
        type: "UPDATE_ACTIVE_STEP",
        payload: step
    }
}