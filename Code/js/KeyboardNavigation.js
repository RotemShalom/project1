/* Programmer: Michal Friedman
// Addition for shift + Q option 
*/

var map = {16: false, 81: false, 70:false, 67: false, 83:false}; // 16 - shift, 81 - Q, 83-s , 70-f(in order to track the event of key down and up)

function InitKeyboard()
{
    window.addEventListener("keydown", keyboardHandle);
    window.addEventListener("keyup", keyboardHandleUp);
}

function keyboardHandle(event)
{
    if (sessionStorage.getItem("isOpen") == "false")
    {
        switch(event.keyCode)
        {
                case 37: // left
                {
                    Next();
                    break;
                }
                case 38: // Up
                {
                    Back();
                    break;
                }
                case 39: // right
                {
                    Back();
                    break;
                }
                case 40: // down
                {
                    Next();
                    break;
                }
                case 13: // enter
                {
                    Next();
                    break;
                }
                case 32: // space
                {
                    Next();
                    break;
                }
        }
    }
    
    // For the option of shift + Q 
    if (event.keyCode in map)
    {
        // updating the current key in the map array
        map[event.keyCode] = true;
        
        // if both keys are pressed, show alert with screen name and current frame 
        if (map[16] && map[83] )
        {
            
            map[16] = false;
            map[83] = false;
             // UpDates the side window that shows where you are 
             presentShowDiv();
        }
        // for the option of shift +f 
        else if(map[70] && map[16])
        {
            
            var ScreenNum= prompt("Please enter the screen number","");
            var FrameNum= prompt("Please enter the frame number","");
            var screenNumInArr;
                        
            for (var i in ScreenArray)
            {
                //we check both options to make sure that even if they dont use the $ sign it will work 
                //we also take care of the option that the screennum Name is longer than 3 digits
                if(ScreenArray[i].substring(1,4) == ScreenNum || ScreenArray[i].substring(0,3) == ScreenNum||ScreenArray[i].substring(0,4) == ScreenNum ||ScreenArray[i].substring(1,5) == ScreenNum)
                {
                    screenNumInArr=i;
                }
            }
            
            window.location=ScreenArray[Number(screenNumInArr)];
            sessionStorage.setItem("UsedShiftF",true);
            sessionStorage.setItem("ChangeFrameValue",Number((FrameNum)));
            
            sessionStorage.setItem("ScreenNum",screenNumInArr);
            sessionStorage.setItem("FrameNum",FrameNum);
            
            
            
            map[16] = false;
            map[70] = false;
        } else if (map[16] && map[81] )
        {
            var barArray = JSON.parse(sessionStorage.getItem("barArray")); // the array that follows how many frames were visited
            if (prompt("The location is" , document.title + '/' + (Number(sessionStorage.getItem("FrameNum"))+1)))
            {
                document.execCommand('copy');
            }
            
            map[16] = false;
            map[81] = false;
           
        } else if(map[67] && map[16]){ // Shift + C

            map[16] = false;
            map[67] = false;
          // clipboard
            var text = document.title + '/' + (Number(sessionStorage.getItem("FrameNum"))+1); // creat text to clipboard
            //console.log(text);
            var textarea= document.createElement("textarea"); // creat elment to clipbord from
            textarea.textContent=text;
            textarea.style.position="fixed"; // make sure wont move
            document.body.appendChild(textarea);
            textarea.select();
            try {
                document.execCommand("copy");
            }
            catch (ex) {
                console.warn("did not copy ",  ex);
                }
                finally {
                    document.body.removeChild(textarea); // remove elemnt
                }
            
        }
    } 
    
    
        /* ---------------------- programmer Daniel bar ----------------------
    shift + z - skip the animation*/
    if(event.shiftKey && event.keyCode == 90 && Root.Maavaron != undefined )
    {
        Root.Maavaron.gotoAndStop(Root.Maavaron.totalFrames - 1);
    }
}

// When the key is up we update it's current status in the map array 
function keyboardHandleUp(event)
{
    if (event.keyCode in map)
    {
        // updating the current key in the map array
        map[event.keyCode] = false;
        
    }
}
        