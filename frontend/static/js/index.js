// function autoSubmit() {
//     const formObject = document.forms["theForm"];
//     formObject.submit();
// }

$(document).ready(function() {
    $.each($('ul').find('li'), function() {
        $(this).toggleClass('active', 
            window.location.pathname.indexOf($(this).find('a').attr('href')) > -1);
    }); 
});