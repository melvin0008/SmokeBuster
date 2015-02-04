var settings= new Object();
settings.init=function()
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
    var qdate=document.getElementById('qdate').value;
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
        if(qdate!='')
        {
            localStorage.setItem('smoke_on',JSON.stringify(qdate));

        }

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
