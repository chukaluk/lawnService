var beginDate = new Date("2/15/2016");
var endDate = new Date("10/31/2016");

function showCustomer(divNum, name, address, email, signUpDate, weekBegin, weekEnd, tech) {
  var date = new Date(signUpDate.toString().replace( /(\d{2})\/(\d{2})\/(\d{4})/, "$1/$2/$3"));
  var twoWeek = date;
  var pretty;
  var dates = new Array();

  while(twoWeek > beginDate && twoWeek < endDate) {
    twoWeek.setDate(date.getDate() + 14);
    if(twoWeek > endDate) {
      break;
    } else {
      pretty = twoWeek.toLocaleDateString();
      dates.push(pretty);
    }
  }

  var tempDiv = $('<div></div>');
  $('#' + tech + '').append(tempDiv);
  tempDiv.attr("id", divNum); 

  var tempName = $('<h1>' + name + ' </h1>');
  $('#' + divNum + '').append(tempName);

  var tempAddress = $('<h4>' + address + ' </h4>');
  $('#' + divNum + '').append(tempAddress);


  for(var i = 0; i< dates.length; i++) {
    var toDate = new Date(dates[i]);

    if(toDate >= beginWeek && toDate <= endWeek) {

      var tempService = $('<h6>Service: Grass Cut</h6>');
      $('#' + divNum + '').append(tempService);
      var tempDate = $('<p> Service Date: ' + dates[i] + ' </p>')
      $('#' + divNum + '').append(tempDate);
    }
  }

  if(!($('#' + divNum + '').find('p').length > 0)) {
    $('#' + divNum + '').append('<p>No Services this week</p>');
  }
}

function emailTech(infoID, techEmail, techName, subject){
  var string = $('#' + infoID + '');
  string.find('script').remove();

  var without = string.wrap("<div>").parent().html();


  var html = "<h1>Hello " + techName + ", this week you will be cutting grass for: </h1>" + without;

  $.get('/sent', {to:techEmail, subject:subject, html:html});
  $("#message").text("Email Sent!");
  $("#message").attr("class", "alert alert-success");
}