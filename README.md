# MagicMirror² Module: rainAndSnow
Displays raining, drizzling, or snowing animations depends on the weather type.
<img src="https://postfiles.pstatic.net/MjAyMDA2MjFfODMg/MDAxNTkyNjczNTQ1NTIx.wfFInbGKTyTHn-6ELdPao9GZO7IpDAkC47eQdjSQfZYg.gOV6vPerzFr-CDksIqmWIpg8yT73N3gaeAEZBCeXhUkg.PNG.bobaeiscool/SE-5bdf6c6e-628e-4a99-bb01-6127faeeb899.png?type=w773" width=100%>

This module is based on <a href="https://openweathermap.org/guide">OpenWeatherMap API</a>.<br>Get an APIkey, write it with location information in config, then it's all done.

## Installation
    cd ~/MagicMirror/modules
    git clone https://github.com/bobaejeon/rainAndSnow.git
    cd rainAndSnow
    npm install

## Configuration
Add this module to the modules array in the config/config.js.    You can copy this and make some changes:
``````
    {
        module: 'rainAndSnow',
        position: "fullscreen_above",
        config: {
                    //stated below
                }
    },
``````

### Configuration options
|Option|Description|Possible values|
|------|---|---|
|apiKey|[required] The OpenWeatherMap APIKey to get the weather.<br><br><b>Default:</b> null|APIkey you've got from OpenWeatherMap|
|location|[required] The location name to get the weather.<br><br><b>Default:</b> null|"Seoul"|
|locationID|[required] The locationID to get the weather.<br><br><b>Default:</b> null<br><a href="http://bulk.openweathermap.org/sample/">Here you can find the list of cities</a><br><b>*You can choose between location and locationID</b>|"1835848"|
|updateInterval|[optional] How often the information will be updated.<br><br><b>Default:</b> 10 * 60 * 1000 // every 10 minutes|60 * 1000 // every minute|
|animationSpeed|[optional] The speed of the update animation in milliseconds. <br><br><b>Default:</b> 1000 // 1 second|500 // 0.5 second|
