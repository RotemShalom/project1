//steps-progress-bar (credit 2017 by Bruno Alla code pen)

//builds up the list element of the progress bar ( fills up untill the current father, related function in "Tracking_Subjects.js")
function Create_ProgressBar()
{
    var ul_Progress = document.createElement('ul');
    
    ul_Progress.classList.add("progressbar");
    
    // finding out the number of fathers according to the built menu 
    var Number_Of_Fathers = document.getElementById("menu").children.length - 1;
    var Array_Of_Fathers = document.getElementById("menu").children;
    
    // Creating the progress bubbles according to the number of fathers in the menu 
    for(var Father_Counter = 0; Father_Counter < Number_Of_Fathers; Father_Counter ++)
    {
        // reaching for the a tag in each father to get the wanted id (the bar name) and set it to the bubble 
        ul_Progress.appendChild(Make_li(String(Array_Of_Fathers[Father_Counter].querySelector('a').id)));
    }

    console.log("finished Create_ProgressBar");
    console.log(ul_Progress);
    return ul_Progress;
}

// creating the bubbles (the circles) in the progress bar 
function Make_li(NewId)
{
    var li_circle = document.createElement('li');  
    
    // Adding the word progress for easier access to the object later on, to set different ids 
    li_circle.id = NewId + "_progress";
    return li_circle;
}



