// Begin of year
var beginDate = new Date("2/15/2016");

// End of year
var endDate = new Date("10/31/2016");


/* Show Customer
 *
 *
 * divNum: current value of i in loop
 * name: name of customer at i
 * address: address of customer at i
 * email: email of customer at i
 * signUpDate: sign up date of the customer at i
 * weekBegin: beginning of work week
 * weekEnd: end of work week
 * tech: the name of the div to append to
 *
 *
 * Creates a date from the signup date string, then populates an array
 *  with two week intervals from the signup date between the beginDate
 *  and endDate (gets every two weeks from the start of the service year
 *  to the end). Then creates a div for the customer and appends it to
 *  the tech div (then adds the customers name and address). Lastly,
 *  loops through the array of dates - if any date is between weekBegin
 *  and weekEnd, display that date and service type. If there are no dates 
 *  within that timespan, display 'no services this week'.
 */

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

  var tempName = $('<h3>Customer: ' + name + ' </h3>');
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



/* Email Tech
 *
 * infoID: the div to append to
 * techEmail: the technicians email
 * techName: the name of the technician
 * subject: the subject of the email (week of x)
 *
 *
 * Takes the contents of infoID (the whole div) and removes
 *  the script. Then takes the current html (the infoID div without
 *  scripts) and adds a personal message with the technicians name
 *  and greeting. Then gets '/sent' and passes the contents of the email.
 *  Depending of the response (sent or not sent), a message is shown.
 */

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
    else {
      $("#message").text("Email was not sent");
      $("#message").attr("class", "alert alert-danger");
    }
  });
  
}


/* Monthly Billing
 *
 *
 * divNum: current value of i in loop
 * name: name of customer at i
 * address: address of customer at i
 * email: email of customer at i
 * signUpDate: sign up date of the customer at i
 * tech: the name of the div to append to
 * month: month as a string
 * monthID: month as a number (starting from 0)
 *
 * Similar to show customers. Creates a date object from signup date string
 *  Populates an array with two week intervals from the beginning of the service
 *  year to the end of the service year. Creates a div for the customer and
 *  appends the div to the tech div (displays name and email). Then checks 
 *  the array of dates for all dates within the given month (monthID) and displays
 *  the dates. Also increments counter to keep track of how many service dates
 *  there are for that month. Creates a button for each customer to
 *  send an email. Extracts the contents of the html (name, email address, service dates).
 *  Total bill is calucated by total number of services dates * $50.00
 *  Then gets '/sent' and passes the contents of the email.
 *  Depending of the response (sent or not sent), a message is shown.
 * 
 */

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

  if(!($('#' + divNum + '').find('p').length > 0)) {
    $('#' + divNum + '').append('<p>No Services this month</p>');
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
    text = "Hello " + name + ", here is your billing statement for the month of " + month + ": " + services + "\nTotal Bill: $" + amount + "\n\n\nBilling terms are net30";
    $.get('/sentBill', {to:to, subject:subject, text:text}, function(data) {
      if(data == "sent") {
        $("#message").text("Email Sent!");
        $("#message").attr("class", "alert alert-success");
      }
      else {
      $("#message").text("Email was not sent");
      $("#message").attr("class", "alert alert-danger");
    }
    });                
  });


}