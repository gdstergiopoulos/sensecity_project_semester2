$("#myBtn1").click(function() {
    mixedChart.destroy();
    doug_Chart.destroy();

    var data1 = [];
    var data2 = [];
    var issues = [];

    var gar_conf = 0;
    var light_conf = 0;
    var plum_conf = 0;
    var prot_conf = 0;
    var road_conf = 0;
    var green_conf = 0;

    var gar_res = 0;
    var light_res = 0;
    var plum_res = 0;
    var prot_res = 0;
    var road_res = 0;
    var green_res = 0;

    url_issu = "https://api.sense.city/statistics/issue?city=patras";

    var user_start_date = $("#start_date1").val();
    var user_end_date = $("#end_date1").val();


    var start_year = user_start_date[0] + user_start_date[1] + user_start_date[2] + user_start_date[3];
    var end_year = user_end_date[0] + user_end_date[1] + user_end_date[2] + user_end_date[3];
    var start_month = user_start_date[5] + user_start_date[6];
    var end_month = user_end_date[5] + user_end_date[6];
    var start_day = user_start_date[8] + user_start_date[9];
    var end_day = user_end_date[8] + user_end_date[9];

    var a, b, c, d, e, f;

    a = parseInt(start_year);
    b = parseInt(start_month);
    c = parseInt(end_year);
    d = parseInt(end_month);
    e = parseInt(start_day);
    f = parseInt(end_day);

    var t_years, t_months;

    t_years = c - a;
    t_months = d - b;

    var i, j;
    var urls = [];

    if (t_years == 0) {
        if (t_months == 0) {
            url1 = start_year + "-" + start_month + "-" + start_day;
            url2 = start_year + "-" + start_month + "-" + end_day;
            url_graph = "https://api.sense.city/statistics/issue?city=patras" + "&startdate=" + url1 + "&enddate=" + url2;
            urls.push(url_graph);

        } else {
            var temp3;
            var days;

            temp3 = JSON.stringify(start_year + "-" + start_month);
            days = moment(temp3, "YYYY-MM").daysInMonth();
            url1 = start_year + "-" + start_month + "-" + start_day;
            url2 = start_year + "-" + start_month + "-" + days;
            url_graph = "https://api.sense.city/statistics/issue?city=patras" + "&startdate=" + url1 + "&enddate=" + url2;
            urls.push(url_graph);

            for (i = 1; i < t_months; i++) {
                var url1 = "",
                    url2 = "",
                    url_graph = "";
                var temp, temp3;
                var days;
                if (b + i < 10) { temp = "0" + JSON.stringify(b + i) } else { temp = JSON.stringify(b + i) }

                temp3 = JSON.stringify(start_year + "-" + temp);
                days = moment(temp3, "YYYY-MM").daysInMonth();

                url1 = start_year + "-" + temp + "-" + "01";
                url2 = start_year + "-" + temp + "-" + days;
                url_graph = "https://api.sense.city/statistics/issue?city=patras" + "&startdate=" + url1 + "&enddate=" + url2;
                urls.push(url_graph);
            }
            url1 = start_year + "-" + end_month + "-" + "01";
            url2 = start_year + "-" + end_month + "-" + end_day;
            url_graph = "https://api.sense.city/statistics/issue?city=patras" + "&startdate=" + url1 + "&enddate=" + url2;
            urls.push(url_graph);
        }

    } else if (t_years != 0) {
        var days;
        var temp3;

        temp3 = JSON.stringify(start_year + "-" + start_month);
        days = moment(temp3, "YYYY-MM").daysInMonth();

        url1 = start_year + "-" + start_month + "-" + start_day;
        url2 = start_year + "-" + start_month + "-" + days;
        url_graph = "https://api.sense.city/statistics/issue?city=patras" + "&startdate=" + url1 + "&enddate=" + url2;
        urls.push(url_graph);

        for (i = 1; i < 13 - b; i++) {
            var url1 = "",
                url2 = "",
                url_graph = "";
            var temp, temp3;
            var days;
            if (b + i < 10) { temp = "0" + JSON.stringify(b + i) } else { temp = JSON.stringify(b + i) }

            temp3 = JSON.stringify(start_year + "-" + temp);
            days = moment(temp3, "YYYY-MM").daysInMonth();

            url1 = start_year + "-" + temp + "-" + "01";
            url2 = start_year + "-" + temp + "-" + days;
            url_graph = "https://api.sense.city/statistics/issue?city=patras" + "&startdate=" + url1 + "&enddate=" + url2;
            urls.push(url_graph);
        }
        //ενδοιαμεσα χρονια
        for (j = 0; j < t_years; j++) {
            var thisyear = 0;
            for (i = 1; i < 13; i++) {
                var url1 = "",
                    url2 = "",
                    url_graph = "";
                var days;
                var temp, temp3;
                if (i < 10) { temp = "0" + JSON.stringify(i) } else { temp = JSON.stringify(i) }

                thisyear = JSON.stringify(a + j);

                temp3 = JSON.stringify(thisyear + "-" + temp);
                days = moment(temp3, "YYYY-MM").daysInMonth();


                url1 = thisyear + "-" + temp + "-" + "01";
                url2 = thisyear + "-" + temp + "-" + days;
                url_graph = "https://api.sense.city/statistics/issue?city=patras" + "&startdate=" + url1 + "&enddate=" + url2;
                urls.push(url_graph);
            }
        }
        //τελευταιος χρονος
        for (i = 1; i < d; i++) {
            var url1 = "",
                url2 = "";
            var days;
            var temp, temp3;
            if (i < 10) { temp = "0" + JSON.stringify(i) } else { temp = JSON.stringify(i) }

            temp3 = JSON.stringify(end_year + "-" + temp);
            days = moment(temp3, "YYYY-MM").daysInMonth();

            url1 = end_year + "-" + temp + "-" + "01";
            url2 = end_year + "-" + temp + "-" + days;
            url_graph = "https://api.sense.city/statistics/issue?city=patras" + "&startdate=" + url1 + "&enddate=" + url2;
            urls.push(url_graph);
        }
        url1 = end_year + "-" + end_month + "-" + "01";
        url2 = end_year + "-" + end_month + "-" + end_day;
        url_graph = "https://api.sense.city/statistics/issue?city=patras" + "&startdate=" + url1 + "&enddate=" + url2;
        urls.push(url_graph);
    }


    data1.push(JSON.stringify(gar_conf));
    data1.push(JSON.stringify(light_conf));
    data1.push(JSON.stringify(plum_conf));
    data1.push(JSON.stringify(road_conf));
    data1.push(JSON.stringify(prot_conf));
    data1.push(JSON.stringify(green_conf));

    data2.push(JSON.stringify(gar_res));
    data2.push(JSON.stringify(light_res));
    data2.push(JSON.stringify(plum_res));
    data2.push(JSON.stringify(road_res));
    data2.push(JSON.stringify(prot_res));
    data2.push(JSON.stringify(green_res));

    var a = (gar_res + gar_conf);
    var b = (light_conf + light_res);
    var c = (plum_res + plum_conf);
    var d = (road_conf + road_res);
    var e = (prot_conf + prot_res);
    var f = (green_conf + green_res);

    issues.push(JSON.stringify(a));
    issues.push(JSON.stringify(b));
    issues.push(JSON.stringify(c));
    issues.push(JSON.stringify(d));
    issues.push(JSON.stringify(e));
    issues.push(JSON.stringify(f));

    var months = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    $.each(urls, function() {
        $.get(this, function(data) {
            $.each(data, function(key, value) {
                if (value.status == "CONFIRMED" && value.issue == "garbage") {
                    gar_conf++;
                } else if (value.status == "CONFIRMED" && value.issue == "lighting") {
                    light_conf++;
                } else if (value.status == "CONFIRMED" && value.issue == "plumbing") {
                    plum_conf++;
                } else if (value.status == "CONFIRMED" && value.issue == "road-constructor") {
                    road_conf++;
                } else if (value.status == "CONFIRMED" && value.issue == "protection-policy") {
                    prot_conf++;
                } else if (value.status == "CONFIRMED" && value.issue == "green") {
                    green_conf++;
                } else if (value.status == "RESOLVED" && value.issue == "garbage") {
                    gar_res++;
                } else if (value.status == "RESOLVED" && value.issue == "lighting") {
                    light_res++;
                } else if (value.status == "RESOLVED" && value.issue == "plumbing") {
                    plum_res++;
                } else if (value.status == "RESOLVED" && value.issue == "road-constructor") {
                    road_res++;
                } else if (value.status == "RESOLVED" && value.issue == "protection-policy") {
                    prot_res++;
                } else if (value.status == "RESOLVED" && value.issue == "green") {
                    green_res++;
                }


                if (value.reported[5] + value.reported[6] == "01") { months[0]++; } else if (value.reported[5] + value.reported[6] == "02") { months[1]++; } else if (value.reported[5] + value.reported[6] == "03") { months[2]++; } else if (value.reported[5] + value.reported[6] == "04") { months[3]++; } else if (value.reported[5] + value.reported[6] == "05") { months[4]++; } else if (value.reported[5] + value.reported[6] == "06") { months[5]++; } else if (value.reported[5] + value.reported[6] == "07") { months[6]++; } else if (value.reported[5] + value.reported[6] == "08") { months[7]++; } else if (value.reported[5] + value.reported[6] == "09") { months[8]++; } else if (value.reported[5] + value.reported[6] == "10") { months[9]++; } else if (value.reported[5] + value.reported[6] == "11") { months[10]++; } else if (value.reported[5] + value.reported[6] == "12") { months[11]++; }

            });
            data1[0] = gar_conf;
            data1[1] = light_conf;
            data1[2] = plum_conf;
            data1[3] = road_conf;
            data1[4] = prot_conf;
            data1[5] = green_conf;

            data2[0] = gar_res;
            data2[1] = light_res;
            data2[2] = plum_res;
            data2[3] = road_res;
            data2[4] = prot_res;
            data2[5] = green_res;

            issues[0] = gar_conf + gar_res;
            issues[1] = light_conf + light_res;
            issues[2] = plum_conf + plum_res;
            issues[3] = road_conf + road_res;
            issues[4] = prot_conf + prot_res;
            issues[5] = green_conf + green_res;

            months[0] = months[0];
            months[1] = months[1];
            months[2] = months[2];
            months[3] = months[3];
            months[4] = months[4];
            months[5] = months[5];
            months[6] = months[6];
            months[7] = months[7];
            months[8] = months[8];
            months[9] = months[9];
            months[10] = months[10];
            months[11] = months[11];


        });
    })

    console.log(data1);
    console.log(data2);
    console.log(issues);
    console.log(urls);
    console.log(months);


    var ctx1 = document.getElementById('canvas').getContext('2d');
    mixedChart = new Chart(ctx1, {
        type: 'bar',
        data: {
            datasets: [{
                    label: 'All Isuues',
                    data: issues,
                    backgroundColor: [
                        'rgba(169, 50, 38)',
                        'rgba(36, 113, 163)',
                        'rgba(23, 165, 137)',
                        'rgba(40, 180, 99)',
                        'rgba(241, 196, 15)',
                        'rgba(202, 111, 30)'
                    ],
                    borderColor: [
                        'rgba(169, 50, 38)',
                        'rgba(36, 113, 163)',
                        'rgba(23, 165, 137)',
                        'rgba(40, 180, 99)',
                        'rgba(241, 196, 15)',
                        'rgba(202, 111, 30)'
                    ],
                    // this dataset is drawn below
                    order: 1
                }, {
                    label: 'Confirmed Issues',
                    data: data1,
                    type: 'bar',
                    backgroundColor: [
                        'rgba(205, 97, 85 )',
                        'rgba(41, 128, 185)',
                        'rgba(26, 188, 156)',
                        'rgba(82, 190, 128 )',
                        'rgba(244, 208, 63 )',
                        'rgba(230, 126, 34)'
                    ],
                    borderColor: [
                        'rgba(205, 97, 85 )',
                        'rgba(41, 128, 185)',
                        'rgba(26, 188, 156)',
                        'rgba(82, 190, 128  )',
                        'rgba(244, 208, 63 )',
                        'rgba(230, 126, 34)'
                    ],
                    // this dataset is drawn on top
                    order: 2
                },
                {
                    label: 'Resolved Issues',
                    data: data2,
                    type: 'bar',
                    backgroundColor: [
                        'rgba(217, 136, 128)',
                        'rgba(84, 153, 199)',
                        'rgba(118, 215, 196)',
                        'rgba(125, 206, 160)',
                        'rgba(247, 220, 111)',
                        'rgba(235, 152, 78)'
                    ],
                    borderColor: [
                        'rgba(217, 136, 128)',
                        'rgba(84, 153, 199)',
                        'rgba(118, 215, 196)',
                        'rgba(125, 206, 160)',
                        'rgba(247, 220, 111)',
                        'rgba(235, 152, 78)'
                    ],
                    // this dataset is drawn on top
                    order: 3
                }
            ],
            labels: ['Garbage', 'Lighting', 'Plumbing', 'Road cons', 'Protection', 'Green']
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });


    var ctx2 = document.getElementById('canvas2').getContext('2d');
    doug_Chart = new Chart(ctx2, {
        type: 'pie',
        data: {
            labels: [
                'January',
                'February',
                'March',
                'April',
                'May',
                'June',
                'July',
                'August',
                'September',
                'October',
                'November',
                'December'

            ],
            datasets: [{
                data: months,
                backgroundColor: [
                    'rgba(25, 118, 210)',
                    'rgba(2, 136, 209)',
                    'rgba(0, 151, 167 )',
                    'rgba(0, 121, 107)',
                    'rgba(56, 142, 60)',
                    'rgba(104, 159, 56)',
                    'rgba(255, 236, 179 )',
                    'rgba(255, 224, 178)',
                    'rgba(255, 204, 188)',
                    'rgba(215, 204, 200 )',
                    'rgba(245, 245, 245 )',
                    'rgba(207, 216, 220)'
                ],
                hoverOffset: 4
            }]
        }
    });
})
var mixedChart;
var doug_Chart;
var ctx1 = document.getElementById('canvas').getContext('2d');
var ctx2 = document.getElementById('canvas2').getContext('2d');
var issues = [];
var data1 = [];
var data2 = [];

var mixedChart = new Chart(ctx1, {});
doug_Chart = new Chart(ctx2, {});