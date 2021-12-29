function ActivateListener()
{
   // console.log("Here");
    window.document.addEventListener('orientationchange', function(){
        var IOS = navigator.userAgent.match(/(iPad|iPhone|iPod)/g);
        var viewportmeta = document.querySelector('meta[name="viewport"]');
        if (IOS && viewportmeta)
        {
            if(viewportmeta.content.match(/width=device-width/)){
                viewportmeta.content = viewportmeta.content.replace(/width=[^,]+/, 'width=1');
            }
            viewportmeta.content = viewportmeta.content.replace(/width=[^,]+/, 'width=' + window.innerWidth);
        }

        window.scrollTo(0,0);
        //console.log("Changed");
    });
}