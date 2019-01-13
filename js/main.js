//cd/projects/apache24/bin> httpd.exe
//http://localhost:81/announcements_v3/index.html

var announcements = [];
$("document").ready(function () {
    $("#announcement-frame").hide();
    // $("ann-pages").hide();
});

function annLoad() {
    var ifrm = $("#announcement-frame").contents();
    var aud = ifrm.find(".aud");
    for (i = 0; i < aud.length; i++) {
        var p = $(aud[i]).find("p");
        for (j = 0; j < p.length; j++) {
            var h = $(p[j]).html();
            if (h !== "None today") {

                var title = $(p[j]).find("b").html();
                var desc = $(p[j]).html().split("<br>")[1];
                var ann = {
                    title: title,
                    desc: desc
                }
                announcements.push(ann);
            }
        }
    };

    displayAnn();
}

function displayAnn() {
    var pageContainer = $("#ann-pages");
    announcements.forEach(
        function (ann) {
            var title = ann.title;
            var desc = ann.desc;
            var ele = "";
            if (title.length <= 57) {
                ele = "<b><h1 style='font-size:100px;width:1400px;height:240px;word-wrap:break-word;z-index:100;'>" + title + "</h1></b><br><p style='font-size:93px;width:1900px;word-wrap:break-word;'>" + desc + "</p>";
            } else if (title.length <= 100) {
                ele = "<b><h1 style='font-size:75px;width:1400px;height:240px;word-wrap:break-word;z-index:100;'>" + title + "</h1></b><br><p style='font-size:93px;width:1900px;word-wrap:break-word;'>" + desc + "</p>";
            }
            pageContainer.append("<div style='display:block;position:absolute;'>" + ele + "</div>");
        }
    );

    $("#ann-pages > div:gt(0)").hide();

    setInterval(function () {
        $('#ann-pages > div:first')
            .fadeOut(2000)
            .next()
            .fadeIn(2000)
            .end()
            .appendTo("#ann-pages");
    }, 15000);
    period();
}

//outputs which period it is (or before/after school)
function period() {
    // Date Object
    var d = new Date();
    var h = d.getHours(); // 0 - 23
    var min = d.getMinutes(); // 0 - 59
    var ms = d.getMilliseconds(); // 0 - 999
    var s = d.getSeconds();
    var weekday = d.getDay(); // 0 - 6
    var weekdays = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
    var month = d.getMonth(); // 0 - 11
    var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"]
    var day = d.getDate(); // 1 - 31
    var y = d.getFullYear(); // 4 digit #

    periods = periodReturn();
    var periodStr = "";
    for (var i = 0; i < periods.length; i++) {
        var beginDateString = weekdays[weekday] + " " + months[month] + " " + day + " " + y + " " + periods[i][0].toString() + ":" + formatMin(periods[i][1]) + ":00 GMT-0400 (EDT)";
        var endDateString = weekdays[weekday] + " " + months[month] + " " + day + " " + y + " " + periods[i][2].toString() + ":" + formatMin(periods[i][3]) + ":00 GMT-0400 (EDT)";
        var beginParse = Date.parse(beginDateString)
        var endParse = Date.parse(endDateString)
        if (i == periods.length - 1) {
            // add a day of ms
            endParse = endParse + 86400000
        }

        //converts time to ms format
        if (beginParse <= Date.parse(d) && endParse >= Date.parse(d)) {
            periodStr = periods[i][4]
            // if after 6pm, weekend, or summer --> turn site "off"
            if (periodStr == "offlineMode" || weekdays[weekday] == "Sun" || weekdays[weekday] == "Sat" || months[month] == "Jul" || months[month] == "Aug") {
                offlineMode()
            }
            break
        }
    }

    //formatting hour
    var am = " AM "
    if (h > 12) {
        am = " PM "
        h -= 12;
    }

    // output
    var dateString = months[month] + " " + day.toString() + ", " + y.toString();
    $("#datepicker").html(dateString + "<br>" + h.toString() + ":" + formatMin(min) + am + periodStr);
}

function offlineMode() {
    $("*").css("background-color", "black");
    $("div").css("display", "none");
}

function formatMin(min) {
    var m = ""
    //formatting min
    if (min < 10) {
        m = "0" + min.toString();
    } else {
        m = min.toString();
    }
    return m
}

//debugger
function dbg(msg) {
    console.log(msg);
}