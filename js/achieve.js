var achieve=new Object();
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

onInvokeSuccess=function  (msg) {
    console.log("Invocation Success" + msg);
};

onInvokeError=function (msg) {
    console.log("Invocation Error: " + msg);
 };
