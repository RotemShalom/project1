var BarSizePixels = 80; // width of Bar size 
var li_progressSaved;
var ul_progressSaved;
var CurrentTotalFrames = null; // in order to set up the wanted total frames, if there is maavaron - we need to decrease the total frames by 1 


var isMaavaronOn = sessionStorage.getItem("isMaavaronOn");
//to know when to show the bar, only after the opening screen
window.addEventListener("message", HandleEvent);


//creates the menu
function MakeMenu()
{
    
    // Adding css and js files 
    Style_js_Function();
       
    // for responsive and links 
    Add_metaTag_Base();
       
}

/*this function creates a link in the menu by receving:
1. levelNum - for father set 1, for son set 2.
2. bHas_Son - boolean whether the father has a son
3. name - the "instance name" of the link - for ex. a0,a1 .... (if it's a father with son, set null)
4. id - setting the bar name - for ex. bar0_0, bar0_3...
5. text - the title of the link.
*/
function Create_Link (levelNum, bHas_Son, name, id ,text)
{
     var li_link = document.createElement('li');
    var a_link = document.createElement('a');
    
    //Adding the empty sign
    var VHolder_img = document.createElement('img');
    VHolder_img.src = ["Images/level" + String(levelNum) + "_empty.png"];
    VHolder_img.id = levelNum;
    VHolder_img.className = 'VHolder';
    a_link.appendChild(VHolder_img);
    
    // The text inside the father 
    var text_div = document.createElement('div');
    
    text_div.style.overflow = 'hidden';
    text_div.style.width = '70%';
    text_div.appendChild(document.createTextNode(text));
    
    a_link.appendChild(text_div);
    
    // Checking if the father has a dropdown menu
    if (bHas_Son)
    {
        li_link.className = "dropdown";
        a_link.className=('dropdown-link');
        
        //Adding the open-son icon
        var plus_icon = document.createElement('img');
        plus_icon.className = "plus_icon";
        plus_icon.src = "Images/menu_plus.png";
        
        a_link.appendChild(plus_icon); 
        
        
    }
    
    a_link.id = id;
    a_link.name = name;
    
    li_link.appendChild(a_link);
    
    // returning the created link of the list 
    return li_link;
}

//Building the menu 
function Create_Body()
{
   // console.log("In Create Body");
   //add_js("Code/js/Tracking_Subjects.js");
    // Creating div for the whole menu
    var div_nav = document.createElement('div');
    
    div_nav.id = "mySidenav";
    div_nav.className = "sidenav";
    
    // The "x" sign of closing
    var a_main = document.createElement('a');
    
    a_main.href = "javascript:void(0)";
    a_main.className = "closebtn";

    a_main.addEventListener("click", closeNav);
    var inner_img = document.createElement("img");
    
    inner_img.src = "Images/close.png"
    
    a_main.appendChild(inner_img);
    
    
    // Creating menu with list 
    var Menu_ul = document.createElement('ul');
    
    Menu_ul.id = "menu";
    
    // Fathers
    var father1 = Create_Link(1, true, 'null', 'bar0_4','מבוא');
    var father2 = Create_Link(1, false, 'a5', 'bar5_5','שלבי התחקיר');
   
  
    
    //Son
    var ul_Son1 = document.createElement('ul');
    ul_Son1.className = "dropdown-menu";
    
      
    // Adding to the dropdown menu list 
    ul_Son1.appendChild(Create_Link(2, false, 'a0', 'bar0_0','הגדרה'));
    ul_Son1.appendChild(Create_Link(2, false, 'a1', 'bar1_1','מודל התחקיר הצה"לי'));
    ul_Son1.appendChild(Create_Link(2, false, 'a2', 'bar2_2','תחקיר הבטיחות'));
    ul_Son1.appendChild(Create_Link(2, false, 'a3', 'bar3_3','חקירה פלילית מול תחקיר מפקדים'));
    ul_Son1.appendChild(Create_Link(2, false, 'a4', 'bar4_4','תחקיר שחל עליו חיסיון'));

    
   father1.appendChild(ul_Son1);
  
    
    //Adding it all to the list 
    Menu_ul.appendChild(father1);
    Menu_ul.appendChild(father2);
    
   
    //Credits
    
    var liCredits_Link = document.createElement('li');
    
     var Credits_Link = document.createElement('a');
    
    Credits_Link.id= "Credits_Link";
    Credits_Link.href="Screens/קרדיטים.html";
    Credits_Link.target="_blank";
    
    Credits_Link.appendChild(document.createTextNode("קרדיטים"));
    
    liCredits_Link.appendChild(Credits_Link);
    
    Menu_ul.appendChild(liCredits_Link);
                             
     
    
    //////////////////////////////////TODO: Look if worth to use xml to save time.
    
    ////////////////////////////////////////////////////////////////////////////////////   

    
    // adding the X sign and adding the menu list 
    div_nav.appendChild(a_main);
    div_nav.appendChild(Menu_ul);
    

    document.getElementsByTagName('body')[0].appendChild(div_nav);
    
    // Taking care of the dropdown of the sons in the menu 
    add_js("Code/js/DropDownCode.js", true, set_sons);
    
    
    // Create the side bar of the menu
    Create_Bar();
    
    
    //adds listeners to the a tags (in menu_function)
    SetListeners();
    
    //Adding the div the shadow the background for the menu 
    Add_Shadow();
    
}

