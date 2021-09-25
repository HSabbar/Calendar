var Calendar  =  require('tui-calendar')

//var Calendar = tui.Calendar;

var calendar = new Calendar('#calendar', {
    // template: templates,
    useCreationPopup: true,
    useDetailPopup: true,
    defaultView: 'week',
    taskView: false,
    template: {
        monthDayname: function(dayname) {
        return '<span class="calendar-week-dayname-name">' + dayname.label + '</span>';
        },
        time: function (schedule) {
            return getTimeTemplate(schedule, false);
        },
        'timegridDisplayTime': function (time) { /* sidebar */
        return datetime.leadingZero(time.hour, 2) + ':' + datetime.leadingZero(time.minutes, 2);
        }
        
    }
});

// event handlers
calendar.on({
    'clickSchedule': function(e) {
        console.log('clickSchedule', e);
        // e.schedule.title = e.title;
        // calendar.updateSchedule(e.schedule.id, e.schedule.calendarId, e.schedule);
    },
    'beforeCreateSchedule': function(e) {
        console.log('beforeCreateSchedule', e);
        console.log("hheeee");
        // open a creation popup
        console.log("ok ok ", e.start, "ok ok ", e.end);
        var schedule = {
            id: +new Date(),
            calendarId: '1',
            title: e.title,
            isAllDay: false,
            start: e.start,
            end: e.end,
            category:  'allday'
        };
        calendar.createSchedules([schedule]);

        


        // If you dont' want to show any popup, just use `e.guide.clearGuideElement()`

        // then close guide element(blue box from dragging or clicking days)
        // e.guide.clearGuideElement();
        // calendar.createSchedules([e]);
        console.log(calendar._controller.schedules.items);
    },
    'beforeUpdateSchedule': function(e) {
        console.log('beforeUpdateSchedule', e);
        // e.schedule.title = e.title;
        // e.schedule.start = e.start;
        // e.schedule.end = e.end;
        // calendar.updateSchedule(e.schedule.id, e.schedule.calendarId, e.schedule);

        var schedule = e.schedule;
        var changes = e.changes;

        calendar.updateSchedule(schedule.id, schedule.calendarId, changes);
    },
    'beforeDeleteSchedule': function(e) {
        console.log('beforeDeleteSchedule', e);
        calendar.deleteSchedule(e.schedule.id, e.schedule.calendarId);
    }
});

module.exports = calendar;