// Android adapter

var Pollux = function() {
  this.base64StringToImgSrc = function(base64String) {
    return 'data:image/jpeg;base64,' + base64String;
  };

};

var PolluxDeviceFactory = function() {
  this.device = null;

  if (typeof Android !== 'undefined') {
    console.log('Running on a native Android device.');
    device = new AndroidDeviceAdapter();
  } 
  // else if(app !== 'undefined'){
  //   // console.log('Running via phonegap.');
  //   alert('Running via phonegap.');
  //   // device = new PhonegapDeviceAdapter();
  // }
   else {
    console.log('Running in webbrowser');
    device = new WebDeviceAdapter();
  }
  return device;
};

// var PhonegapDeviceAdapter = function(){
//   this.client = app;
//   this.deviceType = 'phonegap application';

//   this.showToast = function(msg) {
//     this.app.showToast(msg);
//   };
// };

var AndroidDeviceAdapter = function() {
  this.client = Android;
  this.deviceType = 'android';

  this.showToast = function(msg) {
    this.client.showToast(msg);
  };

  this.requestImage = function() {
    this.client.requestImage();
  };

  this.showDeviceInfo = function() {
    showDeviceInfo(this.client.getDeviceInfo());
  };

  this.getGeoLocation = function() {
    return '{ error: "Not implemented yet!" }'
  }
  this.discoverBluetoothDevices = function() {
    this.client.discoverBluetoothDevices();
  }
  return this;
};

var WebDeviceAdapter = function() {
  this.deviceType = 'web';

  this.showToast = function(msg) {
    alert(msg);
  };

  this.requestImage = function() {
    alert('Not supported yet');
  };

  this.getGeoLocation = function(callback) {
    navigator.geolocation.getCurrentPosition(function(geoLocation){
      callback(JSON.stringify(geoLocation.coords));
    });
  };
  this.discoverBluetoothDevices = function() {
    alert('Not supported');
  }

  this.showDeviceInfo = function() {
    return showDeviceInfo(JSON.stringify({
      name :         navigator.userAgent,
      bluetooth:     false,
      camera:        false,
      accelerometer: false
    }));
  };

  return this;
};

var PolluxDevice = new PolluxDeviceFactory();
// console.log('Device: '      + PolluxDevice.deviceType);
// console.log('Device info: ' + PolluxDevice.showDeviceInfo())
