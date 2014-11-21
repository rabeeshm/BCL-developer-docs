
Brightcove Media API

=======
SUMMARY
=======

The Brightcove Media API is a Java library for employing the JSON based Brightcove Media API 
(http://docs.brightcove.com/en/media/). The media API provides an interface for the Brightcove 
video and playlist API's.

=======
INSTALL
=======

(1) Create or open an Android project

(2) Choose the option to add a new Library to the project

(3) Choose the option to add an External JAR to the project's build path

(4) Select the bc-android-mediaapi.jar file distributed in the Brightcove Media API zip, located in the folder labeled 'lib'

(5) Save your project settings and Close


===============
MEDIA API USAGE
===============

The ReadAPI class is a facade for all Brightcove Media API calls. This enables developers to instantiate it once for any needed calls:

   public Logger mAPILogger = Logger.getLogger("BCAndroidAPILogger");
   public ReadAPI mReadAPI = new ReadAPI("MyApiToken");
   mReadAPI.setLogger(mAPILogger);

Invoke a BC Media API method which will return a Video, Playlist, or ItemCollection. Using logging should only be used in debug builds
not release builds. It is only there to help you debug what the ReadAPI class is doing.

======================
MEDIA API EXAMPLE CODE 
======================

   public Logger mAPILogger = Logger.getLogger("BCAndroidAPILogger");
   public ReadAPI mReadAPI = new ReadAPI("MyApiToken");
   mReadAPI.setLogger(mAPILogger);
	
   //will return video in the user's account with ID:1234
   EnumSet<VideoFieldEnum> videoFields = VideoFieldEnum.createEmptyEnumSet(); 
   videoFields.add(VideoFieldEnum.ID);
   videoFields.add(VideoFieldEnum.NAME);
   videoFields.add(VideoFieldEnum.RENDITIONS);
   videoFields.add(VideoFieldEnum.FLVURL);

   try {
	Video video = mReadAPI.findVideoById(1234, videoFields, null);
   } catch(Exception e) {
        String msg = e.getMessage();
   }



	