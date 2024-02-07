url="https://api.sense.city/statistics/issue?city=patras";
document.body.style.zoom="80%"

url_feelings="https://api.sense.city/api/1.0/feelings?";

/* step_1 import parametres issues */
$(document).ready(function(){
    $("#btn1").click(function(){
      
      var check_1=0;
  
      url="https://api.sense.city/statistics/issue?city=patras";
      var user_status = $("input[name='status']:checked").val(); 
      var user_start_date = $("#start_date").val();
      var user_end_date = $("#end_date").val();
      var user_issue = $("input[name='issue']:checked").val();
      // url=url+"&status="+user_status+"&startdate="+user_start_date+"&enddate="+user_end_date+"&issue="+user_issue;
      
      check_1= $("input[name='all_data']:checked").val();

      if (check_1==1){
        url="https://api.sense.city/statistics/issue?city=patras"
      }
      else url=url+"&status="+user_status+"&startdate="+user_start_date+"&enddate="+user_end_date+"&issue="+user_issue;
  
      $.get(url, function(data, status){
       console.log(data);
      });
    });
  });
  
/* step_1 import parameters feelings */
$(document).ready(function(){
    $("#btn2").click(function(){
      
      var check=0;
      url_feelings="https://api.sense.city/api/1.0/feelings?";
  
      var user_start_date = $("#start_date").val();
      var user_end_date = $("#end_date").val();
      var user_feeling = $("input[name='feeling']:checked").val();
      var user_city = $("input[name='city']:checked").val();
  
      // url_feelings=url_feelings+"startdate="+user_start_date+"&enddate="+user_end_date+"&feeling="+user_feeling+"&city="+user_city;
      check= $("input[name='all_feelings']:checked").val();

      if (check ==1){
        url_feelings="https://api.sense.city/api/1.0/feelings"
      }
      else url_feelings=url_feelings+"startdate="+user_start_date+"&enddate="+user_end_date+"&feeling="+user_feeling+"&city="+user_city;
     
      $.get(url_feelings, function(data, status){
       console.log(data);
      });
    });
  });
 
