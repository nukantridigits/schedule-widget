import moment from "moment";
import {MONTH_RU} from "../../utils/dates";
import {storeToComputed} from "./storeToComputed";

export const getDayHeaderContent = {
	mixins: [storeToComputed],
	methods: {
		getDayHeader:function ({date}) {
			let momentObject = moment(date);
			let month = momentObject.format('MMMM');

			momentObject.locale('ru');
			let dayNumber = momentObject.format('D');
			let day = momentObject.format('dddd');

			let contentVariants = this.isTouch ? ',&nbsp;' : '';
			let	content = `<div class="fc-col-header_day_title">
                    <div class="fc-col-header_day_title_top">
                        <div class="day-number">${dayNumber}&nbsp;</div>
                        <div class="month">${MONTH_RU[month]}${contentVariants}</div>
                    </div>
                    <div class="fc-col-header_day_title_bottom">
                        <div class="day">${day}</div>
                    </div>
                  </div>`;

			return {
				html: content
			}
		}
	}
}
