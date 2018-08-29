// ======================================< variables >============================================= // 
let clockRunning = false;
let welcomeMsgTime = 6;
let contactMsgTime = 5;

// ======================================< functions >============================================ // 

function buildJobTitle() {
  let jobTitleDiv = $("<div>");
  jobTitleDiv.addClass("job-title");
  $(jobTitleDiv).css("display", "none");

  let nameElement = $("<h3>");
  nameElement.addClass = $("animated fadeIn");
  nameElement.text("Jeff Karr");
  nameElement.appendTo(jobTitleDiv);

  let fullStackEl = $("<h3>");
  fullStackEl.addClass = $("animated fadeIn mt-2");
  fullStackEl.text("Full Stack Web Developer");
  fullStackEl.appendTo(jobTitleDiv);

  $(jobTitleDiv).prependTo("#intro-msg-area");
};

function welcomeMsgTimer() {
  welcomeMsgTime--;
  if (welcomeMsgTime === 0) {
    clearInterval(intervalId);
    clockRunning = false;
    $("#welcome-msg").fadeOut("slow", function () {
      buildJobTitle();
      $(".job-title").fadeIn(1000);
    });
    return;
  }
  if (!clockRunning) {
    intervalId = setInterval(welcomeMsgTimer, 1000);
    clockRunning = true;
  }
};

function contactMsgTimer(time) {
  contactMsgTime--;
  if (contactMsgTime === 0) {
    clearInterval(intervalId);
    clockRunning = false;
    $(".cfm-div").remove();
    return;
  }
  if (!clockRunning) {
    intervalId = setInterval(contactMsgTimer, 1000);
    clockRunning = true;
  }
};

function bldContactMsgCfm() {
  var cfmDiv = $("<div>");
  cfmDiv.addClass("container");
  cfmDiv.addClass("cfm-div");
  var pMsg = $("<p><i>Your message has been sent.</i></p>");
  cfmDiv.append(pMsg);
  $("#msg-confirm-area").append(cfmDiv);
  contactMsgTimer();
};

// setBgColor sets the background color on the message-input on the contact form. 
function setBgColor() {
  $("#message-input").css("background-color", "#faffbd");
  $("#message-input").css("color", "#000000");
};

// ======================================< main process >============================================ // 
$(function () {

  console.log("innerWidth: " + window.innerWidth);
  console.log("innerHeight: " + window.innerHeight);

  welcomeMsgTimer();

  // the following code sends contact info to Mailgun api.
  $("#contact-btn").on("click", function (event) {
    event.preventDefault();
    // save message from the contact form
    const messageObj = {
     name: $("#name-input").val().trim(),
      company: $("#company-input").val().trim(),
      email: $("#email-input").val().trim(),
      phone: $("#phone-input").val().trim(),
      subject: $("#subject-input").val().trim(),
      message: $("#message-input").val().trim()
    };
    // clear form fields
    $("#contact-form")[0].reset();
    $("#message-input").css("background-color", "#fff5e6");
    // send the message 
    $.post("/send", messageObj)
      .then(res => {
        if(res.status == "200") {
          // if message is sucessful, send a confirmation to the form
          contactMsgTime = 5;
          bldContactMsgCfm(); 
        }
      });
  });

  // the following code closes the responsive navbar menu after an anchor is clicked.
  $(document).on('click', '.navbar-collapse.show', function (e) {
    $(this).collapse("hide");
  });
 
});

