//the functions below are used inside the animate, in the wanted frame for the video 

// This function creates a div that contains a video 
function MakeDiv(top, right, w , h , src)
{
	// created element
	var d = document.createElement("div");
	
	// defines div style
	d.style.position = "absolute";
    
	d.style.left = 0;
	d.style.top = 0;
    
	d.id = "Vid_Container";
    

	d.style.width = "100%";
	d.style.height = "100%";
	
    
	// adds the video tag
	d.innerHTML = "<video id = 'vid' controls allowfullscreen><source src=" + src + " type='video/mp4'></video>";
	
	
    
    
	// adds div to "animate container" - created by animate (canvas - the default id given by animate to the canvas element)
	canvas.parentNode.appendChild(d);
    
    // vid tag, inside the container 
    vid.style.position = "absolute";
    vid.style.width = String([w+ "%"]);
    vid.style.top = String([top+ "%"]);
    vid.style.right = String([right+ "%"]);
    vid.style.height = String([h+ "%"]);
    
    //Creating DOMElement for setting the video, in addition to getting it's reference in the page 
	var dcjs = new createjs.DOMElement(d);
    
	
	// returns the child so we can use it later (like remove it or so)
	return (dcjs);
    
}


// This function removes the created video
function RemoveDiv(ref)
{
	if (!ref)
	{
		return;
	}
    
    //getting the video tag in the page from the earlier reference 
	var elem = ref.htmlElement;
    
    // removing it from " animate container" and the stage 
    elem.parentNode.removeChild(elem);
    
    // setting the movie to undefined for reset 
    movie = undefined;
}