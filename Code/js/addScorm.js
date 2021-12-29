var barsV;
var scorm  = pipwerks.SCORM;
scorm.version = "2004";

window.onload = InitS;

function InitS()
{
	
    // INIT SCORM CONNECTION
	scorm.connection.initialize();
	
	var suspend = scorm.get("cmi.suspend_data");
    sessionStorage.setItem("bSwitchingToLocation", false); // no saved location
	if(suspend != 'null')
	{
        if (suspend.length > 2)
        {
            sessionStorage.setItem("bSwitchingToLocation", true); // location was saved 
            console.log("IN");
            HandleString(suspend);
        }
	}
}


//Double-check to ensure LMS connection has terminated
window.onunload = function (){
	
	if(scorm.connection.isActive)
    {
		SaveVs();
		scorm.quit();
	}
}




function SaveVs()
{
    // checking as well if there is something at all to be saved 
    if (!(sessionStorage.getItem("barArray") == null || sessionStorage.getItem("barArray") == 'null'))
    {

        barsV = JSON.parse(sessionStorage.getItem("barsV")); // boolean array of the screen,contains true in the right index if completed

        // if user started using the lomda
        if(barsV != null || barsV != 'null')
        {
            var bIsDone = true;

            // Runs on Vs array and checks if the user finished the lomda
            for (var scan = 0; scan < barsV.length; scan ++)
            {
                // if one of the bars is not checked user did not finish
                if (!barsV[scan])
                {
                    bIsDone = false;
                }
            }


            var success;  
            if (bIsDone) // If the user finished the lomda
            {
                success = scorm.set("cmi.completion_status", "completed");

                if(success)
                {
                    scorm.save();
                }
            }
            else
            {
                success = scorm.set("cmi.completion_status", "incomplete");	

                if(success)
                {
                    scorm.save();
                }
            }

            // saves the wanted inforamtion 
            var StringBarsV = JSON.stringify(barsV);
            var CurrentLocation = String(sessionStorage.getItem("ScreenNum")) +","+String(sessionStorage.getItem("FrameNum"));
            var SuperString = StringBarsV + "+" + CurrentLocation;
            var successSuspend = scorm.set("cmi.suspend_data", SuperString);
            if(successSuspend)
            {
                scorm.save();
            }
        }
        else // if the user did not even start the lomda
        {
            success = scorm.set("cmi.completion_status", "incomplete");	
            console.log("Am I true? " + success);
            if(success)
            {
                scorm.save();
            }
        }
    }
}

// breaks down the input to familiar pattern 
function HandleString(NewData)
{
    // group 1 - barsV, group 2 - last location in the lomda
    var ArrString = NewData.split('+');

    // setting up the barsV so it will be used in the web 
    sessionStorage.setItem("barsV",(ArrString[0]));
    
    // splits up the location to screen num and frame num
    var SavedLocation = ArrString[1].split(',');
    
    // define clear variables
    SavedScreenNum = SavedLocation[0];
    SavedFrameNum = SavedLocation[1];
    
    //set it up to sessionStorage for global use in the web 
    sessionStorage.setItem("ScreenNum" , SavedScreenNum);
    sessionStorage.setItem("FrameNum" , SavedFrameNum);
    
    console.log("Saved data:");
    console.log("BarsV= " + JSON.parse(sessionStorage.getItem("barsV")));
    console.log("ScreenNum= " + sessionStorage.getItem("ScreenNum"));
    console.log("FrameNum= " + sessionStorage.getItem("FrameNum"));
}
    
