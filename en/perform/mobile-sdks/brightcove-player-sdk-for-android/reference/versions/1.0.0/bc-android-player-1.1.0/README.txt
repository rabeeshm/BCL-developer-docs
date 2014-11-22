
Brightcove Android Media Player

=======
SUMMARY
=======

The Brightcove Android Media Player is a Java library for playing back your Brightcove content on an Android device with an OS of 1.5 or higher.

=======
INSTALL
=======

This library requires the bc-android-mediaapi.jar media API library to fetch videos from your account to playback.
Please setup that library first before continuing.

(1) Create or open an Android project

(2) Choose the option to add a new Library to the project

(3) Choose the option to add an External JAR to the project's build path

(4) Select the bc-android-player.jar file distributed in the Brightcove Android Player zip, located in folder labeled 'lib'

(5) Save your project settings and close


======================
PLAYER COMPONENT USAGE
======================

The BCPlayerView class inherits from the Android MediaPlayer class. This is done to give you control over how your
video player is displayed and exposes increased functionality that Android has given developers. The BCPlayerView injects
things extracting the correct url to play back into the MediaPlayer classes flow. The Brightcove specific methods exposed
are load(Video) and setRenditionBitRateRange(Integer Low, Integer High). These port over the major parts of the BCPlayer
class that deal with video playback. To make sure the Brightcove code interacts with the MediaPlayer correctly you need
to follow this flow.

 
  (1) Create the object
      
      BCPlayerView mPlayer;  
      mPlayer = (BCPlayerView) findViewById(R.id.player);

  (2) Set your desired range of renditions

      mPlayer.setRenditionBitRateRange(bitRateLow, bitRateHigh);

  (3) Retrieve your desired video using the Media API SDK, then load it into the player
      NOTE:The video must have atleast one rendition within the range set using setRenditionBitRateRange

      mPlayer.load(pVideo);

  (4) Start video player playback

      mPlayer.start();

=============================
PLAYER COMPONENT EXAMPLE CODE 
=============================

      BCPlayerView mPlayer;  
      mPlayer = (BCPlayerView) findViewById(R.id.player);

      mPlayer.load(pVideo); //video fetched via the media apis, type is Video
      mPlayer.start();

============================
ADDING PLAYER CONTROLS
============================

Player controls in Brightcove's Player SDK are implemented using a combination of layout XML to arrange
the components, and Java code in the View to handle event callbacks and manage view state. The player
controls use custom layout so the Android's MediaController class is not used. To make use of the 
player controls in your project, find the res/ folder in Brightcove's Player SDK and copy all those files
into your project's res/ folder.
     
===================================
TURNING ON ANDROID LOG DEBUGGING
===================================

 Android logging messages can be turned on for the BCPlayerView. All BCPlayerView messages use the 
 tag with the same name 'BCPlayerView'. It is important to note that this should only be turned on during
 development and a call to logEnabled(true) should be removed before publishing your app. By default log messages
 on the BCPlayerView are disabled.
 
      BCPlayerView mPlayer;  
      mPlayer = (BCPlayerView) findViewById(R.id.player);
      
      mPlayer.logEnabled(true);
      
      mPlayer.load(pVideo); //video fetched via the media apis, type is Video
      mPlayer.start();

===================================
SETTING A REGION FOR BCPlayerView
===================================
 The BCPlayerView supports two regions US and Japan (JP). The region is used to track
 BCPlayerView start streams to the appropriate urls. The region is usually set by reading the region that
 the Media API has been set and then passing this to the BCPlayerView. For example:
 
  public ReadAPI mReadAPI = new ReadAPI("MyApiToken");
  mReadAPI.setRegion(RegionEnum.JP);
  
  BCPlayerView mPlayer; 
  mPlayer.setRegion(readAPI.getRegion()); 
  
  You can also read the region that BCPlayerView is set to by calling the mPlayer.getRegion() method.