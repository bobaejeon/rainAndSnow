/* global Module */
Module.register("rainAndSnow",{
	defaults: {
		location: false,
		locationID: false,
		apiKey: "",
		apiBase: "https://api.openweathermap.org/data/2.5/weather",
		animationSpeed: 1000,
		updateInterval: 10 * 60 * 1000, // every 10 minutes
	},
	// Define required scripts.
	getScripts: function() {
		return ["moment.js"];
	},

	// Define required scripts.
	getStyles: function() {
		return ["rainAndSnow.css"];
	},
	
	// No translations
	getTranslations: function() {
		return false;
	},
	
	// Define start sequence.
	  start: function() {
	    Log.info("Starting module: " + this.name);
	
	    // Set locale.
	    moment.locale(config.language);
	
	    this.type = null;
		this.icon = null;
		this.loaded = false;
		this.initialDelay = 0;
		this.retryDelay = 2500;
		this.scheduleUpdate(this.initialDelay);
	  },
  
	getDom: function(){
		var wrapper = document.createElement("div");
	    if (this.config.apikey === "") {
	      wrapper.innerHTML = "Please set the valid APIKEY: " + this.name + ".";
	      wrapper.className = "dimmed light small";
	      return wrapper;
	    }
	
	    if (!this.loaded) {
	      wrapper.innerHTML = "LOADING";
	      wrapper.className = "dimmed light small";
	      return wrapper;
	    }
	    console.log(this.type.toLowerCase());
	    if(this.type === "Rain" || this.type === "Drizzle"){
			wrapper.className = this.type.toLowerCase();
			this.icon = "/";
			for(var i=0;i<10;i++){
					wrapper.innerHTML += "<div class ='show " + wrapper.className + "'>"+this.icon+"</div>";
				}
		}
		else if(this.type === "Snow"){
			wrapper.className = "snow";
				this.icon = "./modules/rainAndSnow/snowflakes/snowflake.png";
				for(var i=0;i<10;i++){
					wrapper.innerHTML += "<img class ='show snowflake' src='"+this.icon+"'>";
				}
		}
		return wrapper;
	},
	
	updateWeather: function(){
		if (this.config.apiKey === "") {
			Log.error("RainAndSnow: Please set APIKEY");
			return;
		}
		var url = this.config.apiBase + this.getParams();
		var self = this;
		var retry = true;

		var request = new XMLHttpRequest();
		request.open("GET", url, true);
		request.onreadystatechange = function() {
			if (this.readyState === 4) {
				if (this.status === 200) {
					self.processWeather(JSON.parse(this.response));
				} else if (this.status === 401) {
					self.updateDom(self.config.animationSpeed);

					Log.error(self.name + ": Incorrect APIKEY.");
					retry = true;
				} else {
					Log.error(self.name + ": Could not load weather.");
				}

				if (retry) {
					self.scheduleUpdate((self.loaded) ? -1 : self.retryDelay);
				}
			}
		};
		request.send();
	},
	scheduleUpdate: function(delay){
		var nextLoad = this.config.updateInterval;
		if (typeof delay !== "undefined" && delay >= 0) {
			nextLoad = delay;
		}
		var self = this;
		setTimeout(function() {
			self.updateWeather();
		}, nextLoad);
	},
	processWeather: function(data){
		if(!data) return;
		this.type = data.weather[0].main;
		this.loaded = true;
		this.updateDom(this.config.animationSpeed);
	},
	getParams: function(){
		var params = "?";
		if(this.config.locationID){
			params += "id="+this.config.locationID;
		}
		else if(this.config.location){
			params += "q="+this.config.location;
		}
		params += "&appid="+this.config.apiKey;
		return params;
	},
});
