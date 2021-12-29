var Root;

function Init(ExportRoot)
{
    Root=ExportRoot;
     Root.hebetmc.addEventListener("click", OpenLink);
}

function OpenLink(e)
{
    window.open("https://portal.army.idf/sites/hebet/DocLib4/index.html");
}

