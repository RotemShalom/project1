
var Root;
var BarSizePixels = 80;
var DifferentPage = false; // To know if the page was changed, only if we stay in the same page we send a message to the parent to update info
sessionStorage.setItem("isOpen", false); // checking if harhava is open/ exit window 



// Setting up the variable for easier use of the saved item in the storage 
var ScreenArray = JSON.parse(sessionStorage.getItem("ScreenArray"));
var MaxScreenNum = (JSON.parse(sessionStorage.getItem("ScreenArray")).length); // The number of screens you have (Including Start!)




var CurrentScreen;



function initializeVariables(OriginalRoot)
{
    Root = OriginalRoot; // getting export root from the page 
    Root.autoReset = true; //to prevent from animate to loop over all the frames in the root  (animate bug) 
    moveToLastFrame();// For switching to the last frame of the root 
    AddScriptFile(); // adding more needed scripts to the page 
    
     BildShowDive(); // Crate the trakong window in the loading of the page
    
    
    /*SCORM ADDING */
    // in case the saved screen was loaded, we need to complete the process by showing the saved frame 
    if (sessionStorage.getItem("bSwitchingToLocation") == "true")
    {
        Root.gotoAndStop(sessionStorage.getItem("FrameNum"));
        sessionStorage.setItem("bSwitchingToLocation", false); // reseting the variable 
    }
        
        
    /* SCORM ADDING DONE*/
    // fixing the location
    updateLocation();
    
    // saves the number of the frames in the current screen
    sessionStorage.setItem("TotalFrames", Root.totalFrames);
    
    // posts message to the bar to update the clicks counter 
    parent.postMessage("Fix Info", "*");
    
    //Listening to the Back/Next commands from the Navigation Bar in the index window (the parent)
    window.addEventListener("message", HandleCommand);
    
    
    CurrentScreen = sessionStorage.getItem("ScreenNum"); 
    console.log("CurrentScreen= " + CurrentScreen);
    
    //Try();
    
    // responsive screen
    window.addEventListener("resize", ChangeResponsive);
    
    //first enter of the page 
    ChangeResponsive();
    
    //Checks if the user got here by using the shift+f event
      if(sessionStorage.getItem("UsedShiftF") == "true")
    {
         parent.postMessage("Enable Back", "*");
        sessionStorage.setItem("UsedShiftF",false);
        checkShiftFValidInput();
    }
}

function checkShiftFValidInput()
{
   if(Number(sessionStorage.getItem("ChangeFrameValue")) <= Number(sessionStorage.getItem("TotalFrames")))
        {
            Root.gotoAndStop((sessionStorage.getItem("ChangeFrameValue"))-1); 
            sessionStorage.setItem("FrameNum",Root.currentFrame);
        }
        
        else 
        {
             var FrameNum=prompt("This screen has " + Root.totalFrames+" frames, plaese enter a valid frame number");
             sessionStorage.setItem("ChangeFrameValue",Number((FrameNum)));
             checkShiftFValidInput(); 
        }  
}


// a copy of makeResponsive() function from Animate with the change of width, as a result of the bar 
function ChangeResponsive()
{
    //for responsive
    var preloaderDiv = document.getElementById("_preload_div_");
    
    //Updated Sizes
     var w = 1440, h = 900;
    
    //Old Sizes
    //var w = 1024, h = 740;
    
    // innerWidth considering the bar 
    var iw = window.innerWidth - Number(BarSizePixels) , ih=window.innerHeight;	
    var pRatio = window.devicePixelRatio || 1, xRatio=iw/w, yRatio=ih/h, sRatio=1;	
    sRatio = Math.min(xRatio, yRatio);
    
    // setting it up to the elements 
    canvas.width =  w*pRatio*sRatio;			
    canvas.height =  h*pRatio*sRatio;
    animation_container.style.width = preloaderDiv.style.width = [w*sRatio+'px'];	
    animation_container.style.height = preloaderDiv.style.height = [h*sRatio+'px'];
    stage.scaleX = pRatio*sRatio;			
    stage.scaleY = pRatio*sRatio;	
    fixMargin();
}


