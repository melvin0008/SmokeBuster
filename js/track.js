
var track=new Object();
track.started=JSON.parse(localStorage.getItem('started_on'));
track.starting=JSON.parse(localStorage.getItem('smoke_on'));
track.init=function()
{
    track.started=JSON.parse(localStorage.getItem('started_on'));
    track.starting=JSON.parse(localStorage.getItem('smoke_on'));
    var during=new Date(track.starting);
    var lastsmoked=document.getElementById("lastsmokedon");
    lastsmoked.innerHTML=during.toDateString();
    track.refreshtrack();
    var trackinter=window.setInterval(function(){
        track.refreshtrack();
        document.getElementById('track').refresh();
    },60000);
};
track.refreshtrack=function()
{
    var end=new Date();
    track.started=JSON.parse(localStorage.getItem('started_on'));
    track.starting=JSON.parse(localStorage.getItem('smoke_on'));
    var dur=new Date(track.started);
      var during=new Date(track.starting);
    var diff=(end.getTime()-dur.getTime())/1000;
    var difference=(end.getTime()-during.getTime())/1000;
    var days_saved_days=Math.floor((difference/3600)/24);
    var days_saved_hrs=Math.floor((difference/3600)%24);
    var days_saved_mins=Math.floor((difference/60)%60);
    document.getElementById('days_saved_days').innerHTML=(days_saved_days>=0)?days_saved_days:0;
    document.getElementById('days_saved_hrs').innerHTML=(days_saved_hrs>=0)?days_saved_hrs:0;
    document.getElementById('days_saved_mins').innerHTML=(days_saved_mins>=0)?days_saved_mins:0;
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
    var healthpercent=Math.round((days/365)*100);
    healthh.innerHTML=(healthpercent>=0)?healthpercent:0;
};


track.no_of_days=function(a,b)
{
    var _MS_PER_DAY = 1000 * 60 * 60 * 24;
  var utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  var utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

  return Math.floor((utc2 - utc1) / _MS_PER_DAY);
};

track.shareTextMockingSelection=function() {
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

onInvokeSuccess=function  (msg) {
    console.log("Invocation Success" + msg);
};

onInvokeError=function (msg) {
    console.log("Invocation Error: " + msg);
 };

