(function(){
    var milkcocoa = new MilkCocoa("https://io-ehz546bne.mlkcca.com:443/");
    var ds = milkcocoa.dataStore('reverse').child('game1');
    var map = new ReverseMap(ds);
    map.init();
    map.enemy(function(data) {
        return {x : 3, y : 3};
    });
}())