// adding the extra space to the sides of the canvas
function fixMargin()
{
    //innerWidth, considering the bar 
    var iw_withBar = window.innerWidth - Number(BarSizePixels);
    var ExtraSpace = iw_withBar - Number(animation_container.style.width.substring(0, animation_container.style.width.length - 2));
    animation_container.style.marginLeft = ExtraSpace/2 + 'px';
}
    



//Checks the content of the command and act according to it 
function HandleCommand(e)
{
    if (e.data == "Next")
    {
        Next();

    }
    else if (e.data == "Back")
    {
        Back();
        
    }   
}
    

function Back()
{
    console.log(Root);
    // if we're on map and we try to "back" - an alert will pop 
    if ( Number(CurrentScreen) == 0)
    {
        alert("First");
    }
    else
    {
        // If it's the first frame of the screen, we need to go back a page
        if (Root.currentFrame == 0)
        {
            // changing the screen according to the screen array
            window.location =ScreenArray[Number(CurrentScreen) - 1]; 
            DifferentPage = true; // loading new page 
            
             // Fixing up the variable 
            sessionStorage.setItem("ScreenNum", Number(CurrentScreen) - 1);
            sessionStorage.setItem("LastFrame", true);
                
        }
        else
        {
            // We're in the same page, it's not the first frame - therefore, we'll just change frame 
            Root.gotoAndStop(Root.currentFrame - 1);
            DifferentPage = false;
        }

        // Setting the variable to true, so We'll know to switch all movieclips to the last frame 
        sessionStorage.setItem("FromBack", true);
            
        //so it will affect the mcs in the "new" frame (switching mcs to last frame)
        FixMcs();
        
    }
    
    // updates frame
    updateLocation();
    
    FixCounting();
        
    
}

function Next()
{
    parent.postMessage("Enable Back", "*");
    // If it's the last frame of the screen, we need to switch to the next page.
    if (Root.currentFrame == Root.totalFrames - 1)
    {
        // checking if I can switch to the next page, if I'm on the last content one - a message end will pop. 
        if ((Number(CurrentScreen) + 1) < Number(MaxScreenNum))
        {
            window.location = ScreenArray[Number(CurrentScreen) + 1];  
            sessionStorage.setItem("ScreenNum", Number(CurrentScreen) +1);
            DifferentPage = true; // loading new page 

            
        }
        else
        {
            // If it's the last page, we need to open the exit window by clicking next (END) 
            sessionStorage.setItem("isOpen", true);
            
            
            // making the exit window pop 
            setLastPageExitWindow(Root);
        }
    }
    else
    {
        // יש להוריד שורה זאת מהערה כאשר יש הרחבות בפרויקט
        Check_For_Back_Fix_Names(Root);
        Root.gotoAndStop(Root.currentFrame + 1);
        DifferentPage = false;
    }
    
    // Setting the variable to true, so We'll know to not switch all movieclips to the last frame 
    sessionStorage.setItem("FromBack", false); // so we'll know not to switch all mcs to the last frame 
    sessionStorage.setItem("LastFrame", false); // so we'll know not to switch the root to the last frame 
    
    // updates frame
    updateLocation();
    
    FixCounting();
    
}

// trails after the frames (for clicks div and scorm)
function updateLocation()
{
    if (Root.Maavaron != undefined && Root.currentFrame == 0)
    {
        sessionStorage.setItem("ShowClicks", false);
        sessionStorage.setItem("FrameNum", Root.currentFrame);
    }
    else
    {
        // saves the current frame (starts from 0 )
        sessionStorage.setItem("FrameNum", Root.currentFrame);
        sessionStorage.setItem("ShowClicks", true);
    }
    presentionUpDateInfo(); // update the traking window page
}
    
