
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
