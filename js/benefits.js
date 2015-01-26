var benefit=new Object();
benefit.init=function()
{
    var end=new Date();
    track.starting=JSON.parse(localStorage.getItem('smoke_on'));


    var dur=new Date(track.starting);
    var diff=(end.getTime()-dur.getTime())/1000;
    var days=((diff/3600)/24);
    var hrs=diff/3600;
    var mins=(diff/60);
    var in1=0,in2=0,in3=0,in4=0,in5=0,in6=0,in7=0,in8=0;
    var days= track.no_of_days(dur,end);
    var val;
    in1=Math.floor(mins/720*100);
    in2=Math.floor(hrs/48*100);
    in3=Math.floor(hrs/72*100);
    in4=Math.floor(hrs/336*100);
    in5=Math.floor(hrs/2016*100);
    in6=Math.floor(hrs/504*100);
    in7=Math.floor(days/274*100);
    in8=Math.floor(days/365*100);

    if(in1<=100)
    {
        document.getElementById('12h').setValue(in1);
    }
    else
    {
     document.getElementById('12h').setValue(100);
    }
    if(in2<=100)
    {
          document.getElementById('2d').setValue(in2);
    }
    else
    {
     document.getElementById('2d').setValue(100);
    }
    if(in3<=100)
    {
          document.getElementById('3d').setValue(in3);
    }
    else
    {
     document.getElementById('3d').setValue(100);
    }
    if(in4<=100)
    {
          document.getElementById('14d').setValue(in4);
    }
    else
    {
     document.getElementById('14d').setValue(100);
    }
    if(in5<=100)
    {
          document.getElementById('2-12wk').setValue(in5);
    }
    else
    {
     document.getElementById('2-12wk').setValue(100);
    }
    if(in6<=100)
    {
          document.getElementById('21day').setValue(in6);
    }
    else
    {
     document.getElementById('21day').setValue(100);
    }
    if(in7<=100)
    {
          document.getElementById('3-9').setValue(in7);
    }
    else
    {
     document.getElementById('3-9').setValue(100);
    }
    if(in8<=100)
    {
          document.getElementById('1yr').setValue(in8);
    }
    else
    {
     document.getElementById('1yr').setValue(100);
    }
};

benefit.shareTextMockingSelection=function() {
    var end=new Date();
    track.started=JSON.parse(localStorage.getItem('started_on'));
    track.starting=JSON.parse(localStorage.getItem('smoke_on'));
    var during=new Date(track.starting);
    var days= track.no_of_days(during,end);
    var temp=Math.round(days/365);
        var request = {
        action : 'bb.action.SHARE',
        mime : 'text/plain',
        data : 'My Health has improved by '+temp+' %',
        target_type: ["VIEWER","CARD"]
    };

    blackberry.invoke.card.invokeTargetPicker(request,"Sharing Text", onInvokeSuccess, onInvokeError);
};

onInvokeSuccess=function  (msg) {
    console.log("Invocation Success" + msg);
};

onInvokeError=function (msg) {
    console.log("Invocation Error: " + msg);
};