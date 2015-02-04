var records=new Object();
records.tracking=0;

var inter;//global
var ex=false;



records.init=function()
{

    if(records.tracking==0)
    {
        var maxtime=localStorage.getItem('period');
        records.elapsed=(maxtime*60);
        document.getElementById('craving').innerHTML = Math.floor(records.elapsed/60);
        document.getElementById('craving_s').innerHTML=(records.elapsed%60);
    }
    else if(records.tracking==2)
    {
        records.start();
    }
    else if(records.tracking==3)
    {
        records.tracking=1;
        records.start();

    }
     if(ex && records.tracking==2)
    {
        records.tracking=3;
         clearInterval(inter);

        records.start();
    }

    console.log("Im back");
};
records.start=function(){
    if(records.tracking!=1 )
    {
            if(records.tracking!=3)
            {

                records.tracking=1;

                document.getElementById('butt').innerHTML="PAUSE";
                var start = new Date().getTime();
                records.elapsed = 0;
                ex=true;

                inter=window.setInterval(function()
                {
                var time = new Date().getTime() - start;
                records.elapsed = Math.floor(time / 1000) ;
                var maxtime=localStorage.getItem('period');
                if(records.elapsed>=(maxtime*60))
                {
                    records.elapsed=0;
                }
                else
                {
                records.elapsed=(maxtime*60)-records.elapsed;
                }
                if(Math.round(records.elapsed) == records.elapsed)
                {
                    records.elapsed += '';
                 }
                 if(Math.floor(records.elapsed<=0))
                {
                    clearInterval(inter);
                    blackberry.ui.dialog.standardAskAsync('IS YOUR CRAVING OVER???',blackberry.ui.dialog.D_YES_NO,records.yes,{title:'OVER???'}); 
                    document.getElementById('records').refresh();

                }

                document.getElementById('craving').innerHTML = Math.floor(records.elapsed/60);
                document.getElementById('craving_s').innerHTML=(records.elapsed%60);

                }, 1000);

            }
            else
            {
                records.tracking=1;
                ex=true;
                document.getElementById('butt').innerHTML="PAUSE"
                var start = new Date().getTime();
                var max=localStorage.getItem('elapsed');
                inter=window.setInterval(function()
                {

                var time = new Date().getTime() - start;

                records.elapsed = Math.floor(time / 1000) ;
                if(records.elapsed>=max)
                {
                    records.elapsed=0;
                }
                else
                {
                records.elapsed=max-records.elapsed;
                }
                localStorage.setItem('elapsed',records.elapsed);
                if(Math.round(records.elapsed) == records.elapsed)
                {
                    records.elapsed += '';
                 }
                if(Math.floor(records.elapsed)<=0)
                {
                    clearInterval(inter);
                        blackberry.ui.dialog.standardAskAsync('IS YOUR CRAVING OVER???',blackberry.ui.dialog.D_YES_NO,records.yes,{title:'OVER???'});
                    document.getElementById('records').refresh();
                }

                document.getElementById('craving').innerHTML = Math.floor(records.elapsed/60);
                document.getElementById('craving_s').innerHTML=(records.elapsed%60);
                }, 1000);
            }
    }
    else
    {
        ex=false;
    clearInterval(inter);
    records.tracking=3;
    document.getElementById('butt').innerHTML="RESUME";
    document.getElementById('craving').innerHTML = Math.floor(records.elapsed/60);
    document.getElementById('craving_s').innerHTML=(records.elapsed%60);
    localStorage.setItem('elapsed',records.elapsed);
    }
};

records.yes=function(selection)
{

    if(!selection.return.indexOf('Yes'))
    {
        records.stop();
    }
    else
    {

        clearInterval(inter);
      ex=false;
    records.tracking=2;
    bb.pushScreen('records.html','records');

    }

};

records.stop=function(){
    clearInterval(inter);
    records.tracking=0;
      ex=false;
    var month=new Array();
    month[0]="jan";
    month[1]="feb";
    month[2]="mar";
    month[3]="apr";
    month[4]="may";
    month[5]="jun";
    month[6]="jul";
    month[7]="aug";
    month[8]="sep";
    month[9]="oct";
    month[10]="nov";
    month[11]="dec";

    var skipped = JSON.parse(localStorage.getItem('craving_skipped'));
    skipped+=1;
    localStorage.setItem('craving_skipped',skipped);
    var d=new Date()
    var temp=d.getMonth();
    var val=month[temp];
    var skip=JSON.parse(localStorage.getItem(val));
    skip+=1;
    localStorage.setItem(val,skip);
    var points_earned = JSON.parse(localStorage.getItem('points'));
    points_earned+=25;
    localStorage.setItem('points',points_earned);
  var message = 'Congrats You skipped a Craving';
    blackberry.ui.toast.show(message);
        bb.pushScreen('track.html','track');
};
records.restart=function(){
    clearInterval(inter);
      ex=false;
    records.tracking=2;
    bb.pushScreen('records.html','records');

};

records.giveup=function(){
    blackberry.ui.dialog.standardAskAsync('You are being tested .Please resist! if you click yes all your hard work will be wasted! You Sure?',blackberry.ui.dialog.D_YES_NO,records.confirm,{title:'Please Dont!!!'});

};
records.confirm=function(selection){

    if(!selection.return.indexOf('Yes'))
    {
    clearInterval(inter);
    records.tracking=0;
    var weekday=new Array(7);
    weekday[0]="sun";
    weekday[1]="mon";
    weekday[2]="tue";
    weekday[3]="wed";
    weekday[4]="thu";
    weekday[5]="fri";
    weekday[6]="sat";
    var d=new Date();
    var n = weekday[d.getDay()];
    var dayadd=JSON.parse(localStorage.getItem(n));
    dayadd+=1;
    localStorage.setItem(n,dayadd);
   // blackberry.ui.dialog.standardAskAsync('Are You Sure???',blackberry.ui.dialog.D_OK_CANCEL,records.onyes,{title:'Please Dont!!!'});    
         ex=false;
    localStorage.setItem('points',0);
    localStorage.setItem('stages',0);
    var deduct=JSON.parse(localStorage.getItem('deductions'));
    deduct+=1;
    localStorage.setItem('deductions',deduct);
    localStorage.setItem('smoke_on',JSON.stringify(d));
   bb.pushScreen('track.html','track');

    }
};
records.call=function()
{
    var pno=JSON.parse(localStorage.getItem('phone'));
    blackberry.invoke.invoke({
        uri: "tel:"+pno
    });
};