// if we enter a new page, the message should be sent only in the initializeVariables function of this file, not twice.
function FixCounting()
{
        
    if (!DifferentPage)
    {
        //console.log("Enter Fix Info");
        //sending a message to the menu to fix up information
        parent.postMessage("Fix Info", "*");
       // console.log("SamePage");
        
    }
    else
    {
        parent.postMessage("Fix CurrentTotalFrames", "*");
        //console.log("sent CurrentTotalFrames");
    }
}

// the function changes the root screen to it's last frame 
function moveToLastFrame()
{
    if (sessionStorage.getItem("LastFrame") == "true" )
    {
        // hides the screen to switch frame without being noticed 
        canvas.style.visibility = "hidden";
        
        //tracking the root to know when it's done 
        Root.addEventListener("tick", CheckFrame);
        
        
        // We need to check if it's the first time this page was loaded so we can switch to it's last frame
        Root.gotoAndStop(Root.totalFrames - 1);
    }
 
}

// Checks if the root reached the last frame as intented
function CheckFrame()
{
    if (Root.currentFrame == Root.totalFrames - 1)
    {
        Root.removeEventListener("tick", CheckFrame);
        
        //waits out a little more to make sure we won't see the "jump" of the frames  
        setTimeout(Wait, 400);
       
    }
}

// Shows the canvas at last 
function Wait()
{
    canvas.style.visibility = "visible";
}
        

 /* This function contain the following scripts 
 1. Fixing_MovieClips.js
 2. KeyboardNavigation.js
*/
function AddScriptFile()
{
    var Script_For_Mc = document.createElement('script');
    var Script_For_KeyBoard = document.createElement('script');

    Script_For_Mc.src = "../Code/js/Fixing_MovieClips.js";
    Script_For_KeyBoard.src = "../Code/js/KeyboardNavigation.js";
    
    
    
    
    document.getElementsByTagName('head')[0].appendChild(Script_For_Mc);
    document.getElementsByTagName('head')[0].appendChild(Script_For_KeyBoard);
    
    // activating the function 
    Script_For_Mc.addEventListener("load", FixMcs);
    Script_For_KeyBoard.addEventListener("load", KeyBoardScript);
}

// We need to remember that everyscript needs to have an access to the stage (exportRoot of animate)
function FixMcs()
{
    Check_For_Back_Fix_Names(Root);
}


// Activates navigation with the arrow keys
function KeyBoardScript()
{
    InitKeyboard();
}





function Try()
{
    var newShape = new createjs.Rectangle(0,0,1024,740)
    stage.addChild(newShape);
    newShape.addEventListener("click",function (){console.log("clicked");});
}

 // this rigon is dedicated to helper window to see your loction as disugner/ progremer. tracking loction window

// Bilding of tracking subject window
function BildShowDive(){
    // bilds the window
    var div_loction= document.createElement('div');
    div_loction.id='div_loction';
    div_loction.style.backgroundColor="#FEFEFE";

    // chosing style ditale acording to the stat, if the user asked for the page or not
    if(sessionStorage.getItem("loctionWShow")=="false"){
         div_loction.style.visibility="hidden";
    } else{
       
          div_loction.style.visibility="visible";
    }
    
    // Ading the page to window
    document.getElementsByTagName('body')[0].appendChild(div_loction);
    
  // לחזור לשפר עיצוב\הופעה! עדיף
}
// Chaging page style if was called/unCalled
function presentShowDiv(){
    // Find the window
    var div_loction= document.getElementById('div_loction');
    // Change the style, and the value of if cakked in  sessionStorage
    if(sessionStorage.getItem("loctionWShow")=="false"){
        sessionStorage.setItem("loctionWShow", true);
        div_loction.style.visibility="visible";
    } else{
        div_loction.style.visibility="hidden";
        sessionStorage.setItem("loctionWShow", false);
    }
}
// Change context of traking window
function presentionUpDateInfo(){
   document.getElementById("div_loction").innerHTML="Page: " + document.title+"<br>Frame: "+(Number(sessionStorage.getItem("FrameNum"))+1);
}   

