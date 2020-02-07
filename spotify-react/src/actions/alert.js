//SELECTOR
export const getPopover = state => state.playlistGenerator.popover;

// ALERT ACTIONS
export const toggleAlert = alert => dispatch => {
    dispatch(toggleAlertSuccess(!alert));
}

export function toggleAlertSuccess(alert) {
    return {
        type: "TOGGLE_ALERT",
        payload: alert
    }
};

export const togglePopover = event => (dispatch, getState) => {
    const popover = getPopover(getState());
    console.log("TOGGLING POPOVER-- EVENT: ", event);
    console.log("TOGGLING POPOVER-- POPOVER: ", popover);
    dispatch(togglePopoverSuccess(event, popover));
}

export function togglePopoverSuccess(event, popover) {
    if (event) {
        return {
            type: "TOGGLE_POPOVER",
            payload: {
                popover: !popover,
                anchorEl: event.target
            }
        }
    } else {
        return {
            type: "TOGGLE_POPOVER",
            payload: {
                popover: !popover,
                anchorEl: null
            }
        }
    }
};
