var Calendar  =  require('tui-calendar')

//var Calendar = tui.Calendar;

var calendar = new Calendar('#calendar', {
    // template: templates,
    useCreationPopup: true,
    useDetailPopup: true,
    defaultView: 'week',
    taskView: true,
    template: {
        milestone: function(model) {
            return '<span class="calendar-font-icon ic-milestone-b"></span> <span style="background-color: ' + model.bgColor + '">' + model.title + '</span>';
        },
        allday: function(schedule) {
            return getTimeTemplate(schedule, true);
        },
        time: function(schedule) {
            return getTimeTemplate(schedule, false);
        }
    }
});

// event handlers
calendar.on({
    'clickMore': function(e) {
        console.log('clickMore', e);
    },
    'clickSchedule': function(e) {
        console.log('clickSchedule', e);
    },
    'clickDayname': function(date) {
        console.log('clickDayname', date);
    },
    'beforeCreateSchedule': function(e) {
        console.log('beforeCreateSchedule', e);
        saveNewSchedule(e);
    },
    'beforeUpdateSchedule': function(e) {
        var schedule = e.schedule;
        var changes = e.changes;

        console.log('beforeUpdateSchedule', e);

        if (changes && !changes.isAllDay && schedule.category === 'allday') {
            changes.category = 'time';
        }

        cal.updateSchedule(schedule.id, schedule.calendarId, changes);
        refreshScheduleVisibility();
    },
    'beforeDeleteSchedule': function(e) {
        console.log('beforeDeleteSchedule', e);
        cal.deleteSchedule(e.schedule.id, e.schedule.calendarId);
    },
    'afterRenderSchedule': function(e) {
        var schedule = e.schedule;
        // var element = cal.getElement(schedule.id, schedule.calendarId);
        // console.log('afterRenderSchedule', element);
    },
    'clickTimezonesCollapseBtn': function(timezonesCollapsed) {
        console.log('timezonesCollapsed', timezonesCollapsed);

        if (timezonesCollapsed) {
            cal.setTheme({
                'week.daygridLeft.width': '77px',
                'week.timegridLeft.width': '77px'
            });
        } else {
            cal.setTheme({
                'week.daygridLeft.width': '60px',
                'week.timegridLeft.width': '60px'
            });
        }

        return true;
    }
});
    /**
     * Get time template for time and all-day
     * @param {Schedule} schedule - schedule
     * @param {boolean} isAllDay - isAllDay or hasMultiDates
     * @returns {string}
     */
     function getTimeTemplate(schedule, isAllDay) {
        var html = [];
        var start = moment(schedule.start.toUTCString());
        if (!isAllDay) {
            html.push('<strong>' + start.format('HH:mm') + '</strong> ');
        }
        if (schedule.isPrivate) {
            html.push('<span class="calendar-font-icon ic-lock-b"></span>');
            html.push(' Private');
        } else {
            if (schedule.isReadOnly) {
                html.push('<span class="calendar-font-icon ic-readonly-b"></span>');
            } else if (schedule.recurrenceRule) {
                html.push('<span class="calendar-font-icon ic-repeat-b"></span>');
            } else if (schedule.attendees.length) {
                html.push('<span class="calendar-font-icon ic-user-b"></span>');
            } else if (schedule.location) {
                html.push('<span class="calendar-font-icon ic-location-b"></span>');
            }
            html.push(' ' + schedule.title);
        }

        return html.join('');
    }
module.exports = calendar;