var ScreenArray;
function AddNext()
{
    canvas.addEventListener("click", ChangePage);
    ScreenArray = JSON.parse(sessionStorage.getItem("ScreenArray")); // getting the array for general use
}


function ChangePage()
{
    
     window.location = ScreenArray[0];;
    
    canvas.removeEventListener("click", ChangePage);
    // posts message to the parent to show the side Bar after "התחל" is pressed 
    parent.postMessage("Show Bar", "*");
}
