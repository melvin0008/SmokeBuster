
var Application = {

    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },

    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },

    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        Application.receivedEvent('deviceready');


        bb.init({
            // Fires "before" styling is applied and "before" the screen is inserted in the DOM
            onscreenready : function(element, id, params)
            {

                        window.onorientationchange=function()
                        {
                             if (id=='report') {
                          reports.init();
                          };
                        }
          },
          ondomready: function(element, id, params) {
                    if(id == 'settings') {
                      settings.init();
                  }
                  else if (id == 'track') {
                    track.init();
                   }
                   else if (id == 'records') {
                    records.init();
                   }
                   else if(id == 'report')
                    {
                      reports.init();
                    }
                    else if(id == 'achieve')
                    {
                      achieve.init();
                    }
                    else if(id == 'benefits')
                    {
                      benefit.init();
                    }
                    else if(id == 'splashScreen')
                    {
                      splash.init();
                    }

                  },

            // Fires "after" styling is applied and "after" the screen is inserted in the DOM
        });
        try {
            // register with bbm
            initapp();
            // setup active frame / window cover
            //App.ui.windowCover.setup('local:///images/cover.png');
        } catch (e) {
            console.log('BBM / Window Covers will not work in the browser. On device only.');
        }


        // start the app
        if(JSON.parse(localStorage.getItem('first'))==null)
        {
               bb.pushScreen('settings.html', 'settings');
        }
              else
              {
            bb.pushScreen('splash.html', 'splashScreen');
          }


    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        console.log('Received Event: ' + id);
    }
};