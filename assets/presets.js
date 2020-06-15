
let presets = {


    clearLS: function() {
        localStorage.clear();
    },

    clearLSLoadTestPresets: function() {
        localStorage.clear();

        presetId = "";
        presetCityName = "";
        presetDefault = "";
        presetMoment = "";

        for(let i=0;i<4;i++) {

            presetDefault = 0;
            if (i === 0) {
                presetCityName = "Portland OR US";
                presetDefault = 1;
            }
            else if (i === 1) {
                presetCityName = "Mexicali  MX";
            }
            else if (i === 2) {
                presetCityName = "Charlotte NC US";
            }
            else if (i === 3) {
                presetCityName = "Montevideo  UY";
            }
            else if (i === 4) {
                presetCityName = "Cusco  PE";
            }
            else {
                console.log("NA clearLSLoadTestPresets");
            }


        }
    }
};