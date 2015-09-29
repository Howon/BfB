$('#parseButton').click(function() { 
    console.log("what")
    var ical = $.icalendar.parse($('#parseInput').val()); 
    $('#parseOutput').val($.toJSON(ical, true)); 
});