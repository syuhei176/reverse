(function() {
	var s = Snap("#canvas").attr({
		width:$(window).width(),
		height:$(window).height(),
		viewBox:[0,0,400,400]});
	
	window.ReverseMap = ReverseMap;

	function setText(id, text) {
		$("#" + id).html(text);
	}

	function ReverseMap(dataStore) {
		var self = this;
		this.dataStore = dataStore;
		this.map = new Map();
		this.map.init();
		this.data = [];
		this.current_color = ReverseMap.WHITE;
		for(var i=0;i < 8*8;i++) this.data[i] = ReverseMap.EMPTY;
		this.map.click = function(x, y) {
			if(self.my_color == self.current_color)
				self.dataStore.set(x + "-" + y, {color : self.current_color});
		}
		this.dataStore.on("set", function(e) {
			var pos = e.id.split('-');
			self.put(Number(pos[0]), Number(pos[1]), e.value.color);
		});
	}

	ReverseMap.BLOCK = 0;
	ReverseMap.EMPTY = 1;
	ReverseMap.WHITE = 2;
	ReverseMap.BLACK = 3;

	ReverseMap.prototype.enemy = function(cb) {
		this.ai_script = cb;
	}

	ReverseMap.prototype.turn = function() {
		if(this.current_color == ReverseMap.WHITE) {
			this.current_color = ReverseMap.BLACK;
			setText("turn", "黒の番");
		}else if(this.current_color == ReverseMap.BLACK) {
			this.current_color = ReverseMap.WHITE;
			setText("turn", "白の番");
		}
	}

	ReverseMap.prototype.init = function(my_color) {
		this.my_color = my_color;
		if(this.my_color == ReverseMap.WHITE) setText("my-color", "あなたは白です。");
		else if(this.my_color == ReverseMap.BLACK) setText("my-color", "あなたは黒です。");
		this.change_color(3, 3, ReverseMap.BLACK);
		this.change_color(3, 4, ReverseMap.WHITE);
		this.change_color(4, 3, ReverseMap.WHITE);
		this.change_color(4, 4, ReverseMap.BLACK);
	}

	ReverseMap.prototype.put = function(x, y, color, fire) {
		if(this.check(x, y, color)) {
			this.change_color(x, y, color);
			this.turn();
		}
	}

	ReverseMap.prototype.check = function(x, y, color) {
		return this.check_part(x-1, y, color, [-1, 0])>1 ||
		this.check_part(x+1, y, color, [1, 0])>1 ||
		this.check_part(x, y+1, color, [0, 1])>1 ||
		this.check_part(x, y-1, color, [0, -1])>1 ||
		this.check_part(x-1, y-1, color, [-1, -1])>1 ||
		this.check_part(x+1, y+1, color, [1, 1])>1 ||
		this.check_part(x-1, y+1, color, [-1, 1])>1 ||
		this.check_part(x+1, y-1, color, [1, -1])>1;
	}

	ReverseMap.prototype.check_part = function(x, y, color, d) {
		var col = this.get_color(x, y);
		if(col == ReverseMap.BLOCK) {
			return 0;
		}else if(col == ReverseMap.EMPTY) {
			return 0;
		}else{
			if(col == color) {
				return 1;
			}else{
				var c = this.check_part(x + d[0], y + d[1], color, d);
				if(c > 0) {
					this.change_color(x, y, color);
					return c + 1;
				}
			}
		}
		return 0;
	}

	ReverseMap.prototype.change_color = function(x, y, color) {
	    this.map.put(x, y, color);
		this.set_color(x, y, color);
	}

	ReverseMap.prototype.get_color = function(x, y) {
		if(x >= 0 && y >= 0 && x < 8 && y < 8)
			return this.data[x + y * 8];
		else
			return ReverseMap.BLOCK;
	}

	ReverseMap.prototype.set_color = function(x, y, color) {
		if(x >= 0 && y >= 0 && x < 8 && y < 8) {
			this.data[x + y * 8] = color;
			return color;
		}else{
			return ReverseMap.BLOCK;			
		}
	}

	function Map() {

	}

	Map.prototype.init = function() {
		for(var i=0;i < 8;i++)
			for(var j=0;j < 8;j++)
				this.putEmpty(i, j);
	}

	Map.prototype.put = function(x, y, color) {
					console.log(x, y, color);
		var elem = s.circle(25, 25, 25);
		elem.attr({
		    fill: color==ReverseMap.WHITE ? "#fff" : "#000",
		    stroke: "#000",
		    strokeWidth: 5
		});
		elem.transform("translate("+x*50+","+y*50+")");
	}

	Map.prototype.putEmpty = function(x, y) {
		var self = this;
		var elem = s.rect(0, 0, 50, 50);
		elem.attr({
		    fill: "#0f0",
		    stroke: "#000",
		    strokeWidth: 5
		});
		elem.transform("translate("+x*50+","+y*50+")");
		elem.click(function() {
			self.click(x, y);
		});
	}


} ())