//set the droplist sons to slide when opened (taken from code pen and found in our DropDownCode.js script)
function set_sons()
{
    ActivateSons();
}

    
// Builds up the menu bar
function Create_Bar()
{
    //Creating the side bar 
    var div_Bar = document.createElement('div');
    
    div_Bar.id = "Bar";
    
    
    //Creating the tables for the objects in the bar
    
    //hamburger
    var ul_List_hamburger = document.createElement('ul'); // ul - the 3 lines sign (Hamburger)
    ul_List_hamburger.id = "hamburger_ul";
    
    
    var li_hamburger = document.createElement('li');
    ul_List_hamburger.appendChild(li_hamburger);
    
    // Creating the Open link of the menu

    var Open_Sign_img = document.createElement('img');
    
    Open_Sign_img.addEventListener("click", openNav);
    Open_Sign_img.src="Images/menu.png"; // getting the hamburger image
    
    Open_Sign_img.id="Menu_Icon";
    
    // attaching to the li
    li_hamburger.appendChild(Open_Sign_img);
    ///////////////////////////////////////////////
    
    //progress bar 
    var ul_List_Progress = document.createElement('ul'); //ul progress bar 
    ul_List_Progress.id = "progress_ul";
    
    var li_progress = document.createElement('li'); // progress bar 
    //ul_List_Progress.appendChild(li_progress);
    
    var div_Progress = document.createElement('div'); // Progress container 
    
    div_Progress.id = "div_Progress";
    
    // Creating the progress bar 
    div_Progress.appendChild(Create_ProgressBar());
    
    // attaching to the li
    li_progress.appendChild(div_Progress);
    
    li_progressSaved = li_progress;
    ul_progressSaved = ul_List_Progress;
    ///////////////////////////////////////////////
    
    // Div for click counter
    /*
    var clicks_div = document.createElement('div');
    clicks_div.id = "clicks_div";
    */
    //Hebet logo
    
    var li_Hebet = document.createElement('li');
    
    var Hebet_link = document.createElement('a');
    
    Hebet_link.href = "https://portal.army.idf/sites/hebet/DocLib4/index.html";
    Hebet_link.traget = '_blank';
    
    var Hebet_logo = document.createElement('img');
    
    li_Hebet.id = "Hebet_logo";
    Hebet_logo.src = 'Images/hebet_logo.png';
    
    Hebet_link.appendChild(Hebet_logo);
    li_Hebet.appendChild(Hebet_link);
    
    var ul_Hebet_Logo = document.createElement('ul'); // table for the arrows in the bottom bar
    ul_Hebet_Logo.id = "Hebet_Logo_ul";
    
    ul_Hebet_Logo.appendChild(li_Hebet);
    
    
    // Back/Next images
    var ul_list_Navigation = document.createElement('ul'); // table for the arrows in the bottom bar
    ul_list_Navigation.id = "Navigation_ul";
    
  //  var li_Clicks_Counter = document.createElement('li'); // li for counting clicks
    var li_Next = document.createElement('li'); // Next Arrow 
    var li_Previous = document.createElement('li'); // Previous Arrow
    
  //  li_Clicks_Counter.id = "li_Clicks_Counter";
    
    
    
    // adding it to the bottom table of the bar 
    //ul_list_Navigation.appendChild(li_Clicks_Counter);
    ul_list_Navigation.appendChild(li_Next);
    ul_list_Navigation.appendChild(li_Previous);
  
    
    

    // Back and next signs
    var Back_Arrow = document.createElement('img');
    var Next_Arrow = document.createElement('img');
    var Sivog = document.createElement('div');
    
    Sivog.textContent = 'בלמ"ס';
    Sivog.style ="color: white; font-family: 'Open Sans Hebrew', sans-serif; direction: rtl; text-align: center; margin-top: 5px;     margin-bottom: 5px;font-weight: bold;";
    Back_Arrow.addEventListener("click", SendBack);
    Next_Arrow.addEventListener("click", SendNext);
    
    Back_Arrow.src="Images/prev.png";
    Next_Arrow.src="Images/next.png";
    
    Back_Arrow.className="svgClass";
    Next_Arrow.className="svgClass";
    
    li_Previous.id = "Prev";
    li_Next.id = "Next";
    

    // adding images Next/Back to the li's of the list, and clicks counter 
    
   // li_Clicks_Counter.appendChild(clicks_div);
    li_Previous.appendChild(Back_Arrow);
    li_Next.appendChild(Next_Arrow);
    
    
    
    // adding the li's to the Bar Div
    
    div_Bar.appendChild(Sivog);
    div_Bar.appendChild(ul_Hebet_Logo);
    div_Bar.appendChild(ul_List_hamburger);
    div_Bar.appendChild(ul_list_Navigation);
    div_Bar.appendChild(ul_List_Progress);
    div_Bar.appendChild(Size_div);
   
    

    
    
    // Adding it to the page 
    document.getElementsByTagName('body')[0].insertBefore(div_Bar, document.getElementById('content'));
    
    //when the bottom elements cover the progressBar
    window.addEventListener("resize", reSizeActions);

    //fitting the lomda to the opened web window (for the first time)
    InitResize();
    
}

