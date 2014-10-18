function loopit(dir){
    // choose direction
    if (dir == "c")
        i++
    else
        i--;
    // stop condition
    if (i < 0)
        i = 0;
    if (i > degs)
        i = degs;

    // calculate and set the percentage text
    prec = (100*i)/360;   
    $(".prec").html(Math.round(prec)+"%");

    if (i<=180){
        activeBorder.css('background-image','linear-gradient(' + (90+i) + 'deg, transparent 50%, #A2ECFB 50%),linear-gradient(90deg, #A2ECFB 50%, transparent 50%)');
    }
    else{
        activeBorder.css('background-image','linear-gradient(' + (i-90) + 'deg, transparent 50%, #39B4CC 50%),linear-gradient(90deg, #A2ECFB 50%, transparent 50%)');
    }

    // recursive call 
    setTimeout(function(){
        if($("#circle").is(":hover"))
           loopit("c");
        else
           loopit("nc");
    },1); 
}