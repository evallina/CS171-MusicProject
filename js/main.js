

$.getJSON("http://api.songkick.com/api/3.0/events.json?location=clientip&apikey={ME5jCBPTyD3l4BW8}&jsoncallback=?",
    function(data){
        console.log(data);
// data is JSON response object
    });