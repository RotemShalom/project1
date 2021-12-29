function CheckBrowserInfo(Array)
{
    var nVer = navigator.appVersion;
    var nAgt = navigator.userAgent;
    var browserName = navigator.appName;
    var fullVersion = ' ' + parseFloat(navigator.appVersion);
    var majorVersion = parseInt(navigator.appVersion, 10);
    var nameOffset, verOffset, ix;
    
    //Opera
    if ((verOffset = nAgt.indexOf("Opera")) != -1)
    {
        browserName = "Opera";
        fullVersion = nAgt.substring(verOffset+6);
        if ((verOffset = nAgt.indexOf("Version")) != -1)
            fullVersion = nAgt.substring(verOffset + 8);
    }
    //  MSIE
    else if ((verOffset = nAgt.indexOf("MSIE")) != -1)
    {
        browserName = "Microsoft Internet Explorer";
        fullVersion = nAgt.substring(verOffset+5);
    }   
    // Chrome
    else if ((verOffset = nAgt.indexOf("Chrome")) != -1)
    {
        browserName = "Chrome";
        fullVersion = nAgt.substring(verOffset+7);
    }  
    
    //Safari
    else if ((verOffset = nAgt.indexOf("Safari")) != -1)
    {
        browserName = "Safari";
        fullVersion = nAgt.substring(verOffset+7);
        if ((verOffset = nAgt.indexOf("Version")) != -1)
            fullVersion = nAgt.substring(verOffset + 8);
    }    
    //FireFox 
    else if ((verOffset = nAgt.indexOf("Firefox")) != -1)
    {
        browserName = "Firefox";
        fullVersion = nAgt.substring(verOffset+8);
    }
    
    if ((ix=fullVersion.indexOf(".")) != -1)
    {
        fullVersion = fullVersion.substring(0, ix);
    }
        
    
    Array[0] = browserName;
    Array[1] = fullVersion;
    
}
    
    
    