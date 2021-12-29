var MainRoot;
function setLastPageExitWindow(Root)
{
     MainRoot = Root;
    // Showing exit window on the last page
    Activate_Exit_Window();
    
     for(keyName in Root)
    {
        if(Root[keyName] instanceof createjs.MovieClip)
        {
            Root[keyName].name=keyName;
        }
    }
}


function Activate_Exit_Window()
{
    
    MainRoot.exit2.gotoAndPlay(2);
    MainRoot.exit2.Exit_Window.close_mc.addEventListener("click", CloseMsg);
    MainRoot.exit2.Exit_Window.startAgain_btn.addEventListener("click", BackToStart);
    MainRoot.exit2.Exit_Window.quit_mc.addEventListener("click", ExitPage);
    parent.postMessage("Disable Bar","*");

}


function CloseMsg()
{
    MainRoot.exit2.play();
    parent.postMessage("Enable Bar","*");
    sessionStorage.setItem("isOpen", false);
}

function BackToStart()
{
    parent.postMessage("Enable Bar","*");
    window.location = (JSON.parse(sessionStorage.getItem("ScreenArray")))[0];
    sessionStorage.setItem("FirstEntry", true);
    sessionStorage.setItem("isOpen", false);
    parent.postMessage("Fix CurrentTotalFrames", "*");
}

function ExitPage()
{
    parent.postMessage("Credits", "*");
}
    