(function () {

    function rangeInputChangeEventHandler(e) {
        var minBtn = $(this).parent().children('.min'),
            maxBtn = $(this).parent().children('.max'),
            range_min = $(this).parent().children('.range_min'),
            range_max = $(this).parent().children('.range_max'),
            minVal = parseInt($(minBtn).val()),
            maxVal = parseInt($(maxBtn).val()),
            origin = $(this).context.className;

        if (origin === 'min' && minVal > maxVal - 5) {
            $(minBtn).val(maxVal - 5);
        }
        var minVal = parseInt($(minBtn).val());
        /* $(range_min).html(addSeperator(minVal*1000) + ' руб');*/
        $(range_min).html(minVal.toLocaleString() + ' MAD');


        if (origin === 'max' && maxVal - 5 < minVal) {
            $(maxBtn).val(5 + minVal);
        }
        var maxVal = parseInt($(maxBtn).val());
        console.log("maxVal : ", maxVal);
        /*$(range_max).html(addSeperator(maxVal*1000) + ' руб');*/

        $(range_max).html(maxVal.toLocaleString() + ' MAD');
    }

    $('input[type="range"]').on('input', rangeInputChangeEventHandler);
})();