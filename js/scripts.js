var sum = 0;
var newCart;

function Cart (movie, showtime) {
  this.movie = movie;
  this.showtime = showtime;
  // this.age = age;
  this.tickets = [];
  this.totalPrice;
  // this.theater = theater;
  // this.seat = seat;
}
function Ticket (discount) {
  this.discount = discount;
}

Cart.prototype.totalCost = function() {
  for(i = 0; i < this.tickets.length; i++) {
    sum += this.tickets[i];
  } if(this.movie !== "Finding Dory") {
    sum *=.90;
  } if(this.showtime !== '5:00pm' && this.showtime !=='7:00pm' && this.showtime !=='9:00') {
    sum *=.90;
  }
  this.totalPrice = sum;
  sum = 0;
};

Ticket.prototype.priceCalc = function() {
  this.discount = this.discount * 15;
  return this.discount;
};

function resetFields() {
    $("select#movie-select").val("");
    $("select#time-select").val("");
    $("select.age-select").val("");
}

// var showtimes = ["9:00am", "11:00am", "1:00pm", "3:00pm", "5,00pm", "7:00pm","9:00pm"];
// var movies = ["Finding Dory", "Zootopia", "Frozen", "The Good Dinosaur"];

$(document).ready(function(){
  $("#add-ticket").click(function() {
    $("#new-tickets").append('<div class="new-ticket">' +
                              '<div class="form-group">' +
                                '<label for="movie-select">Select your age</label>' +
                                '<select class="form-control age-select">' +
                                  '<option value=".90">Minor</option>' +
                                  '<option value="1.00">Adult</option>' +
                                  '<option value=".50">Senior</option>' +
                                '</select>' +
                               '</div>' +
                              '</div>');
  });
  $("form#movie-purchase").submit(function(event){
    event.preventDefault();
    var movieSelect = $("select#movie-select").val();
    var timeSelect = $("select#time-select").val();
    var newCart = new Cart(movieSelect, timeSelect);

    $(".new-ticket").each(function(){
      var ageSelect = $(this).find("select.age-select").val();
      ageSelect = parseFloat(ageSelect);
      var newTicket = new Ticket(ageSelect);
      newTicket = newTicket.priceCalc();
      newCart.tickets.push(newTicket);
    });

    resetFields();
    newCart.totalCost();
    $("#output").show();
    if (newCart.movie === "Finding Dory") {
      $("#dory").show(this);
      $("h2").text(newCart.movie);
      $(".totalCost").text("$" + newCart.totalPrice);
    } else if (newCart.movie === "Zootopia") {
      $("#zootopia").show(this);
      $("h2").text(newCart.movie);
      $(".totalCost").text("$" + newCart.totalPrice);
    } else if (newCart.movie === "Frozen") {
      $("#frozen").show(this);
      $("h2").text(newCart.movie);
      $(".totalCost").text("$" + newCart.totalPrice);
    } else if (newCart.movie === "The Good Dinosaur") {
      $("#dinosaur").show(this);
      $("h2").text(newCart.movie);
      $(".totalCost").text("$" + newCart.totalPrice);
    }
  });
});
