var root;
var isAbleBack = true;
var isAbleNext = true;
var isHarNeedOpen = false;

function getExportRoot(exportRoot){
    root = exportRoot;
    addListeners();
    
}

function addListeners(){
    root.Window18.Lama_btn.addEventListener("click", openHar);
    root.Window18.Lama_btn.mouseEnabled = true;
    root.Window18.Model_Hakarchon_btn.addEventListener("click", openHar);
    root.Window18.Model_Hakarchon_btn.mouseEnabled = true;
    root.Window20.Model_Hamaagalim_btn.addEventListener("click", openHar);
    root.Window20.Model_Hamaagalim_btn.mouseEnabled = true;
}

function removeListeners(){
    root.Window18.Lama_btn.removeEventListener("click", openHar);
    root.Window18.Lama_btn.mouseEnabled = false;
    root.Window18.Model_Hakarchon_btn.removeEventListener("click", openHar);
    root.Window18.Model_Hakarchon_btn.mouseEnabled = false;
    root.Window20.Model_Hamaagalim_btn.removeEventListener("click", openHar);
    root.Window20.Model_Hamaagalim_btn.mouseEnabled = false;
}

function openHar(event){
   removeListeners();
   isHarNeedOpen = true;
    switch(event.currentTarget.name){
        case("Lama_btn"): {
            root.Window18.Lama_Window.gotoAndPlay(1);
            root.Window18.Lama_Window.close_mc.addEventListener("click", closeHar);
            root.Window18.Lama_Window.NextHar.addEventListener("click", nextPage);
            root.Window18.Lama_Window.backHar.addEventListener("click", previousPage);
            addNumberListeners(1);
            break;
        }
        case("Model_Hakarchon_btn"): {
            root.Window18.Model_Hakarchon_Window.gotoAndPlay(1);
            root.Window18.Model_Hakarchon_Window.close_mc.addEventListener("click", closeHar);
            break;
        }
        case("Model_Hamaagalim_btn"): {
            root.Window20.Model_Hamaagalim_Window.gotoAndPlay(1);
            root.Window20.Model_Hamaagalim_Window.close_mc.addEventListener("click", closeHar);
            break;
        }
        
        default:
            break;
    }
}

function closeHar(event){
    addListeners();
    console.log(event.currentTarget.parent);
    event.currentTarget.parent.gotoAndStop(0);
}

function addNumberListeners(numOfPage){
    console.log("numOfPage = " + numOfPage);
    isAbleBack = true;
    isAbleNext = true;
    root.Window18.Lama_Window.backHar.gotoAndStop(0);
    root.Window18.Lama_Window.backHar.mouseEnabled = true; 
        
    root.Window18.Lama_Window.NextHar.gotoAndStop(0);
    root.Window18.Lama_Window.NextHar.mouseEnabled = true;
    if(numOfPage == 1){
        isAbleBack = false;
        root.Window18.Lama_Window.backHar.mouseEnabled = false; 
        root.Window18.Lama_Window.backHar.gotoAndStop(1);
    } 
    else if (numOfPage == 14){ 
        isAbleNext = false;
        root.Window18.Lama_Window.NextHar.mouseEnabled = false; 
        root.Window18.Lama_Window.NextHar.gotoAndStop(1);
    } 

    root.Window18.Lama_Window.numbers.gotoAndStop(numOfPage);
    for(var i = 1; i <= 14; i++){
        if(i == numOfPage){
            root.Window18.Lama_Window["page" + i].removeEventListener("click", movePage);
            root.Window18.Lama_Window["page" + i].mouseEnabled = false;
        } else {
            root.Window18.Lama_Window["page" + i].addEventListener("click", movePage);
            root.Window18.Lama_Window["page" + i].mouseEnabled = true;
        }
        
    }
}

function movePage(event) {
    addNumberListeners(Number(event.currentTarget.name.substring(4,6)));
    root.Window18.Lama_Window.gotoAndStop(Number(event.currentTarget.name.substring(4,6)) + 13);
}

function nextPage(event){
    root.Window18.Lama_Window.gotoAndStop(Number(event.currentTarget.parent.currentFrame) + 1);
    addNumberListeners(Number(event.currentTarget.parent.currentFrame - 13));
}

function previousPage(event){
    root.Window18.Lama_Window.gotoAndStop(Number(event.currentTarget.parent.currentFrame) - 1);
    addNumberListeners(Number(event.currentTarget.parent.currentFrame - 13));
}