package managers;
import flambe.Entity;
import globals.NDiGameConstants;
import gui.scenes.NDiAbstractScene;
import gui.scenes.NDiPause;
import gui.scenes.NDiStop;

/**
 * ...
 * @author Edwin
 */
class NDiScenesController
{
	private static var instance:NDiScenesController;
	public var currentScene:Int;
	public var countVideos:Int;
	public var isGamePause:Bool;
	private var pauseScene:NDiPause;
	private var stopScene:NDiStop;

	public function new() 
	{
		this.currentScene = 0;
		this.countVideos = 0;
		this.isGamePause = true;
	}
	
	public function initPauseScene()
	{
		if (NDiResourcesManager.getInstance() != null && !NDiResourcesManager.getInstance().loadedAssetPacks.exists(NDiGameConstants.ASSET_PACKAGE_GENERAL))
			return;
			
		if (this.isGamePause == true)
		{
			this.isGamePause = false;
			this.pauseScene = new NDiPause();
			this.stopScene = new NDiStop();
		}
	}
	
	public function initialScene()
	{
		this.currentScene = 2;
		this.countVideos = 1;
		var typeScene:NDiTypeScene = NDiGameConstants.SCENES_FLOW[this.currentScene];
		NDiSceneManager.getInstance().changeScene(typeScene);
	}
	
	public function goBackToMig()
	{
		this.currentScene -= 2;
		this.countVideos -= 1;
		var typeScene:NDiTypeScene = NDiGameConstants.SCENES_FLOW[this.currentScene];
		NDiSceneManager.getInstance().changeScene(typeScene);
	}
	
	public function pauseGame(resume:Bool = false)
	{
		if (!this.isGamePause && !resume)
		{
			
				this.isGamePause = true;
				new Entity().add(this.pauseScene);
				//NDiVideoManager.pauseVideo(true);
				NDiSceneManager.getInstance().director.pushScene(this.pauseScene.owner);			
			
		}else {
			this.isGamePause = false;
			NDiSceneManager.getInstance().director.popScene();
			//NDiVideoManager.pauseVideo(false);
		}
	}
	
	public function stopGame()
	{
		new Entity().add(this.stopScene);
		NDiVideoManager.stopVideo();
		NDiSceneManager.getInstance().director.pushScene(this.stopScene.owner);
	}
	
	public function nextScene()
	{
		if (this.currentScene + 1 >= NDiGameConstants.SCENES_FLOW.length)
		{
			trace("---- Last Scene");
			return;
		}
		
		NDiAudioManager.getInstance().stopSoundEffect();
		
		if (this.isGamePause)
		{
			this.pauseGame();
		}
		
		var typeScene:NDiTypeScene = NDiGameConstants.SCENES_FLOW[this.currentScene];
		if (typeScene == NDI_TYPE_SCENE_VIDEO)
		{
			NDiScenesController.getInstance().countVideos++;
		}
		
		this.currentScene++;
		typeScene = NDiGameConstants.SCENES_FLOW[this.currentScene];
		NDiSceneManager.getInstance().changeScene(typeScene);
	}
	
	public function previousScene()
	{		
		if (this.currentScene - 1 < 0)
		{
			trace("---- First Scene");
			return;
		}
		
		NDiAudioManager.getInstance().stopSoundEffect();
		
		if (this.isGamePause)
		{
			this.pauseGame();
		}
		
		this.currentScene--;
		
		var typeScene:NDiTypeScene = NDiGameConstants.SCENES_FLOW[this.currentScene];
		if (typeScene == NDI_TYPE_SCENE_VIDEO)
		{
			NDiScenesController.getInstance().countVideos--;
		}
		NDiSceneManager.getInstance().changeScene(typeScene);
	}
	
	/*
	 * STATIC METHODS
	 */
    public static function initInstance():Void
    {
    	if(NDiScenesController.instance == null)
    	{
    		NDiScenesController.instance = new NDiScenesController();
    	}
    }
    
    public static function getInstance():NDiScenesController
    {
    	return NDiScenesController.instance;
    }
	
}