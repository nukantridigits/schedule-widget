const controllerUrl = `schedule-fitbase-widget`;

export const getEventsUrl = (payload) => {
	const {start, end, filter, apiUrl} = payload;
	const {
		clubFilter, trainerFilter, scheduleTemplateFilter, placeFilter,
		branchFilter, onlineFilter, registrationFilter, payFilter
	} = filter;

	let url = `${apiUrl}/${controllerUrl}/get-events?&start=${start}&end=${end}`;

	url = clubFilter ? `${url}&clubId=${clubFilter}` : url;

	if (trainerFilter.length) {
		url = `${url}&trainer=${JSON.stringify(trainerFilter)}`;
	}

	if (scheduleTemplateFilter.length) {
		url = `${url}&scheduleTemplate=${JSON.stringify(scheduleTemplateFilter)}`;
	}

	if (placeFilter.length) {
		url = `${url}&place=${JSON.stringify(placeFilter)}`;
	}

	if (branchFilter.length) {
		url = `${url}&branch=${JSON.stringify(branchFilter)}`;
	}

	url = onlineFilter ? `${url}&online=${onlineFilter}` : url;
	url = registrationFilter ? `${url}&registration=${registrationFilter}` : url;
	url = payFilter ? `${url}&pay=${payFilter}` : url;

	return url;
}
export const getActiveEventUrl = (payload) => {
	const {eventId, apiUrl} = payload;
	return `${apiUrl}/${controllerUrl}/get-event-info?eventId=${eventId}`;
}

export const getRegistrationRequestUrl = (payload) => {
	const {eventId, phoneNumber, clubId, apiUrl} = payload;
	return `${apiUrl}/${controllerUrl}/registration-request?eventId=${eventId}&phoneNumber=${phoneNumber}&clubId=${clubId}`;
}

export const getClubFilterOptionsUrl = (payload) => {
	const {apiUrl} = payload;
	return `${apiUrl}/${controllerUrl}/get-club-filter-options`;
}

export const getFilterOptionsUrl = (payload) => {
	const {dateStart, viewName, clubId, apiUrl} = payload;
	return `${apiUrl}/${controllerUrl}/get-filters?viewName=${viewName}&dateStart=${dateStart}&clubId=${clubId}`;
}

export const getScheduleNextWeekUrl = (payload) => {
	const {apiUrl, clubId} = payload;
	return `${apiUrl}/${controllerUrl}/get-last-schedule?clubId=${clubId}`;
}

export const getPhoneMaskUrl = (payload) => {
	const {apiUrl} = payload;
	return `${apiUrl}/${controllerUrl}/get-phone-mask-setting`;
}
