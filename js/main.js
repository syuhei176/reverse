(function(){
    var milkcocoa = new MilkCocoa("https://io-ehz546bne.mlkcca.com:443/");
    var ds = milkcocoa.dataStore('reverse').child('game1');
    var map = new ReverseMap(ds);
    create_session(function(index) {
        if(index == 1) {
            map.init(ReverseMap.WHITE);
        }else{
            map.init(ReverseMap.BLACK);
        }
    });
    function create_session(cb) {
        var ts = new Date().getTime();
        ds.child("session").on("set", function(e) {
            if(e.id == "de") {
                if(ts != e.value.ts) {
                    //２番目に待っていた人
                    cb(2);
                }
            }else if(e.id == "p1") {
                if(ts != e.value.ts) {
                    //最初に待っていた人
                    ds.child("session").set("de", {ts : ts});
                    cb(1);
                }
            }
            console.log("a");
        });
        ds.child("session").set("p1", {ts : ts});

    }
}())