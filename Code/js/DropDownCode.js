// credit to the dropdown code (including html and css) - CSS3/Javascript pure Dropdrown CodePen pedro nauck 
var LastIcon; // The last icon 
var LastMenu;  // the last opened son 
var ClickedIcon; // the icon of the clicked father right now 

function ActivateSons()
{
    //DropDown Menu
    var dropdown = document.querySelectorAll('.dropdown'); // returns all the elements with the 'dropdown' class (in node list type)
    
    /* returns the inforamtion as an array. this trick is used in order to change the type of the information we get by using               document.querySelectorAll... , the "call(..)" function changes the reference of 'this' in the slice function and therefore              convert the type of dropdown variable */
    var dropdownArray = Array.prototype.slice.call(dropdown, 0); 
   
    // Taking care of openning the son for each father
    dropdownArray.forEach(function(el) {
        
        // getting the specific elements so each item in the array
        var button = el.querySelector('.dropdown-link'), 
            menu = el.querySelector('.dropdown-menu'),
            icon = el.querySelector('img.plus_icon');
            
            button.onclick = function (event) {  
            
            ClickedIcon = icon;
            // (if we click on the same father again, it will close the son and reopen it, therefore we need to make sure it's a                        different father)
            if (LastIcon != ClickedIcon)
            {
               // the function closes the last opened son 
                close_Curr_Son(); 
            }
                
            // Opening the clicking son
            if(!menu.classList.contains('show'))
            {
                // Open
                menu.classList.add('show');
                menu.classList.remove('hide');
                icon.classList.add('open');
                icon.classList.remove('close');
                event.preventDefault();
                
                
                // Updating the current element 
                LastIcon = icon;
                LastMenu = menu;
            }
            else
            {
                // Close
                menu.classList.remove('show');
                menu.classList.add('hide');
                icon.classList.remove('open');
                icon.classList.add('close');
                event.preventDefault();
                
            }
        }
        
        
    })
}

// closing the already opened son 
function close_Curr_Son()
{
   if (LastIcon != undefined)
    {
      LastMenu.classList.remove('show');
       LastMenu.classList.add('hide');
       LastIcon.classList.remove('open');
       LastIcon.classList.add('close');
       LastIcon = undefined;
       LastMenu = undefined;  
        
     }
}

// If the current screen is inside a dropdown menu, open the wanted son 
function open_Current_Screen()
{
    var nScreenNum = sessionStorage.getItem("ScreenNum"); // num of current screen (according to the array)
    
    // Array of all the a tags on the page 
    var ArrayLinks = document.getElementsByTagName('a');
    
    // loops over the links to find the current active one
    for(var i = 0; i < ArrayLinks.length; i ++ )
    {
        // If it's indeed a page link and the link is the current one 
        if (ArrayLinks[i].name.charAt(0) == 'a' && ArrayLinks[i].name.substring(1,ArrayLinks[i].name.length) == String(Number(nScreenNum) - 1))
        {
            // checking two 'fathers' above to see if it's in a dropdown menu 
            var grandpa_Of_a_tag = ArrayLinks[i].parentElement.parentElement;
            if (grandpa_Of_a_tag.classList.contains("dropdown-menu"))
            {
                // Getting the main li of the dropdown section to reach every wanted element, check the order of the tags for help 
                var Specific_DropDown = grandpa_Of_a_tag.parentElement;
                var menu = Specific_DropDown.querySelector('.dropdown-menu'),
                icon = Specific_DropDown.querySelector('img.plus_icon');
                
                // Open
                menu.classList.add('show');
                menu.classList.remove('hide');
                icon.classList.add('open');
                icon.classList.remove('close');

                
                // Updating the current element 
                LastIcon = icon;
                LastMenu = menu;
                
            }
        }
    }
}

