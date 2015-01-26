var settings= new Object();
var track=new Object();
var records=new Object();
var reports=new Object();
var achieve=new Object();
var benefit=new Object();
var splash=new Object();
var share =new Object();
records.tracking=0;//global

track.started=JSON.parse(localStorage.getItem('started_on'));
track.starting=JSON.parse(localStorage.getItem('smoke_on'));
var inter;//global

var ex=false;
settings.init=function()
{

    settings.setval();
};

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


settings.setval=function()
{
    if(localStorage.getItem("hard")==null)
    {
            localStorage.setItem("hard","never");
            localStorage.setItem('craving_skipped',0);
            localStorage.setItem('points',0);
            localStorage.setItem('jan',0);
            localStorage.setItem('feb',0);
            localStorage.setItem('mar',0);
            localStorage.setItem('apr',0);
            localStorage.setItem('may',0);
            localStorage.setItem('jun',0);
            localStorage.setItem('jul',0);
            localStorage.setItem('aug',0);
            localStorage.setItem('sep',0);
            localStorage.setItem('oct',0);
            localStorage.setItem('nov',0);
            localStorage.setItem('dec',0);
            localStorage.setItem('sun',0);
            localStorage.setItem('mon',0);
            localStorage.setItem('tue',0);
            localStorage.setItem('wed',0);
            localStorage.setItem('thu',0);
            localStorage.setItem('fri',0);
            localStorage.setItem('sat',0);
            localStorage.setItem('deductions',0);
            localStorage.setItem('flag',1);
            track.started=new Date(); 
            localStorage.setItem('started_on',JSON.stringify(track.started));
            localStorage.setItem('smoke_on',JSON.stringify(track.started));   
    }

};
settings.reset=function()
{
    blackberry.ui.dialog.standardAskAsync('You will lose all your data if you press YES! You Sure?',blackberry.ui.dialog.D_YES_NO,settings.yes,{title:'Reset'});
  
};
settings.yes=function(selection)
{

    if(!selection.return.indexOf('Yes'))
    {
    localStorage.removeItem("hard");
    localStorage.clear();
    var message = 'Please Enter new Settings';
    blackberry.ui.toast.show(message); 
    bb.pushScreen('settings.html', 'settings');

    }
};

settings.validate=function()
{
    var scig=document.getElementById('cig_count').value;
    var spac=document.getElementById('pac_count').value ;
    var scost =document.getElementById('cost_one').value;
    var sphone=document.getElementById('phone').value;
    var scount=document.getElementById('time_count').value;
    var period=document.getElementById('period').value;

    if((localStorage.getItem("cig_count")==null || localStorage.getItem("pac_count")==null || localStorage.getItem("cost_one")==null || localStorage.getItem("phone")==null || localStorage.getItem("period")==null || localStorage.getItem("time_count")==null)&&( scig== ''|| spac == '' ||  scost == ''||  sphone== '' || scount== '' || period==''))
    {
        var message = 'Please Enter all Fields';
        blackberry.ui.toast.show(message);
    }
    else
    {

        if(scig!='') 
        {
        	
            localStorage.setItem('cig_count', scig);
        }
        if(spac!='')
        {
    
            localStorage.setItem('pac_count', spac);
     	}
        if( scost!='')
        {        
            localStorage.setItem('cost_one',scost);

        } 
        if( sphone!='')
        {
                localStorage.setItem('phone', JSON.stringify(sphone));
        }

        if(period!='')
        {   
             localStorage.setItem('period',period);
        }
        if(scount!='')
     	{   	 	   
            localStorage.setItem('time_count',scount);
         } 
           var message = 'Settings Saved';
            blackberry.ui.toast.show(message);
            if(localStorage.getItem('first')==null)
            {
                localStorage.setItem('first',54);

            }

            bb.pushScreen('splash.html','splashScreen');
    }
    

};

