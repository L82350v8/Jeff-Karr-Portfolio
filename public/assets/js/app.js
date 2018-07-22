// ======================================< variables >============================================= // 
let clockRunning = false;
let welcomeMsgTime = 10;
let contactMsgTime = 5;

// ======================================< functions >============================================ // 
function welcomeMsgTimer() {
  welcomeMsgTime--;
  if (welcomeMsgTime === 0) {
    clearInterval(intervalId);
    clockRunning = false;
    $(".welcome-msg").fadeOut("slow", function () {
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
  console.log("inside bldContactMsgCfm");
  var cfmDiv = $("<div>");
  cfmDiv.addClass("container");
  cfmDiv.addClass("cfm-div");
  var pMsg = $("<p><i>Your message has been sent.</i></p>");
  cfmDiv.append(pMsg);
  $("#msg-confirm-area").append(cfmDiv);
  contactMsgTimer();
}

function setBgColor() {
  $("#message-input").css("background-color", "#faffbd");
  $("#message-input").css("color", "#000000");
};

// ======================================< main process >============================================ // 
$(function () {

  new fullpage("#fullpage", {
    autoScrolling: true,
    scrollHorizontally: true,
    licensekey: "95C34945-D8F34E8C-8EE6E4A7-9B2145E7"
  });
  $(".job-title").hide();
  welcomeMsgTimer();

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
    $("#message-input").css("background-color", "#acb168");
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
});

