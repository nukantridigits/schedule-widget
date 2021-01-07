const controllerUrl = `schedule-fitbase-widget`;

export const getEventsUrl = ({start, end, filter, apiUrl}) => {
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
export const getActiveEventUrl = ({eventId, apiUrl}) => {
	return `${apiUrl}/${controllerUrl}/get-event-info?eventId=${eventId}`;
}

export const getRegistrationRequestUrl = ({eventId, phoneNumber, clubId, apiUrl}) => {
	return `${apiUrl}/${controllerUrl}/registration-request?eventId=${eventId}&phoneNumber=${phoneNumber}&clubId=${clubId}`;
}

export const getClubFilterOptionsUrl = ({apiUrl}) => {
	return `${apiUrl}/${controllerUrl}/get-club-filter-options`;
}

export const getFilterOptionsUrl = ({dateStart, viewName, clubId, apiUrl}) => {
	return `${apiUrl}/${controllerUrl}/get-filters?viewName=${viewName}&dateStart=${dateStart}&clubId=${clubId}`;
}

export const getScheduleNextWeekUrl = ({apiUrl, clubId}) => {
	return `${apiUrl}/${controllerUrl}/get-last-schedule?clubId=${clubId}`;
}

export const getPhoneMaskUrl = ({apiUrl}) => {
	return `${apiUrl}/${controllerUrl}/get-phone-mask-setting`;
}
