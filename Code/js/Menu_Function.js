function openNav()
{
    // showing the menu by changing it's width 
    document.getElementById('mySidenav').style.width = "300px";
    
    
    
    // adds shadow to the background 
    document.getElementById('shadow_div').style.background = 'black';
    document.getElementById('shadow_div').style.pointerEvents = 'all';
    
    // in case the curren screen is a link inside a son, we need to open that son when the menu is opened 
    open_Current_Screen();
    
    
    
}

function closeNav()
{
    // hiding the menu by changing it's width 
    document.getElementById('mySidenav').style.width = "0";
    
    // Returning the div to it's original state
    document.getElementById('shadow_div').style.background = 'none';
    document.getElementById('shadow_div').style.pointerEvents = 'none';
    
    //closing the current opened son in the menu 
    close_Curr_Son();
    
    //return focus to the iframe 
    document.getElementById("content").focus();
}

function SetListeners()
{
    console.log("SetMenu Listeners");
    ArrayAllLink = document.getElementsByTagName('a');
    for (var i=0; i < ArrayAllLink.length; i++)
    {
        if (ArrayAllLink[i].name.charAt(0) == 'a' && ArrayAllLink[i].name.charAt(1) >= 0 && ArrayAllLink[i].name.charAt(1) <= 9)
        {
            ArrayAllLink[i].addEventListener("click", goTo);
        }
    }
}

// loading the new page
function goTo(e)
{
    var clickedLink = e.currentTarget.name;
    var ScreenArray=JSON.parse(sessionStorage.getItem("ScreenArray"));
    FixBack(true); // enable the "Back" arrow 
    document.getElementById("content").src=["Screens/" + ScreenArray[Number(clickedLink.substring(1,clickedLink.length)) + 1]];
    
    sessionStorage.setItem("LastFrame", false); // resetting the variable
    
    sessionStorage.setItem("ScreenNum", Number(clickedLink.substring(1,clickedLink.length)) + 1);
    
    closeNav();
    
    
}


