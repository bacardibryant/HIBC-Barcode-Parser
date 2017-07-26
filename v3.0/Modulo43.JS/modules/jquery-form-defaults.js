/*
    Dependencies:
        jquery
        jquery.ui
        jquery.ui.timepicker

*/

var isValid = window.jQuery && typeof(jQuery) !== 'undefined';

// tried to dynamically load jquery however the load occurs too late. will investigate.
//if (!isValid){
//    try {
//        var jq = document.createElement('script'); jq.type = 'text/javascript';
//        jq.src = '//cdn.jsdelivr.net/g/jquery';
//        document.getElementsByTagName('head')[0].appendChild(jq);
//        isValid = true;
//    } catch (ex) {
//        isValid = false;
//    }
//}

if (isValid) {
    $(document).ready(function() {

        // focus on the first visible and enabled input field or textarea
        try {
            $(":input:visible:enabled").each(function() {
                if (($(this).attr('type') == 'text') && ($(this).is('input'))) {
                    $(this).focus();
                    return false;
                }
                if ($(this).is('textarea')) {
                    $(this).focus();
                    return false;
                }
                return false;
            });
        } catch (ex) {
            if (typeof(console) !== 'undefined' && console != null) {
                console.log("Unable to bind focus to textboxes and text areas.");
            }
        }

        // if the input type is text, then on click, select all text.
        try {
            $(":input:visible:enabled").each(function() {
                if (($(this).attr('type') == 'text') && ($(this).is('input'))) {
                    $(this).click(function() {
                        $(this).select();
                    });
                }
            });
        } catch (ex) {
            if (typeof(console) !== 'undefined' && console != null) {
                console.log("Unable to bind select to text input.");
            }
        }

        // if the field is of type date or datetime, add the jquery.ui datepicker.
        if ($.fn.datepicker) {
            try {
                $('[id*="Date"],[type="date"]').datepicker({
                    changeMonth: true,
                    changeYear: true
                });
            } catch (ex) {
                if (typeof (console) !== 'undefined' && console != null) {
                    console.log("Unable to bind datepicker to text input.");
                }
            }
        } else {
            if (typeof (console) !== 'undefined' && console != null) {
                console.log("jQuery datepicker is not loaded.");
            }
        }

        if ($.fn.datepicker) {
            try {
                $('[id*="datetime"],[type="datetime"]').datepicker({
                    changeMonth: true,
                    changeYear: true
                });
            } catch (ex) {
                if (typeof(console) !== 'undefined' && console != null) {
                    console.log("Unable to bind jquery datepicker to text input.");
                }
            }
        } else {
            if (typeof (console) !== 'undefined' && console != null) {
                console.log("jQuery datepicker is not loaded.");
            }
        }

        // if the field is of type time, add the jquery timepicker timepicker
        if ($.fn.timepicker) {
            try {
                $('[id*="Time"],[type="Time"]').timepicker({
                    defaultTime: '08:00',
                    minutes: {
                        starts: 0,
                        ends: 45,
                        interval: 15
                    },
                    showPeriod: true,
                    showLeadingZero: false
                });
            } catch (ex) {
                if (typeof (console) !== 'undefined' && console != null) {
                    console.log("Unable to bind jquery timepicker to text input.");
                }
            }
        } else {
            if (typeof (console) !== 'undefined' && console != null) {
                console.log("jQuery timepicker plugin is not loaded");
            }
        }
    });

} else {
    if (typeof (console) !== 'undefined' && console != null) {
        console.log("Unable to load jquery.");
    }
}