track.init=function()
{
    track.started=JSON.parse(localStorage.getItem('started_on'));
    track.starting=JSON.parse(localStorage.getItem('smoke_on'));
     var during=new Date(track.starting);
    var lastsmoked=document.getElementById("lastsmokedon");
    lastsmoked.innerHTML=during.toDateString();
    track.initinit();
    var trackinter=window.setInterval(function(){
        track.initinit();
        document.getElementById('track').refresh();
    },60000);
};
track.initinit=function()
{
    var end=new Date();
    track.started=JSON.parse(localStorage.getItem('started_on'));
    track.starting=JSON.parse(localStorage.getItem('smoke_on'));
    var dur=new Date(track.started);
      var during=new Date(track.starting);
    var diff=(end.getTime()-dur.getTime())/1000;
    var difference=(end.getTime()-during.getTime())/1000;
    
    document.getElementById('days_saved_days').innerHTML=Math.floor((difference/3600)/24);
    document.getElementById('days_saved_hrs').innerHTML=Math.floor((difference/3600)%24);
    document.getElementById('days_saved_mins').innerHTML=Math.floor((difference/60)%60);
    var hrs=Math.floor(diff/3600);
    var days= track.no_of_days(during,end);
    
    var pac_cnt=localStorage.getItem('pac_count');
    var cig_count=localStorage.getItem('cig_count')
    var cost=localStorage.getItem('cost_one');
    cost= cost.toString();
    var j=cost.length;
    var i;
    for(i=0;i<=j;i++)
    {
    if(isNaN(cost[i]))
    {
        break;
    }
    }
    var l=cost.substr(i);
    var cost_one=parseInt(cost.slice(0,i));


    var deductions=localStorage.getItem('deductions');
    var tot_money=Math.round(((hrs/24)*pac_cnt*cost_one)-(deductions*cost_one/cig_count));
    var moneys=document.getElementById('money_saved');
    if(tot_money>=0)
    {
       moneys.innerHTML=tot_money;
    }
    else
    {
        moneys.innerHTML=0;
    }

    var time_count=JSON.parse(localStorage.getItem('time_count'));
    var total_time=Math.round(((hrs/24)*time_count)-(deductions*time_count/cig_count));
    if(total_time<=0)
    {
    total_time=0;    
    }
    var time_saved_hr=document.getElementById('time_saved_hrs');
    var time_saved_min=document.getElementById('time_saved_mins');
    time_saved_hr.innerHTML=Math.floor(total_time/60);
    time_saved_min.innerHTML=Math.round(total_time%60);
    
    var curr=document.getElementById('currency');
    var craving_skip=document.getElementById('cravings_skipped');
    var pointss=document.getElementById('points');
    var healthh=document.getElementById('health');
    curr.innerHTML=l; 
    var skipped=localStorage.getItem('craving_skipped');
    craving_skip.innerHTML=skipped;
    var points_earned=localStorage.getItem('points');
    pointss.innerHTML=points_earned;
    healthh.innerHTML=Math.round((days/365)*100);
};
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



track.no_of_days=function(a,b)
{
    var _MS_PER_DAY = 1000 * 60 * 60 * 24;
  var utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  var utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

  return Math.floor((utc2 - utc1) / _MS_PER_DAY);
};

reports.init=function()
{

    var c_d=document.getElementById('chart_div');
    var c_l=document.getElementById('chart_line');
        reports.basic_bars(false,c_d);
        reports.basic_line(false,c_l);
};

reports.basic_bars=function(horizontal,container){
    var t1=JSON.parse(localStorage.getItem('jan'));
    var t2=JSON.parse(localStorage.getItem('feb'));
    var t3=JSON.parse(localStorage.getItem('mar'));
    var t4=JSON.parse(localStorage.getItem('apr'));
    var t5=JSON.parse(localStorage.getItem('may'));
    var t6=JSON.parse(localStorage.getItem('jun'));
    var t7=JSON.parse(localStorage.getItem('jul'));
    var t8=JSON.parse(localStorage.getItem('aug'));
    var t9=JSON.parse(localStorage.getItem('sep'));
    var t10=JSON.parse(localStorage.getItem('oct'));
    var t11=JSON.parse(localStorage.getItem('nov'));
    var t12=JSON.parse(localStorage.getItem('dec'));

  var
    d1 = [[1,t1], [2,t2], [3,t3], [4,t4],[5,t5], [6,t6], [7,t7], [8,t8], [9,t9], [10,t10], [11,t11], [12,t12]] ,// First data series                                // Second data series
    i;

  var tempp=6;
  if(window.orientation==90||window.orientation==270)
  {
    tempp=12;
  }
      Flotr.draw(
    container,
    [d1],
    {
      bars : {
        show : true,
        horizontal : horizontal,
        shadowSize : 0,
        barWidth : 0.5
      },
      mouse : {
        track : true,
        relative : true
      },
      xaxis : {

        noTicks:tempp,
        tickFormatter: function(x){
            var 
            x=parseInt(x),
            moths=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
            return moths[(x-1)%12];
        }       
      },
      yaxis : {
        min : 0,
        autoscaleMargin : 1
      }
    }
  );
};


