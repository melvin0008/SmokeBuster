var settings= new Object();
var track=new Object();
var records=new Object();
var reports=new Object();
track.started=new Date();
records.tracking=0;
var _MS_PER_DAY = 1000 * 60 * 60 * 24;
localStorage.setItem('started_on', JSON.stringify(track.started));
var inter;
localStorage.setItem('craving_skipped',0);
localStorage.setItem('points',0);
settings.init=function()
{
	if(!document.getElementById('check').checked)
	{
	document.getElementById('new').hide();
	}
	console.log(track.started);
};

settings.no_of_times=function(){
	var selected=document.getElementById('check');
	if(selected.checked)
	{
		document.getElementById('new').show();
	}
	else
	{
		document.getElementById('new').hide();
	}

};

settings.validate=function(){
	if(document.getElementById('cig_count').value == ''|| document.getElementById('pac_count').value == ''|| document.getElementById('cost_one').value == ''|| document.getElementById('phone').value == '') {
        alert('Please complete the required fields');
    }
    else
    {
    	if(document.getElementById('not_count').value == '' )
    	{
    		var not_count=document.getElementById('not_count').value;
    		localStorage.setItem('not_count', JSON.stringify(not_count));
    	}
    	var cig_count=document.getElementById('cig_count').value;
    	var pac_count=document.getElementById('pac_count').value;
 	   	var cost_one=document.getElementById('cost_one').value;
 	   	var phone=document.getElementById('phone').value;
 	   	var period=document.getElementById('period').value;
        var time_count=document.getElementById('time_count').value;
 	   	localStorage.setItem('cig_count', cig_count);
 	   	localStorage.setItem('pac_count', pac_count);
 	   	localStorage.setItem('cost_one',cost_one);
 	   	localStorage.setItem('phone', JSON.stringify(phone));
 	   	localStorage.setItem('period',period);
        localStorage.setItem('time_count',time_count);
    }
}

track.init=function()
{
	var end=new Date();
	document.getElementById('last_smoked_on').innerHTML=track.started.toDateString();;

	var diff=(end.getTime()-track.started.getTime())/1000;
    document.getElementById('days_saved_days').innerHTML=Math.round((diff/3600)/24);
	document.getElementById('days_saved_hrs').innerHTML=Math.round((diff/3600)%24);
	document.getElementById('days_saved_mins').innerHTML=Math.round((diff/60)%60);
    var days= track.no_of_days(track.started,end);
    var time_count=localStorage.getItem('time_count');
    var total_time=days*time_count;

    document.getElementById('time_saved_hrs').innerHTML=Math.round(total_time/60);
    document.getElementById('time_saved_mins').innerHTML=Math.round(total_time%60);
    var pac_cnt=localStorage.getItem('pac_count');
    var cost_one=localStorage.getItem('cost_one');
    var tot_money=days*pac_cnt*cost_one;
	document.getElementById('money_saved').innerHTML=tot_money;
    var skipped=localStorage.getItem('craving_skipped');
    document.getElementById('cravings_skipped').innerHTML=skipped;
    var points_earned=localStorage.getItem('points');
    var time_count=localStorage.getItem('time_count');
    document.getElementById('points').innerHTML=points_earned;
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
    console.log("Im back");

}
records.start=function(){
    if(records.tracking!=1 )
    {
            if(records.tracking!=3)
            {
                records.tracking=1;
            //records.init();
                document.getElementById('butt').innerHTML="PAUSE";
                var start = new Date().getTime();
                records.elapsed = '0.0';
                inter=window.setInterval(function()
                {
                var time = new Date().getTime() - start;

                records.elapsed = Math.floor(time / 1000) ;
                var maxtime=localStorage.getItem('period');
                records.elapsed=(maxtime*60)-records.elapsed;
                if(Math.round(records.elapsed) == records.elapsed)
                {
                    records.elapsed += '';
                 }
                 if(records.elapsed==0)
                {
                    clearInterval(inter);
                    document.getElementById('records').refresh();
                }

                document.getElementById('craving').innerHTML = Math.floor(records.elapsed/60);
                document.getElementById('craving_s').innerHTML=(records.elapsed%60);

                }, 1000);
            }
            else
            {
                records.tracking=1;
                document.getElementById('butt').innerHTML="PAUSE"
                var start = new Date().getTime();
                var max=localStorage.getItem('elapsed');
                inter=window.setInterval(function()
                {
                var time = new Date().getTime() - start;

                records.elapsed = Math.floor(time / 1000) ;
                records.elapsed=max-records.elapsed;
                if(Math.round(records.elapsed) == records.elapsed)
                {
                    records.elapsed += '';
                 }
                 if(records.elapsed==0)
                {
                    clearInterval(inter);
                    document.getElementById('records').refresh();
                }

                document.getElementById('craving').innerHTML = Math.floor(records.elapsed/60);
                document.getElementById('craving_s').innerHTML=(records.elapsed%60);

                }, 1000);
            }
    }
    else
    {
        clearInterval(inter);
    records.tracking=3;
    document.getElementById('butt').innerHTML="RESUME";
    localStorage.setItem('elapsed',records.elapsed);
    }
}
records.stop=function(){
    clearInterval(inter);
    records.tracking=0;
    var skipped = JSON.parse(localStorage.getItem('craving_skipped'));
    skipped+=1;
    localStorage.setItem('craving_skipped',skipped);
    var points_earned = JSON.parse(localStorage.getItem('points'));
    points_earned+=25;
    localStorage.setItem('points',points_earned);
    blackberry.ui.dialog.standardAskAsync('Hurray!!!!',blackberry.ui.dialog.D_OK,null,{title:'Congrats!!'});
        bb.pushScreen('track.html','track');
  //  bb.pushScreen('records.html','records');
}
records.restart=function(){
    clearInterval(inter);
    records.tracking=2;
    bb.pushScreen('records.html','records');
}
records.onyes=function(){

}
records.giveup=function(){
    clearInterval(inter);
    blackberry.ui.dialog.standardAskAsync('Are You Sure???',blackberry.ui.dialog.D_OK_CANCEL,records.onyes,{title:'Please Dont!!!'});    
}


track.no_of_days=function(a,b)
{
  var utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  var utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

  return Math.floor((utc2 - utc1) / _MS_PER_DAY);
}

reports.init=function()
{
    reports.basic_bars();
}

reports.basic_bars=function(){
  var
    d1 = [[0, 3], [1, 8], [2, 5], [4, 13]], // First data series
    d2 = [],                                // Second data series
    i, graph;

  // Generate first data set
  for (i = 0; i < 4; i ++) {
    d2.push([i, Math.sin(i)]);
  }
  var container=document.getElementById('chart_div');

  // Draw Graph
  graph = Flotr.draw(container, [ d1, d2 ], {
    xaxis: {
      minorTickFreq: 4
    },
    grid: {
      minorVerticalLines: true
    }
  });
};


