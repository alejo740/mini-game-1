package managers;

import factories.NDiSceneFactory;
import flambe.display.FillSprite;
import flambe.display.Sprite;
import flambe.math.Rectangle;
import flambe.scene.SlideTransition;
import flambe.script.CallFunction;
import flambe.script.Delay;
import flambe.script.Script;
import flambe.script.Sequence;
import globals.NDiGameConstants;
import gui.scenes.NDiAbstractScene;
import gui.scenes.NDiLoadingScene;
import gui.popups.NDiPopupLoading;

import managers.NDiResourcesManager;
import flambe.System;
import flambe.Entity;
import flambe.scene.Director;
import flambe.scene.FadeTransition;
import flambe.animation.Ease;

class NDiSceneManager
{
	public var currentScene:NDiAbstractScene;
	public var popupLoading:NDiPopupLoading;

	public var director:Director;
	public var transform:Sprite;

	private static var instance:NDiSceneManager;
	
    private function new()
    {
    	this.director = new Director();
		this.transform = new Sprite();
    	System.root.add(this.director);
    }
    
    public function changeScene(sceneType:NDiTypeScene)
	{		
		#if air
		NDiSceneManager.getInstance().popupLoading = new NDiPopupLoading();
		if (this.currentScene != null)
		{
			this.currentScene.owner.addChild(new Entity().add(this.popupLoading));
			
			var seq:Sequence = new Sequence([new Delay(0.05), new CallFunction(function() {				
				this.executeChangeScene(sceneType);
			})]);
			this.currentScene.owner.get(Script).run(seq);
			
		}else {
			this.executeChangeScene(sceneType);
		}
		#else
			this.executeChangeScene(sceneType);
		#end
	}
    private function executeChangeScene(sceneType:NDiTypeScene)
    {
    	var nextScene:NDiAbstractScene = null;
    	var listPackageDependences:Array<String> = new Array<String>();
    	
    	if(this.currentScene != null && this.currentScene.type == NDI_TYPE_SCENE_LOADING)
    	{
    		var loadingScene:NDiLoadingScene = cast(this.currentScene, NDiLoadingScene);
    		nextScene = NDiSceneFactory.createScene(loadingScene.nextScene);
    	}
    	else
    	{
			listPackageDependences.push(NDiGameConstants.ASSET_PACKAGE_GENERAL);
    	}
    	
    	// Check assets in memory.
    	var bAllLoaded:Bool = true;
    	
    	for(pack in listPackageDependences)
    	{
    		if(!NDiResourcesManager.getInstance().loadedAssetPacks.exists(pack))
    		{
    			bAllLoaded = false;
    			break;
    		}
    	}
    	
    	if(!bAllLoaded)
    	{
			//trace("Load ListPackage Singleton");
    		var loadingScene:NDiLoadingScene = new NDiLoadingScene();
    		loadingScene.nextScene = sceneType;
    		loadingScene.listPackageDependences = listPackageDependences;
    		
    		sceneType = NDI_TYPE_SCENE_LOADING;
    		nextScene = loadingScene;
    	}
		else
		{
			if (nextScene == null)
			{
				nextScene = NDiSceneFactory.createScene(sceneType);
			}
		}
    	
    	var sceneEntity:Entity = new Entity();
		sceneEntity.add(new Script());
		
		//var spriteCanvas:Sprite = new FillSprite(0x555555, NDiGameConstants.GAME_WIDTH, NDiGameConstants.GAME_HEIGHT);
		//sceneEntity.addChild(new Entity().add(spriteCanvas));		
		//sceneEntity.add(this.transform);
		
    	sceneEntity.add(nextScene);
		
		if(!bAllLoaded)
		{
    		// Scene transition.		
			var transition:FadeTransition = new FadeTransition(0.3, Ease.quintInOut); 
		
			this.director.unwindToScene(sceneEntity, transition);
		} else {
			var seq:Sequence = new Sequence([new Delay(0.1), new CallFunction(function() 
			{
				//TO DO SOMETHING AT BEGIN
				var transition:FadeTransition = new FadeTransition(0.3, Ease.quintInOut); 
				this.director.unwindToScene(sceneEntity, transition);
				
			})]);
			this.currentScene.owner.get(Script).run(seq);
		}
		
		if(this.currentScene != null)
		{
			this.currentScene.owner.disposeChildren();
		}
		
		this.currentScene = nextScene;
		this.currentScene.type = sceneType;
    }
    
    public static function initInstance():Void
    {
    	if(NDiSceneManager.instance == null)
    	{
    		NDiSceneManager.instance = new NDiSceneManager();
    	}
    }
    
    public static function getInstance():NDiSceneManager
    {
    	return NDiSceneManager.instance;
    }
}