reports.basic_line=function(horizontal,container) {
var t1=JSON.parse(localStorage.getItem('sun'));
    var t2=JSON.parse(localStorage.getItem('mon'));
    var t3=JSON.parse(localStorage.getItem('tue'));
    var t4=JSON.parse(localStorage.getItem('wed'));
    var t5=JSON.parse(localStorage.getItem('thu'));
    var t6=JSON.parse(localStorage.getItem('fri'));
    var t7=JSON.parse(localStorage.getItem('sat'));
    
  var
    d1 = [[1,t1], [2,t2], [3,t3], [4,t4],[5,t5], [6,t6], [7,t7]] ,// First data series                                // Second data series
    i;

  var tempp=6;
  if(window.orientation==90||window.orientation==270)
  {
    tempp=7;
  }
      Flotr.draw(
    container,
    [d1],
    {
      bars : {
        show : true,
        horizontal : horizontal,
        shadowSize : 0,
        barWidth : 0.5
      },
      mouse : {
        track : true,
        relative : true
      },
      xaxis : {

        noTicks:tempp,
        tickFormatter: function(x){
            var 
            x=parseInt(x),
            monnths=['Sun','Mon','Tue','Wed','Thur','Fri','Sat'];
            return monnths[(x-1)%7];
        }       
      },
      yaxis : {
        min : 0,
        autoscaleMargin : 1
      }
    }
  );
  
};


