var Calendar  =  require('tui-calendar')
const moment= require('moment') 

//var Calendar = tui.Calendar;

var calendar = new Calendar('#calendar', {
    // template: templates,
    timezone: {
        zones: [
            {
            timezoneName: 'Europe/Paris',
            displayLabel: 'GMT+02:00',
            tooltip: 'Paris'
            }
        ]
    },
    useCreationPopup: true,
    useDetailPopup: true,
    defaultView: 'week',
    scheduleView: true,
    taskView: false,
    
    template: {
        milestone: function(model) {
            return '<span class="calendar-font-icon ic-milestone-b"></span> <span style="background-color: ' + model.bgColor + '">' + model.title + '</span>';
        },
        allday: function(schedule) {
            return getTimeTemplate(schedule, true);
        },
        time: function(schedule) {
            return '<strong>' + moment(schedule.start.getTime()).format('HH:mm') + '</strong> ' + schedule.title;
        },
        
    }, 
    week: {
        daynames: ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'],
        startDayOfWeek: 1,
        narrowWeekend: true,
        hourStart: 7,
        hourEnd: 20,
        workweek: false,
        showTimezoneCollapseButton: false,
        timezonesCollapsed: false,
        narrowWeekend: false,
    },


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
        
        var schedule = {
            id: +new Date(),
            calendarId: '1',
            title: e.title,
            isAllDay: false,
            start: e.start,
            end: e.end,
            category:  'time',
            bgColor: "#"+ Math.floor(Math.random()*16777215).toString(16),
            location: e.location
        };
        calendar.createSchedules([schedule]);

        console.log("title", e.title, "start", e.start, "end", e.end);        


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