///////////////////////////////////////////////////////////////////////////////////////////
//those functions send a message to the iframe to go back/next, the message is catched in the Navigation.js file  
function SendBack()
{
     document.getElementById("content").contentWindow.postMessage("Back", '*');   
    document.getElementById("content").focus();
}

function SendNext()
{
    document.getElementById("content").contentWindow.postMessage("Next", '*');  
    document.getElementById("content").focus();
}
////////////////////////////////////////////////////////////////////////////////////////

// updating info about frames and location 
function UpdateInfo()
{
    // Marking the location of the user in the side menu (in Trackining_Subjects.js) 
    Where_Am_I();
    
    // updating the array of frames ( barArray) (in Trackining_Subjects.js) 
    changeBars(); 
    
    // updating clicks counter, if there is maavaron the space should be empty. 
    
    if (sessionStorage.getItem("ShowClicks") == "false")
    {
       // clicks_div.textContent = "";
        MaavaronExits = true;
        CurrentTotalFrames = Number(sessionStorage.getItem("TotalFrames")) - 1;
    }
    /*
    else
    {   
        if (CurrentTotalFrames != null)
        {
            clicks_div.textContent = [String(Number(sessionStorage.getItem("FrameNum"))) + "/" + CurrentTotalFrames];
        }
        else
        {
            clicks_div.textContent = [String(Number(sessionStorage.getItem("FrameNum")) + 1) + "/" + sessionStorage.getItem("TotalFrames")];
            console.log(sessionStorage.getItem("TotalFrames"));
        }
    }
    */
}
    

// This function adds the needed files to the menu and builds it with Create_Navigation  
function Style_js_Function()
{
    //js
    add_js("Code/js/Menu_Function.js", true, AddProgressBar_js)//we need to check when the file is fully loaded 
    
    add_js("Code/js/Tracking_Subjects.js");
    
    
    

    //css
    add_css("Code/css/Style_Menu.css");
    add_css("Code/css/dropdownStyle.css");
    add_css("Fonts/OpenSansHebrew/opensanshebrew.css");
    add_css("Code/css/styleProgressBar.css");
    add_css("Code/css/tooltip.css");

}

function AddProgressBar_js()
{
    add_js("Code/js/ProgressBar.js", true, Create_Body);//we need to check when the file is fully loaded 
}

// Adding css file to the page dynamically 
function add_css(path)
{
    var StyleLink = document.createElement('link');
    
    StyleLink.type = "text/css";
    StyleLink.rel = "stylesheet";
    StyleLink.href = path;
    
    document.getElementsByTagName('head')[0].appendChild(StyleLink);
    
    return StyleLink;
}

// Adding js file to the page (path - the url to the file, listen - adding eventlistener, func - the function to happen) 
function add_js(path, listen, Func)
{
    //js
    var File_js = document.createElement('script');

    File_js.src = path;

    if (listen)
    {
        File_js.addEventListener("load", Func);
    }
    
    document.getElementsByTagName('head')[0].appendChild(File_js);

    return File_js;
}

    

// adding the div to shadow the screen for the menu
function Add_Shadow()
{
    var div_cover = document.createElement('div');
    
    div_cover.id = 'shadow_div';
    div_cover.addEventListener("click", closeNav);
    
    document.getElementsByTagName('body')[0].appendChild(div_cover);

}

//Adding the tooltip info to the clicks div, returns the div with the info img and the tooltip text 
function Add_tooltip()
{
    var tooltip_div = document.createElement('div');
    tooltip_div.className = "tooltip";
    
    //tooltip img
    var tip_img = document.createElement('img');
    
    tip_img.src = "Images/info.png"; // getting the info image
    tip_img.id = "tip_img";
    
    tooltip_div.appendChild(tip_img);
    
    //tooltip text
    var span_tooltip = document.createElement('span');
    
    span_tooltip.className = "tooltiptext";
    var text_tooltip = document.createTextNode('מספר הקליקים שנותרו'); // the text on hover 
    
    span_tooltip.appendChild(text_tooltip);
    tooltip_div.appendChild(span_tooltip);
    
    return tooltip_div;
}

    
    
