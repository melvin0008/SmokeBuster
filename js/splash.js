var splash=new Object();
splash.init=function(){
    track.started=JSON.parse(localStorage.getItem('started_on'));
    track.starting=JSON.parse(localStorage.getItem('smoke_on'));

       var d=new Date();
   var n= d.getDay();
   var flag=JSON.parse(localStorage.getItem("flag"));
    if(n==0 && flag==0)
    {
           localStorage.setItem("flag",1);
           localStorage.setItem('sun',0);
            localStorage.setItem('mon',0);
            localStorage.setItem('tue',0);
            localStorage.setItem('wed',0);
            localStorage.setItem('thu',0);
            localStorage.setItem('fri',0);
            localStorage.setItem('sat',0);
    }
    else if(flag==1 && n!=0)
    {
        localStorage.setItem("flag",0);
    }
}
