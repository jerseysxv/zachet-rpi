
function onClientLoad() 
{
    gapi.client.load('youtube', 'v3', gapi.client.setApiKey('AIzaSyBYyfbiXMSFWmfVYgRIEK4afZHfAibKFXI'));
}
 
function search() 
{
    var query = document.getElementById('query').value;
    // Use the JavaScript client library to create a search.list() API call.
    var request = gapi.client.youtube.search.list({
        part: 'snippet',
		maxResults: 20,
        q:query
    });
    // Send the request to the API server, call the onSearchResponse function when the data is returned
    request.execute(display);
}

function display(response) 
{	
    var rstring = JSON.stringify(response, '', 2);
	var helpme = JSON.parse(rstring);
	var idk = "";
	helpme.items.forEach(function(item,i,arr)
	{
		idk = idk + '<a class="item" href="https://www.youtube.com/watch?v=' + item.id.videoId + '">' + '<img src="' + item.snippet.thumbnails.default.url +'">' + '<br>' + '<p>' + item.snippet.title + '</p>' + '<br>' + '<p>' + item.snippet.description + '</p>' + '<br>' + '<p>' + item.snippet.channelTitle + '</p>' + '</a>' ;
	});
	document.getElementById('response').innerHTML = idk;
	//document.getElementById('response').innerHTML = rstring;
	
}

window.token = '';
window.scrolling = true;
window.mouse = false;
window.xf = 0;
window.xprev = 0;
window.less = true;
window.right = true;
window.flag = true;


document.onscroll = function() 
{
	var width = document.documentElement.clientWidth;
	search();
	scrolling = false;
}

 document.onmousedown = function()
{
    xf = event.clientX;
    mouse = true;
}

document.onmouseup = function()
{
    mouse = false;
    xprev = 0;
    xf = 0;
    flag = true;
}

document.onmousemove = function()
{
	if (mouse)
	{
		if (flag)
			xprev = event.clientX;
		document.body.onselectstart = function(){return false}; //отключение выделения текста
		x = event.clientX;
		if (x < xprev && left)
		{
			xf = xprev
			left = false;
			right = true;
		}
		if (x > xprev && right)
		{ 
			left = true;
			right = false;
			xf = xprev;
		}
		window.scrollBy (-((x-xf)/20),0);
		xprev = x;
		flag = false;
	}
}
