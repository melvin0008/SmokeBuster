var reports=new Object();
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
onInvokeSuccess=function  (msg) {
    console.log("Invocation Success" + msg);
};

onInvokeError=function (msg) {
    console.log("Invocation Error: " + msg);
};