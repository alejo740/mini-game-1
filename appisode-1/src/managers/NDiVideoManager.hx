package managers;
import flambe.System;
import globals.NDiGameConstants.NDiTypeScene;

/**
 * ...
 * @author ...
 */
class NDiVideoManager
{
	private static var instance:NDiVideoManager;
	public var playingVideo:Bool;
	public function new() 
	{
		this.playingVideo = false;
	}
	
	public static function loadVideo(url:String, endingCallBack:Void->Void, startingCallBack:Void->Void)
	{
		//trace("loadVIdeo 11: " + url);
		if (endingCallBack != null)
		{
			System.external.bind("flambeBackToGame", function() {
				endingCallBack();
			});
		}
		//trace("loadVIdeo 22: " + url);	
		if (startingCallBack != null)
		{
			System.external.bind("flambeStartVideo", function() {
				startingCallBack();
			});
		}
		
		//trace("loadVIdeo 33: " + url);			
		System.external.call("showVideoTag", [url]);
		///trace("loadVIdeo 44: " + url);
		NDiVideoManager.getInstance().playingVideo = true;
	}
	
	public static function stopVideo()
	{
		if (!NDiVideoManager.getInstance().playingVideo)
			return;
			
		trace("stopVideo");				
		//NDiAudioManager.getInstance().setEnabledSoundBackground();
		NDiVideoManager.getInstance().playingVideo = false;
		System.external.call("stopVideo");
	}
	
	public static function pauseVideo(value:Bool)
	{
		System.external.bind("flambePauseVideo", function() {
			NDiScenesController.getInstance().pauseGame();
		});
		if (value)
		{			
			System.external.call("pauseVideo");
		}else {			
			System.external.call("playVideo");
		}
	}
	
	
	
	/*
	 * STATIC METHODS
	 */
    public static function initInstance():Void
    {
    	if(NDiVideoManager.instance == null)
    	{
    		NDiVideoManager.instance = new NDiVideoManager();
    	}
    }
    
    public static function getInstance():NDiVideoManager
    {
    	return NDiVideoManager.instance;
    }
	
}