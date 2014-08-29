(function(){
    var milkcocoa = new MilkCocoa("https://io-ehz546bne.mlkcca.com:443/");
    var ds = milkcocoa.dataStore('reverse').child('game1');
    var map = new ReverseMap(ds);
    create_session(function(index) {
        if(index == 1) {
            map.init(ReverseMap.WHITE);
        }else if(index == 2) {
            map.init(ReverseMap.BLACK);
        }else{
            alert("３人目です");
        }
    });
    function create_session(cb) {
        var ts = new Date().getTime();
        var n = 2;
        ds.child("session").on("set", function(e) {
            if(e.id == "de") {
                if(ts != e.value.ts) {
                    //２番目に待っていた人
                    cb(e.value.n);
                }
            }else if(e.id == "p1") {
                if(ts != e.value.ts) {
                    //最初に待っていた人
                    ds.child("session").set("de", {ts : ts, n : n});
                    n++;
                    cb(1);
                }
            }
        });
        ds.child("session").set("p1", {ts : ts});

    }
}())