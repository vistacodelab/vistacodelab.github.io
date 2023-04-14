$(function() {

    $("input,textarea").jqBootstrapValidation({
        preventSubmit: true,
        submitError: function($form, event, errors) {
            // additional error messages or events
        },
        submitSuccess: function($form, event) {
            event.preventDefault(); // prevent default submit behaviour
            // get values from FORM
            var name = $("input#name").val();
            var email = $("input#email").val();
            var phone = $("input#phone").val();
            var message = $("textarea#message").val();
            var firstName = name; // For Success/Failure Message
            // Check for white space in name for Success/Fail message
            if (firstName.indexOf(' ') >= 0) {
                firstName = name.split(' ').slice(0, -1).join(' ');
            }
            // $.ajax({
            //     url: "https://newlearnpath.com/vistacodelab/contact.php",
            //     type: "POST",
            //     data: {
            //         name: name,
            //         phone: phone,
            //         email: email,
            //         message: message
            //     },
            //     cache: false,
            //     success: function() {
            //         // Success message
            //         $('#success').html("<div class='alert alert-success'>");
            //         $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
            //             .append("</button>");
            //         $('#success > .alert-success')
            //             .append("<strong>Your message has been sent. </strong>");
            //         $('#success > .alert-success')
            //             .append('</div>');

            //         //clear all fields
            //         $('#contactForm').trigger("reset");
            //     },
            //     error: function() {
            //         // Fail message
            //         $('#success').html("<div class='alert alert-danger'>");
            //         $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
            //             .append("</button>");
            //         $('#success > .alert-danger').append("<strong>Sorry " + firstName + ", it seems that my mail server is not responding. Please try again later!");
            //         $('#success > .alert-danger').append('</div>');
            //         //clear all fields
            //         $('#contactForm').trigger("reset");
            //     },
            // });

            var sdata = formatForSlack(message, 'inbox')
            // log in console
            console.log(sdata)
            // post
            $.ajax({
            // url is what you get from activating the "Incoming WebHooks" slack integration
            // if you leave, you should see an error message "No Team", status 404
            url: 'https://hooks.slack.com/services/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',
            type: 'POST',
            processData: true,
            data : sdata ,
            success : function(data) {
                // success will show on page
                console.log(data)
                // $('#result').html(data);
            },
            error: function(data){
                // error will show error object
                console.log(data)
                // $('#result').html("error:"+JSON.stringify(data));
            }
            });
        },
        filter: function() {
            return $(this).is(":visible");
        },
    });

    $("a[data-toggle=\"tab\"]").click(function(e) {
        e.preventDefault();
        $(this).tab("show");
    });
});


/*When clicking on Full hide fail/success boxes */
$('#name').focus(function() {
    $('#success').html('');
});

function formatForSlack(msg, chan){
    var payload ={
      "channel":chan,
      "username":'incoming-webhook',
      "text": msg,
      "icon_emoji":':ghost:'
    };
    // return json string of payload
    return JSON.stringify(payload)
  }
