export const getEventIndexById = (state, eventId) => state.events.findIndex(event => event.id.toString() === eventId.toString())
/*
export const sortByScheduleEnd = (arr) => {
	arr.sort((a, b) => a.display_end > b.display_end ? 1 : -1);
}*/
