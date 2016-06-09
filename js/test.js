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

  var tempName = $('<h1>Customer: ' + name + ' </h1>');
  $('#' + divNum + '').append(tempName);

  var tempAddress = $('<h4>Address: ' + address + ' </h4>');
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



////////////////////////////////////

function emailTech(infoID, techEmail, techName, subject){
  var string = $('#' + infoID + '');
  string.find('script').remove();

  var without = string.wrap("<div>").parent().html();


  var html = "<h1>Hello " + techName + ", this week you will be cutting grass for: </h1>" + without;

  $.get('/sent', {to:techEmail, subject:subject, html:html}, function(data){
    if(data == "sent") {
      $("#message").text("Email Sent!");
      $("#message").attr("class", "alert alert-success");
    }
  });
  
}


////////////////////////////////////

function monthlyBilling(divNum, name, address, email, signUpDate, tech, month, monthID) {
  var date = new Date(signUpDate.toString().replace( /(\d{2})\/(\d{2})\/(\d{4})/, "$1/$2/$3"));
  var twoWeek = date;
  var pretty;
  var counter = 0;
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

  var tempEmail = $('<h3>' + email + '</h3>');
  $('#' + divNum + '').append(tempEmail);


  for(var i = 0; i< dates.length; i++) {
    var toDate = new Date(dates[i]);

    if(toDate.getMonth() == monthID) {

      var tempDate = $('<p>Service Date: ' + dates[i] + ' </p>')
      $('#' + divNum + '').append(tempDate);
      counter++;
    }
  }

  var tempButton = $('<button>Send Email</button>');
  $(tempButton).attr("class", "btn btn-success");
  $('#' + divNum + '').append(tempButton);

  var from, to, subject, text, name, services, amount;

  $('#' + divNum + '  button').click(function() {
    to = $('#' + divNum + '  h3').text();
    name = $('#' + divNum + '  h1').text();
    subject = month + " Billing Statement - Grass Cutters";
    services = $('#' + divNum + '  p').text();
    amount = counter * 50;
    text = "Hello " + name + ", here is your billing statement for the month of " + month + ": " + services + "\nTotal Bill: $" + amount;
    $.get('http://localhost:8080/sentBill', {to:to, subject:subject, text:text}, function(data) {
      if(data == "sent") {
        $("#message").text("Email Sent!");
        $("#message").attr("class", "alert alert-success");
      }
    });                
  });


}