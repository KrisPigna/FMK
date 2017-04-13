$(document).ready(function() {
    //Variable to keep track of game state
    var state = "";
    
    //Function to create and return CORS request object
    function createCORSRequest(method, url) {
        var xhr = new XMLHttpRequest();
        if ("withCredentials" in xhr) {
            // XHR for Chrome/Firefox/Opera/Safari.
            xhr.open(method, url, true);
        } else if (typeof XDomainRequest != "undefined") {
            // XDomainRequest for IE.
            xhr = new XDomainRequest();
            xhr.open(method, url);
        } else {
            // CORS not supported.
            xhr = null;
        }
        return xhr;
    }
    
    //Function to access API and retrieve a random person
    function getPerson(element) {
        
        var url = 'https://0ikc59csgi.execute-api.us-west-2.amazonaws.com/prod/getRandomPerson';

        var xhr = createCORSRequest('GET', url);
        if (!xhr) {
            alert('CORS not supported');
            return;
        }

        // Response handlers.
        xhr.onload = function() {
            var text = xhr.responseText;
            text = JSON.parse(text).body;
            element.html(text + '<span class="caret"></span>');
        };

        xhr.onerror = function() {
            alert('Woops, there was an error making the request.');
        };

        xhr.send();

    }

    //Resets game state and populates the three people to pick from
    $('#play').click(function () {
        $('#choice1').html("");
        $('#choice2').html("");
        $('#choice3').html("");
        $('#pick1').html("Friend");
        $('#pick2').html("Friend");
        $('#pick3').html("Friend");
        var element = $('#person1button');
        element.removeClass();
        element.addClass("btn btn-default btn-lg dropdown-toggle");
        getPerson(element);
        element = $('#person2button');
        element.removeClass();
         element.addClass("btn btn-default btn-lg dropdown-toggle");
        getPerson(element);
        element = $('#person3button');
        element.removeClass();
         element.addClass("btn btn-default btn-lg dropdown-toggle");
        getPerson(element);
        state = "ready";
        console.log(state);
    });
    
    //Logic for person 1's dropdown choices
    $('#pick1').click(function() {
        if (state == "ready") {
            $('#person1button').removeClass();
            $('#person1button').addClass("btn btn-info btn-lg dropdown-toggle");
            $('#choice1').html("FRIEND");
            $('#pick2').html("Marry");
            $('#pick3').html("Marry");
            state = "friend1";
        }
        else if (state == "friend2" || state == "friend3") {
            $('#person1button').removeClass();
            $('#person1button').addClass("btn btn-success btn-lg dropdown-toggle");
            if ($('#choice2').html() == "FRIEND") {
                $('#person3button').addClass("btn btn-danger btn-lg dropdown-toggle");
                $('#choice3').html("KILL");
            } else {
                $('#person2button').addClass("btn btn-danger btn-lg dropdown-toggle");
                $('#choice2').html("KILL");
            }
            $('#choice1').html("MARRY");
            state = "";
        }
    });
    
    //Logic for person 2's dropdown choices
    $('#pick2').click(function() {
        if (state == "ready") {
            $('#person2button').removeClass();
            $('#person2button').addClass("btn btn-info btn-lg dropdown-toggle");
            $('#choice2').html("FRIEND");
            $('#pick1').html("Marry");
            $('#pick3').html("Marry");
            state = "friend2";
            console.log(state);
        }
        else if (state == "friend1" || state == "friend3") {
            $('#person2button').removeClass();
            $('#person2button').addClass("btn btn-success btn-lg dropdown-toggle");
            if ($('#choice1').html() == "FRIEND") {
                $('#person3button').addClass("btn btn-danger btn-lg dropdown-toggle");
                $('#choice3').html("KILL");
            } else {
                $('#person1button').addClass("btn btn-danger btn-lg dropdown-toggle");
                $('#choice1').html("KILL");
            }
            $('#choice2').html("MARRY");
            state = "";
        }
    });
    
    //Logic for person 3's dropdown choices
    $('#pick3').click(function() {
        if (state == "ready") {
            $('#person3button').removeClass();
            $('#person3button').addClass("btn btn-info btn-lg dropdown-toggle");
            $('#choice3').html("FRIEND");
            $('#pick1').html("Marry");
            $('#pick2').html("Marry");
            state = "friend3";
        }
        else if (state == "friend1" || state == "friend2") {
            $('#person3button').removeClass();
            $('#person3button').addClass("btn btn-success btn-lg dropdown-toggle");
             if ($('#choice1').html() == "FRIEND") {
                $('#person2button').addClass("btn btn-danger btn-lg dropdown-toggle");
                $('#choice2').html("KILL");
            } else {
                $('#person1button').addClass("btn btn-danger btn-lg dropdown-toggle");
                $('#choice1').html("KILL");
            }
            $('#choice3').html("MARRY");
            state = "";
            console.log(state);
        }
    });
});