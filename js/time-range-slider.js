/**
 * Created by Enol Vallina on 12/5/2016.
 */

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//TIMESTAMPS////////////////////////////////////////////////////////////////////////////////////////////////////
// Create a new date from a string, return as a timestamp.
function timestamp(str){
    return new Date(str).getTime();
}
var minDate;
var maxDate;
var dateValuesMap;
var dateValues;
var dateSlider;
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//SETUP/////////////////////////////////////////////////////////////////////////////////////////////////////////
$(document).ready(function () {
    dateSlider = document.getElementById('slider-date');

    noUiSlider.create(dateSlider, {
        // Create two timestamps to define a range.
        range: {
            min: timestamp('2017-1-1'),
            max: timestamp('2017-5-2')
        },

        // Steps of one week
        step: 7 * 24 * 60 * 60 * 1000,

        // Two more timestamps indicate the handle starting positions.
        start: [timestamp('2016'), timestamp('2020')],

        // No decimals
        /*
         format: wNumb({
         decimals: 0,
         })*/
    });
    dateValuesMap= [
        minDate,
        maxDate
    ];

    dateValues = [
        document.getElementById('event-start'),
        document.getElementById('event-end')
    ];

    dateSlider.noUiSlider.on('update', function( values, handle ) {
        dateValues[handle].innerHTML = formatDate(new Date(+values[handle]));
        dateValuesMap[handle]= formatDate2(new Date(+values[handle]));
        minDate=dateValuesMap[0];
        maxDate=dateValuesMap[1];

    });


});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//SLIDER CONTROL////////////////////////////////////////////////////////////////////////////////////////////////



////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//HELPER FUNCTIONS AND FORMATING ///////////////////////////////////////////////////////////////////////////////

// Create a list of day and monthnames.
var
    weekdays = [
        "Sunday", "Monday", "Tuesday",
        "Wednesday", "Thursday", "Friday",
        "Saturday"
    ],
    months = [
        "January", "February", "March",
        "April", "May", "June", "July",
        "August", "September", "October",
        "November", "December"
    ];

// Append a suffix to dates.
// Example: 23 => 23rd, 1 => 1st.
function nth (d) {
    if(d>3 && d<21) return 'th';
    switch (d % 10) {
        case 1:  return "st";
        case 2:  return "nd";
        case 3:  return "rd";
        default: return "th";
    }
}

// Create a string representation of the date.
function formatDate ( date ) {
    return weekdays[date.getDay()] + ", " +
        date.getDate() + nth(date.getDate()) + " " +
        months[date.getMonth()] + " " +
        date.getFullYear();
}
function formatDate2 ( date ) {
    return  date.getFullYear() +"-"+
            (date.getMonth()+1)  + "-" +
            date.getDate()
        ;
}