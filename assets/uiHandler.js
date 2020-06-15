
$(document).ready(function() { 




    p = presets;

    $("#w-btn-test").click(function(event) {
        //MODAL WARNING SHOW CLICK OUTSIDE HIDE
        p.
    });

    $("#w-btn-clear").click(function(event) {
        //MODAL WARNING SHOW CLICK OUTSIDE HIDE
        p.clearLS();
    });

    /////////// AUTOCOMPLETE START ////////////
    //cs = cityStorage; >>>> Large File 
    cc = cityContainerSmall;

    let sugg = [];
    let lst1 = {};
    let lst2 = {};   
    let input = "";
    let autolock = 0;

    $("#sidenav-search").keyup(function() {

        input = $("#sidenav-search").val();
        sugg = cc.filter(function(city) {
            return city.name.toLowerCase().startsWith(input.toLowerCase());
        });
        let xyz = "";
        for(let i=0;i<sugg.length;i++) {
            let indx1 = `${sugg[i].name} ${sugg[i].state} ${sugg[i].country}`;
            lst1[indx1] = null;
            let indx2 = `${sugg[i].name} ${sugg[i].state} ${sugg[i].country}`;
            lst2[indx2] = `${sugg[i].id}`;
        }
    });

    $('input.autocomplete').autocomplete({
        data: lst1,
        onAutocomplete: function(txt) {
            sendItem(txt);
        },
        limit: 20
    });

    function sendItem(val) {
        console.log(lst2[val]);
    };

    if(input === '') {
        $('input.autocomplete').empty();
    };
    /////////// AUTOCOMPLETE END ////////////

    $("#sidenav-clearsearch").click(function(event) {
        $("#sidenav-search").val("");
    });

    function initialState() {
        console.clear();
    };

    initialState();

});