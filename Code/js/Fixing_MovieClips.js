// This file fixes movieclips so they will be setted to their last frame, when entering a page from "Back"
var MainRoot;
var _dontFromBack = ["Msg", "exit2", "v", "Lama_Window", "Model_Hakarchon_Window", "Model_Hamaagalim_Window"]; // MovieClips that don't need to be switched to their last frame 

// this function sets listener for export root + sets up the instance names. 
function Check_For_Back_Fix_Names(Root)
{
    MainRoot = Root;
    Fix_Names();
    // Checking if we got to this page by pressing the "back" link 
    if (sessionStorage.getItem("FromBack") == "true")
    {
        MainRoot.addEventListener("tick", FixMc);
    }
}

// Important note!! in the first "tick" (loading) of the page, it didn't update all the details about the stage's root, therefore - there is about milisecond at the start in which, if you check for the numchildren, you will get 0. That's why this function was created that way, to wait a few ticks and make sure the page has been completly loaded.
function FixMc()
{
    if (MainRoot.numChildren != 0)
    {
        goToEnd(MainRoot);
         
        MainRoot.removeEventListener("tick", FixMc);
        
    }
    
}

// Gal's function !  (setting all the mcs, that aren't written in "dontFromBack" to their last frame)
function goToEnd(mc)
{
        
        var i;
        for (i = 0; i < mc.numChildren; i++)
        {
            
           
            if (mc.getChildAt(i) instanceof createjs.MovieClip && mc.getChildAt(i).hitArea == null && mc.getChildAt(i).name != "Maavaron" )
            {
                //Tamar Added This to prevent MovieClips from Opening when backing
                if(mc.getChildAt(i).name != null && !(checkName(mc.getChildAt(i).name,_dontFromBack)))
                {
                 //console.log(mc.getChildAt(i).name);
                mc.getChildAt(i).gotoAndStop(mc.getChildAt(i).totalFrames - 1);
                goToEnd(mc.getChildAt(i));
               
                }
            }
           
            if (mc.getChildAt(i) instanceof createjs.MovieClip)
            {
		      if (mc.getChildAt(i).name != null && checkName(mc.getChildAt(i).name,_dontFromBack))
		          {
                	 
                     
                	  mc.getChildAt(i).gotoAndStop(0);
                      //goToEnd(mc.getChildAt(i));
                      
                      
		          }
            }
            
                
            
                    
            
        }
}


/*
Note: Animate does not save the instance name you've given as a name property, like we're used to from as3.
The movie clips on stage are created as properties of the exportRoot variable and therefore they don't have names */
 
// This function goes over the mcs on the stage and sets their instance names to their name property 
function Fix_Names()
{
    
    // scanning all the properties in the main root (all mcs on stage)
    for (key in MainRoot)
    {
        if (MainRoot[key] != null)
        {
           MainRoot[key].name = key;
            
            // giving listener to the end of Maavaron 
            if (key === "Maavaron")
            {
                // When Maavaron is done, switch to the next Frame.
                MainRoot[key].addEventListener("tick", autoNext);
                

            }
        }
    }
}

// Moving a frame when maavaron finishes 
function autoNext()
{
    if (MainRoot.Maavaron.currentFrame == (MainRoot.Maavaron.totalFrames - 1) || MainRoot.Maavaron.totalFrames == 0)
    {
        MainRoot.Maavaron.removeEventListener("tick",autoNext);
        // Updating the barArray
        var barArray = JSON.parse(sessionStorage.getItem("barArray")); // how much frames did we pass in each screen
        var nScreenNum = sessionStorage.getItem("ScreenNum"); // num of current screen (according to the array)
        

        sessionStorage.setItem("ShowClicks", true);
        
                               
        MainRoot.gotoAndStop(1);
        
        // updates the frame num 
        sessionStorage.setItem("FrameNum", Root.currentFrame);
        
        // Same if that we have in tracking_subjects.js, checks if we moved on a fame and updates the array 
        if (MainRoot.currentFrame + 1 == Number(barArray[nScreenNum]) + 1)
        {
            barArray[nScreenNum] ++;
            sessionStorage.setItem("barArray", JSON.stringify(barArray));
        }
        
        // Setting the variable to true, so We'll know to not switch all movieclips to the last frame 
        sessionStorage.setItem("FromBack", false);
        sessionStorage.setItem("LastFrame", false);
        
        // posts message to the bar to update the clicks counter 
        parent.postMessage("Fix Info", "*");
        
         presentionUpDateInfo();
    }
}

// Function from "TheStage" 
function checkName(element, arr)
{
	var isMatch = false;
	for (var i = 0; i < arr.length && !isMatch; i++) 
	{
		if (String(arr[i]) == element.substring(0, String(arr[i]).length))
		{
			isMatch = true;
		}
	}

	return isMatch;
}

//was build 
function CheckArray(arr, item)
{
    var isFound = false;
    for (var i=0; i < arr.length; i++)
    {
        if (item === arr[i])
        {
            isFound = true;
            return isFound;
        }
    }
    
    return isFound;
}
        