/////////////////////////////////////Share/////////////////////////
reports.shareTextMockingSelection=function() {
  var skipped=localStorage.getItem('craving_skipped');
        var request = {
        action : 'bb.action.SHARE',
        mime : 'text/plain',
        data : 'I have skipped '+skipped+' cravings',
        target_type: ["VIEWER","CARD"]
    };

    blackberry.invoke.card.invokeTargetPicker(request,"Sharing Text", onInvokeSuccess, onInvokeError);
};
achieve.shareTextMockingSelection=function() {
  var stages=localStorage.getItem('stages');
  var points=localStorage.getItem('points');
        var request = {
        action : 'bb.action.SHARE',
        mime : 'text/plain',
        data : 'I have won '+points+'points and have unlocked ' + stages+' levels' ,
        target_type: ["VIEWER","CARD"]
    };

    blackberry.invoke.card.invokeTargetPicker(request,"Sharing Text", onInvokeSuccess, onInvokeError);
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
function shareTextMockingSelection() {
    var request = {
        action : 'bb.action.SHARE',
        mime : 'text/plain',
        data : 'Some awesome text',
        target_type: ["VIEWER", "CARD"]
    };

    blackberry.invoke.card.invokeTargetPicker(request, "Sharing Text", onInvokeSuccess, onInvokeError);
};
onInvokeSuccess=function  (msg) {
    console.log("Invocation Success" + msg);
};

onInvokeError=function (msg) {
    console.log("Invocation Error: " + msg);
 };

achieve.init=function(){
    var end=new Date();
    track.starting=JSON.parse(localStorage.getItem('smoke_on'));
    var dur=new Date(track.starting);
    var days= track.no_of_days(dur,end);
    var unlock=0;
    var items = [],
      item;
 var points_earned = JSON.parse(localStorage.getItem('points'));
var skipped = JSON.parse(localStorage.getItem('craving_skipped'));

item = document.createElement('div');
     item.setAttribute('data-bb-type','item');
     item.setAttribute('data-bb-title','One Day! Great Start!');
     if(days>=1)
     {
        item.innerHTML = 'Well begun is half work done';
        item.setAttribute('data-bb-img','images/achieve.png');
        points_earned+=25;
        unlock++;
     }
     else
     {
        item.innerHTML = 'LOCKED';
        item.setAttribute('data-bb-img','images/lock.png'); 
     }
     items.push(item);
item = document.createElement('div');
     item.setAttribute('data-bb-type','item');
     item.setAttribute('data-bb-title','Wow!!! Its been a week');
     if(days>=7)
     {
        item.innerHTML = 'Commendable Job!!Keep Going!';
        item.setAttribute('data-bb-img','images/achieve.png');
         points_earned+=50;
        unlock++;
     }
     else
     {
        item.innerHTML = 'LOCKED';
        item.setAttribute('data-bb-img','images/lock.png');  
     }
     items.push(item);

item = document.createElement('div');
     item.setAttribute('data-bb-type','item');
     item.setAttribute('data-bb-title','One Month! Superb!!');
     if(days>=30)
     {
        item.innerHTML = 'You do have what it takes to quit!';
        item.setAttribute('data-bb-img','images/achieve.png');
        points_earned+=75;
        unlock++;
     }
     else
     {
        item.innerHTML = 'LOCKED';
        item.setAttribute('data-bb-img','images/lock.png');  
     }
     items.push(item);

item = document.createElement('div');
     item.setAttribute('data-bb-type','item');
     item.setAttribute('data-bb-title','45 days !Way to go!');
     if(days>=45)
     {
        item.innerHTML = 'You saved a lot of money!!';
        item.setAttribute('data-bb-img','images/achieve.png');
        points_earned+=100;
        unlock++;
     }
     else
     {
        item.innerHTML = 'LOCKED';
        item.setAttribute('data-bb-img','images/lock.png');  
     }
     items.push(item);

item = document.createElement('div');
     item.setAttribute('data-bb-type','item');
     item.setAttribute('data-bb-title','60 days Without Smoking!!');
     if(days>=60)
     {
        item.innerHTML = 'Excellent Determination!!';
        item.setAttribute('data-bb-img','images/achieve.png');
        points_earned+=150;
        unlock++;
     }
     else
     {
        item.innerHTML = 'LOCKED';
        item.setAttribute('data-bb-img','images/lock.png');  
     }

     items.push(item);

item = document.createElement('div');
     item.setAttribute('data-bb-type','item');
     item.setAttribute('data-bb-title','100 Craving skipped bonus!');

     if(skipped>=100)
     {
        item.innerHTML = 'Keep Going!!buddy!';
        item.setAttribute('data-bb-img','images/achieve.png');
        points_earned+=500;
        unlock++;
     }
     else
     {
        item.innerHTML = 'LOCKED';
        item.setAttribute('data-bb-img','images/lock.png');  
     }

          items.push(item);



item = document.createElement('div');
     item.setAttribute('data-bb-type','item');
     item.setAttribute('data-bb-title','100 days Arn\'t You Proud!');
     if(days>=100)
     {
        item.innerHTML = 'Pat Your Back!You deserve It';
        item.setAttribute('data-bb-img','images/achieve.png');
        points_earned+=200;
        unlock++;
     }
     else
     {
        item.innerHTML = 'LOCKED';
        item.setAttribute('data-bb-img','images/lock.png');  
     }
     items.push(item);


item = document.createElement('div');
     item.setAttribute('data-bb-type','item');
     item.setAttribute('data-bb-title','6 months! Treat yourself!!');
     if(days>=183)
     {
        item.innerHTML = 'You have saved a lot there';
        item.setAttribute('data-bb-img','images/achieve.png');
         points_earned+=250;
        unlock++;
     }
     else
     {
        item.innerHTML = 'LOCKED';
        item.setAttribute('data-bb-img','images/lock.png');  
     }
          items.push(item);

item = document.createElement('div');
     item.setAttribute('data-bb-type','item');
     item.setAttribute('data-bb-title','1000 Craving skipped bonus!');

     if(skipped>=1000)
     {
        item.innerHTML = 'Now thats an achievement';
        item.setAttribute('data-bb-img','images/achieve.png');
        points_earned+=1000;
        unlock++;
     }
     else
     {
        item.innerHTML = 'LOCKED';
        item.setAttribute('data-bb-img','images/lock.png');  
     }
   items.push(item);

item = document.createElement('div');
     item.setAttribute('data-bb-type','item');
     item.setAttribute('data-bb-title','9 months! Kudos Its been long!');
     if(days>=275)
     {
        item.innerHTML = 'Look back !! Analyse!! Smile!!';
        item.setAttribute('data-bb-img','images/achieve.png');
        points_earned+=300;
        unlock++;
     }
     else
     {
        item.innerHTML = 'LOCKED';
        item.setAttribute('data-bb-img','images/lock.png');  
     }
     items.push(item);

item = document.createElement('div');
     item.setAttribute('data-bb-type','item');
     item.setAttribute('data-bb-title','Hurray!! One year!');
    if(days>=365)
     {
        item.innerHTML = 'Hats off to You ';
        item.setAttribute('data-bb-img','images/achieve.png');
        points_earned+=365;
        unlock++;
     }
     else
     {
        item.innerHTML = 'LOCKED';
        item.setAttribute('data-bb-img','images/lock.png');  
     }
     items.push(item);
    if(JSON.parse(localStorage.getItem('stages'))!=unlock)
    {
        localStorage.setItem('points',points_earned);
    }
    localStorage.setItem('stages',unlock);
    document.getElementById('mylist').refresh(items);

};
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

share.call=function()
{
    var pno=JSON.parse(localStorage.getItem('phone'));
    blackberry.invoke.invoke({
        uri: "tel:"+pno
    });
};


////////////////////////////////////////////

var bbm = {
  registered : false,

  // Registers this application with the blackberry.bbm.platform APIs.
  register : function() {
    blackberry.event.addEventListener('onaccesschanged', function accessChangedCallback(accessible, status) {
      // called when access is given by the user to connect w/bbm via bbm.register()

      console.log("BBM Service Status: " + status);
      if (status === 'unregistered') {
        blackberry.bbm.platform.register({
          // Randomly generated UUID using any online service
          uuid : 'f2c7f59a-b84a-454b-b2ba-12c88e4c755f'
        });
      } else if (status === 'allowed') {
        bbm.registered = accessible;
      } else if (status === 'pending') 
      {
        console.log('Access is pending and being processed.');
      } else if (status === 'user') {
       
        console.log('Access is blocked by the user.');
      } else if (status === 'nodata') {
       
        console.log('Access is blocked because the device is out of data coverage. A data connection is required to register the application.');
      } else if (status === 'temperror') {
       
        console.log('Access is blocked because of a temporary error. The application should try to call blackberry.bbm.platform.register in 30 minutes, or the next time the application starts.');
      } else {
       
        console.log("BBM Service Status: " + status);
      }
    }, false);
  },

  // Invite a contact to download your app via bbm
  inviteToDownload : function() {
    if(bbm.registered!=false)
    {
    blackberry.bbm.platform.users.inviteToDownload();
    }
    else
    {
        blackberry.ui.toast.show('App not connected to BBM');
    }
  }
};


initapp=function()
{
        var inRipple = ((navigator.userAgent.indexOf('Ripple') >= 0) || window.tinyHippos);
        if(inRipple)
        {
            console.log("sorry bro");
        }
        else
        {
            bbm.register();

                   var coverimage = 'local:///images/coverZ.png';

    // If the device has a 1:1 screen ratio, use the appropriate cover
    if (window.innerWidth === window.innerHeight)
      coverimage = 'local:///images/coverQ.png';

    blackberry.ui.cover.setContent(blackberry.ui.cover.TYPE_IMAGE, {
      path : coverimage
    });




    blackberry.event.addEventListener("entercover", function() {
        var coverlabel = 'Kill It Before It Kills You';
      // Set the text for the label
      blackberry.ui.cover.labels = [{
        label : coverlabel,
        size : 10,
        wrap : true
      }];
      blackberry.ui.cover.updateCover();
    });

 }
}