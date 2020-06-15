
let presets = {

    sortLS: function() {
        //puts default in first slot, remaining slots are arranged according to moment
        let lock = false;
        let array = [];
        if(localStorage.getItem('weatherPresetsLS')) {
            var buffer = JSON.parse(localStorage.getItem('weatherPresetsLS'));
            for(var i=0; i<buffer.length; i++) {
                array.push(buffer[i]);
            }
        }

        let def = {};
        for(var j=0; j<array.length; j++) {
            //console.log(array[j]);
            if(array[j].pre_def === 0) {
                def = array[j];
                array.splice(j,1);
                lock = true;
                break;
            }
        }
        array.sort((a,b)=> new Date(String(b.pre_mom)).getTime() - new Date(String(a.pre_mom)).getTime());
        if(lock) {
            array.unshift(def);
        }
        localStorage.setItem('weatherPresetsLS', JSON.stringify(array));
        //console.log(JSON.parse(localStorage.getItem('weatherPresetsLS')));

        if(lock) {
            return "DA"; //default assigned
        }
        else {
            return "DNA"; /// default not assigned 
        }
    },

    getDefault: function() {
        const array = [];
        let lock = false;
        if(localStorage.getItem('weatherPresetsLS')) {
            var buffer = JSON.parse(localStorage.getItem('weatherPresetsLS'));
            for(var i=0; i<buffer.length; i++) {
                    array.push(buffer[i]);
                }
            }
        //localStorage.setItem('weatherPresetsLS', JSON.stringify(array));
        //console.log(JSON.parse(localStorage.getItem('weatherPresetsLS')));

        let def = {};
        for(var i=0; i<array.length; i++) {
            if(array[i].pre_def === 0) {
                def = array[i];
                lock = true;
                break;
            }
        }
        
        if(lock) {
            //Default found ID returned
            return def.pre_id;
        }
        else {
            //Default Not Found
            return "DefNA";
        }
    },

    unsetDefault: function(presetId) {
        /// finds city in array by ID 
        /// updates TimeStamp and Default = True
        var lock = false;
        if(localStorage.getItem('weatherPresetsLS')) {
            var buffer = JSON.parse(localStorage.getItem('weatherPresetsLS'));
            for(var i=0; i<buffer.length; i++) {
                //array.push(buffer[i]);
                if(buffer[i].pre_id === presetId) {
                    if(buffer[i].pre_def === 1) {
                        //Value already set 
                        return "DefPrevUnset"; 
                    }
                    else {
                        buffer[i].pre_mom = moment();
                        buffer[i].pre_def = 1; /// Default unset
                        lock = true;
                        break;
                    }
                }
            }
            if(lock) {
                //OK
                localStorage.setItem('weatherPresetsLS', JSON.stringify(buffer));
                //console.log(JSON.parse(localStorage.getItem('weatherPresetsLS')));
                this.sortLS();
                return "UnsetOK";
            }
            else {
                //ID NOT FOUND
                return "IdNotFound";
            }
        }
        else {
            //NO RECORDS IN LS
            return "LSEmpty";
        }
    },

    setDefault: function(presetId) {
        /// finds city in array by ID 
        /// updates TimeStamp and Default = True
        var lock = false;
        if(localStorage.getItem('weatherPresetsLS')) {
            var buffer = JSON.parse(localStorage.getItem('weatherPresetsLS'));
            for(var i=0; i<buffer.length; i++) {
                //array.push(buffer[i]);
                if(buffer[i].pre_id === presetId) {
                    if(buffer[i].pre_def === 0) {
                        //Value already set 
                        return "DefPrevSet"; 
                    }
                    else {
                        buffer[i].pre_mom = moment();
                        buffer[i].pre_def = 0; /// Default Set
                        lock = true;
                        break;
                    }
                }
            }
            if(lock) {
                //OK
                localStorage.setItem('weatherPresetsLS', JSON.stringify(buffer));
                //console.log(JSON.parse(localStorage.getItem('weatherPresetsLS')));
                this.sortLS();
                return "setOK";
            }
            else {
                //ID NOT FOUND
                return "IdNotFound";
            }
        }
        else {
            //NO RECORDS IN LS
            return "LSEmpty";
        }
    },

    saveToLS: function(presetId, presetMoment, presetCityName, presetDefault) {
        //from UI we will always set Default to 1 
        //then use set unset default to modify 
        const array = [];
        let new_entry = {
            'pre_id' : presetId,
            'pre_mom' : presetMoment,
            'pre_cityname' : presetCityName,
            'pre_def' : presetDefault
        };
    
        if(localStorage.getItem('weatherPresetsLS')) {
            var buffer = JSON.parse(localStorage.getItem('weatherPresetsLS'));
            for(var i=0; i<buffer.length; i++) {
                    array.push(buffer[i]);
                }
            }
        array.push(new_entry);
        localStorage.setItem('weatherPresetsLS', JSON.stringify(array));
        //console.log(JSON.parse(localStorage.getItem('weatherPresetsLS')));

        if(array.length>1) {
            return this.sortLS();
        }
        else {
            return "LSEmpty";
        }
    
    },

    clearLSLoadTestPresets: function() {
        this.clearLS();
        let resetId = "";
        let presetCityName = "";
        let presetDefault = 1;
        let presetMoment = "";

        for(let i=0;i<5;i++) {
            presetMoment = moment();
            if (i === 0) {
                presetCityName = "Portland OR US";
                presetId = 5746545;
            }
            else if (i === 1) {
                presetCityName = "Mexicali  MX";
                presetId = 3996069;
            }
            else if (i === 2) {
                presetCityName = "Charlotte NC US";
                presetId = 4460243;
            }
            else if (i === 3) {
                presetCityName = "Montevideo  UY";
                presetId = 3441575;
                //presetDefault = 0;
            }
            else if (i === 4) {
                presetCityName = "Cusco  PE";
                presetId = 3941583;
            }
            else {
                console.log("NA clearLSLoadTestPresets");
            }
            //console.log(`ADDED ${presetCityName}`);
            //console.log(this.saveToLS(presetId,presetMoment,presetCityName,1));
            //console.log(`GET DEFAULT >>>>> ${this.getDefault()}`);
            //console.log(`SET DEF >>>>> ${this.setDefault(3996069)}`);
            //console.log(`UNSET DEF >>>>> ${this.unsetDefault(3996069)}`);
        }
        //console.log("FINALLL");
        //console.log(JSON.parse(localStorage.getItem('weatherPresetsLS')));
    },

    clearLS: function() {
        localStorage.clear();
    }

};