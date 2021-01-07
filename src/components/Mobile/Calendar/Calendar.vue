<template>
    <div class="calendar_outer_wrapper">
        <div :class="['calendar', 'hide']" ref="calendarWrapper">
            <FullCalendar v-if="filter"
                          class="full-calendar"
                          :options="config"
                          ref="calendar"
            >
                <template #eventContent="{event}">
                    <Event :event="event" :domain="domain" @openBookingModal="openBookingModal" />
                </template>
            </FullCalendar>
           <NoEventsMessage/>
        </div>
    </div>
</template>
<script>
import Calendar from "../../Calendar";
import Event from './Event';
import ruLocale from "@fullcalendar/core/locales/ru";
import dayGridPlugin from "@fullcalendar/daygrid";
import {eventBus} from "../../../main";
import NoEventsMessage from "../../NoEventsMessage";
export default {
    name: "Calendar",
    components: {
        NoEventsMessage,
        Event
    },
    extends: Calendar,
    created() {
        eventBus.$on('gotToDate', ({date})=> {
            const calendar = this.getCalendar();
            this.setTimeEdges(date);
            calendar.gotoDate(date);
        });
    },
    computed: {
        configOptions() {
            return {
                events: this.events,
                eventOrder: 'startTimestamp',
                locale: ruLocale,
                slotEventOverlap: false,
                allDaySlot: false,
                initialDate: this.start,
                nowIndicator: false,
                initialView: 'dayGridDay',
                plugins: [dayGridPlugin],
                headerToolbar: {
                    left: false,
                    center: false,
                    right: false,
                    title: false
                },
            }
        },
    },
}
</script>
