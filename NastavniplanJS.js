var ects = 0;
var sati = 0;
hidetable();
$("#Pasta").on('click', '.btnDelete', function () {

    var currentRow = $(this).closest("tr");
    var col1 = parseInt(currentRow.find("td:eq(1)").text());
    var col2 = parseInt(currentRow.find("td:eq(2)").text());
    ects -= col1;
    sati -= col2;
    $(this).closest('tr').remove();
    if (ects == 0) {
        $("#ECTSpast").text("");
    }
    else {
        $("#ECTSpast").text(ects);
    }
    if (sati == 0) {
        $("#Satipast").text("");
    }
    else {
        $("#Satipast").text(sati);
    }

    if ($("#ECTSpast").text() == "" && $("#Satipast").text() == "") {
        $(".Sakrivena").css("visibility", "hidden");
    }
    hidetable();
});

function JsonRecieve(vrijednost) {

    var request = new XMLHttpRequest();
    request.open('POST', 'http://www.fulek.com/VUA/supit/GetKolegij/' + vrijednost);
    request.onload = function () {
        data = JSON.parse(request.responseText);
        ects += data.ects;
        sati += data.sati;


        $("#Pasta").append("<tr><td>" + data.kolegij +
            "</td><td>" + data.ects +
            "</td> <td>" + data.sati + "</td><td>" + data.predavanja +
            "</td><td>" + data.vjezbe + "</td><td>" + data.tip +
            "</td><td><button class='btnDelete'>Obriši</button></td></tr>");

        $("#ECTSpast").text(ects);
        $("#Satipast").text(sati);
        hidetable();

    }
    request.send();

}

function hidetable() {
    $('table').each(function () {
        if ($(this).find('tbody tr').children("td").length == 0) {
            $(this).hide();
        }
        else {
            $(this).show();
        }
    });
}

var request = new XMLHttpRequest();
request.open('POST', 'http://www.fulek.com/VUA/SUPIT/GetNastavniPlan');
request.onload = function () {
    data = JSON.parse(request.responseText);
    console.log(data);
    $("#JsonParser").autocomplete({
        source: data,
        select: function (e, ui) {
            $(this).val('');
            JsonRecieve(ui.item.value);
            return false;
        }

    });

}
request.send();
