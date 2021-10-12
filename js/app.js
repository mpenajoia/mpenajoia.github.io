// Contact Form Below
function sendForm(event) {
  event.preventDefault();
  const $name = $("#contact-name").val();
  const $email = $("#contact-email").val();
  const $message = $("#message-area").val();
  const $feedback = $("#feedback");
  const $blank404 = $("<p>")
    .css({ color: "red" })
    .text("Please fill out all fields.");
  const $success = $("<p>").text("Got it, thanks.");
  if (!$name && !$email && !$message) {
    $feedback.prepend($blank404);
    $feedback.fadeOut(2000);
  } else {
    const $serial = $("#contact-form").serializeArray();
    $.ajax({
      url: "https://api.apispreadsheets.com/data/19236/",
      type: "post",
      data: $("#contact-form").serializeArray(),
      success: function () {
        $("#feedback").prepend($success);
        $("#contact-name").val("");
        $("#contact-email").val("");
        $("#message-area").val("");
        $feedback.fadeOut(2000);
      },
      error: function () {
        $feedback.prepend(
          $("<p>").text("This mailbox is now full, try again later.")
        );
      },
    });
  }
}

const $downArrow = $("#arrow-down");
const $upArrow = $("#arrow-up");
const $upArrowOn = $upArrow.css({ opacity: 0.1 });
const $upArrowOff = $upArrow.css({ opacity: 0 });
const $win = $(window);

// had to declare this variable out side the function's scope for this to work. Thanks to assistance from Jackson
let topArrowVis = false;
// function that is evoked when the window is scrolled
$win.on("scroll", function () {
  const $top = $win.scrollTop();
  if (!topArrowVis && $top >= 100) {
    $upArrow.fadeTo(600, 0.1, function () {});
    topArrowVis = true;
  }
  if (topArrowVis && $top < 100) {
    $upArrow.fadeTo(600, 0, function () {});
    topArrowVis = false;
  }
  if (topArrowVis && $top >= 1800) {
    $upArrow.css("bottom", "130px");
  } else {
    $upArrow.css("bottom", "90px");
  }
});
// function to delay the loading of the down arrow
function arrowLoad() {
  $("#arrow-down").delay(500).animate(
    {
      opacity: .1,
    },
    1000
  );
}
arrowLoad();

let downArrowVis = true;
// function that is evoked when the window is scrolled
$win.on("scroll", function () {
  const $top = $win.scrollTop();

  if (!downArrowVis && $top >= 1700) {
    $downArrow.fadeTo(600, 0, function () {});
    downArrowVis = true;
  }
  if (downArrowVis && $top < 1700) {
    $downArrow.fadeTo(600, 0.1, function () {});
    downArrowVis = false;
  }
});

//Google Map API integration
//function to initialize map
function initMap() {
  // location of my area
  const location = { lat: 34.112, lng: -118.193 };
  // variable to 'put' map on DOM
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 12,
    center: location,
  });
}

// project slider controls
function nextProj() {
  $("#next").on("click", function () {
    let $showMe = $("#show-me");
    let $nextImg = $showMe.next();

    if ($nextImg.length) {
      $showMe.removeAttr("id").css("z-index", -50);
      $nextImg.attr("id", "show-me").css("z-index", 50);
    }
  });
  $("#prev").on("click", function () {
    let $showMe = $("#show-me");
    let $prevImg = $showMe.prev();

    if ($prevImg.length) {
      $showMe.removeAttr("id").css("z-index", -50);
      $prevImg.attr("id", "show-me").css("z-index", 50);
    }
  });
}
nextProj();

function tagLine() {
  $("#tagline").delay(500).animate(
    {
      opacity: 1,
    },
    1000
  );
}
tagLine();

let $aboutVis = false;
let $projectVis = false;
let $contactVis = false;
$(window).on("scroll", function () {
  let $theDrop = $(window).scrollTop();
  if (!$aboutVis && $theDrop >= 400) {
    $("#about-me").slideDown(500);
  }
  if (!$projectVis && $theDrop >= 950) {
    $("#slider").slideDown(500);
  }
  if (!$contactVis && $theDrop >= 1900) {
    $("#contact-form").slideDown(500);
  }
});