// Adding meta for responsive affect 
function Add_metaTag_Base()
{
    var meta_tag = document.createElement('meta');;
    
    meta_tag.name="viewport";
    meta_tag.content="width=device-width, initial-scale=1.0";
    
    document.getElementsByTagName('head')[0].insertBefore(meta_tag, document.getElementsByName('authoring-tool')[0]);
    
    //so links will be opened in a new tab
    var base_tag = document.createElement('base');;
    
    base_tag.target = "_blank";
    
    document.getElementsByTagName('head')[0].appendChild(base_tag);

}


// hides the progressbar when the bottom ul(Navigation_ul) covers it 
function reSizeActions()
{
    if (checkOverlapping(Size_div, progress_ul))
    {
        div_Progress.style.visibility = "hidden";
    }
    else
    {
        div_Progress.style.visibility = "visible";
    }
    
    //FixWidth(); // shifting the iframe because of the side bar 
}



    var Size_div = document.createElement('div');
    Size_div.id="Size_div";

// true - el1 covers el2 (at least partly)
function checkOverlapping(el1, el2)
{
    // This function can be found on google, no need to over analyze it 
    el1.offsetBottom = el1.offsetTop + el1.offsetHeight;
    el2.offsetBottom = el2.offsetTop + el2.offsetHeight;
  
    return !(el1.offsetBottom < el2.offsetTop ||  el1.offsetTop > el2.offsetBottom)
    

}

// This function checks the current state of the document to know when to activate the reSize actions
function InitResize()
{
    var everythingLoaded = setInterval(function() {
        if (/loaded|complete/.test(document.readyState)){
            console.log("done");
            clearInterval(everythingLoaded);
            ul_progressSaved.appendChild(li_progressSaved);
            reSizeActions(); // the function is called when we are sure everything is done

        }
    },10);
}

function FixWidth()
{
    document.getElementById("content").style.width =[(window.innerWidth - BarSizePixels) + "px"];
}

// this function changes the visual state of the "Back" arrow, along with handling mouse events
function FixBack(check)
{
    if (!check)
    {
  
        document.getElementById("Prev").style.pointerEvents = "none";   
        document.getElementById("Prev").style.opacity = "0.35";
    }
    else if (document.getElementById("Prev").style.pointerEvents == "none") // so we won't repeat the fix for every click on "Next"
    {
        document.getElementById("Prev").style.pointerEvents = "all";   
        document.getElementById("Prev").style.opacity = "1";  
    }
}

// this function changes the visual state of the "Next" arrow, along with handling mouse events
function FixNext(check)
{
    if (!check)
    {
  
        document.getElementById("Next").style.pointerEvents = "none";   
        document.getElementById("Next").style.opacity = "0.35";
    }
    else if (document.getElementById("Next").style.pointerEvents == "none") // so we won't repeat the fix for every click on "Next"
    {
        document.getElementById("Next").style.pointerEvents = "all";   
        document.getElementById("Next").style.opacity = "1";  
    }
}

//This function changes the visual state of the bar
function FixBar(check)
{
    if(!check)
    {
        document.getElementById("Next").style.pointerEvents = "none";   
        document.getElementById("Prev").style.pointerEvents = "none";   
        document.getElementById("Bar").style.pointerEvents = "none";   
        document.getElementById("Bar").style.opacity = "0.35";
    }
    else
    {
        document.getElementById("Next").style.pointerEvents = "all";   
        document.getElementById("Prev").style.pointerEvents = "all";   
        document.getElementById("Bar").style.pointerEvents = "all";   
        document.getElementById("Bar").style.opacity = "1";  
    }
}

function HandleEvent(e)
{
    
   // console.log("HNDELE EVENT= "+e.data);
    if (e.data == "Show Bar")
    {
        MakeMenu();
       
    }
      else if (e.data == "Disable Back")
    {
        FixBack(false);
    }
    else if (e.data == "Enable Back")
    {
        FixBack(true);
    } 
    else if (e.data == "Disable Next")
    {
        FixNext(false);
    }
    else if (e.data == "Enable Next")
    {
        FixNext(true);
    }
     else if (e.data == "Disable Bar")
    {
        FixBar(false);    
    }
    else if (e.data == "Enable Bar")
    {
        FixBar(true);      
    }
    else if (e.data == "Fix Info")
    {
        UpdateInfo();
    }   
    else if (e.data == "Fix CurrentTotalFrames")
    {
        CurrentTotalFrames = null;
       
    }
    else if (e.data == "Credits")
    {
        window.location = "Screens/קרדיטים.html";
    }
}
        
    
