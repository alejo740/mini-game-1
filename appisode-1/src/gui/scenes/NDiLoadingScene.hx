package gui.scenes;

import flambe.display.ImageSprite;
import flambe.Entity;
import flambe.script.CallFunction;
import flambe.script.Delay;
import flambe.script.Script;
import flambe.script.Sequence;
import flambe.System;
import gui.components.NDiBarLoading;
import gui.scenes.NDiAbstractScene;
import managers.NDiSceneManager;
import managers.NDiResourcesManager;
import globals.NDiGameConstants;
import flambe.asset.AssetPack;

class NDiLoadingScene extends NDiAbstractScene
{
	public var bAllPackagesLoaded:Bool;
	public var numPackagesLoaded:Int;
	public var listPackageDependences:Array<String>;
	public var nextScene:NDiTypeScene;
	
	private var barLoading:NDiBarLoading;
	private var background:ImageSprite;
	private var rootEntity:Entity;
	
	
	public function new()
    {
    	super();
    	
    	this.numPackagesLoaded = 0;
		
		this.background = new ImageSprite(NDiResourcesManager.loadImage(NDiGameConstants.ASSET_PACKAGE_LOADING, NDiGameConstants.BACKGROUND_LOADING));
		this.background.centerAnchor();
		this.background.x._ = NDiGameConstants.GAME_WIDTH * 0.5;
		this.background.y._ = NDiGameConstants.GAME_HEIGHT * 0.5;
		
		
		this.barLoading = new NDiBarLoading();
		this.barLoading.transform.x._ = (NDiGameConstants.GAME_WIDTH * 0.5)-155;
		this.barLoading.transform.y._ = (NDiGameConstants.GAME_HEIGHT * 0.5)+192;
    }
    
    override public function onAdded():Void
    {
		super.onAdded();
		trace("LOADING... SCENE");
		
		this.rootEntity = new Entity();
		this.rootEntity.add(new Script());
		this.rootEntity.add(this.background);
		this.owner.addChild(this.rootEntity);
		
		this.owner.addChild(this.barLoading.addToEntity());
		
    	this.loadAssets();
    }
	
	private function progressEvent(percent:Float):Void
	{
		this.barLoading.updateBar(percent);
	}

	override public function onRemoved():Void
	{		
		this.rootEntity.dispose();
	}

	override public function onUpdate(dt:Float):Void
	{
		super.onUpdate(dt);
		
		if(!this.bAllPackagesLoaded && (this.numPackagesLoaded >= this.listPackageDependences.length))
		{
			this.bAllPackagesLoaded = true;
			var seq:Sequence = new Sequence([new Delay(0), new CallFunction(pushScene)]);
			this.rootEntity.get(Script).run(seq);
		}
	}
	
	private function pushScene()
	{
		var loadingScene:NDiLoadingScene = cast(NDiSceneManager.getInstance().currentScene, NDiLoadingScene);
		trace(loadingScene.nextScene);		
		NDiSceneManager.getInstance().changeScene(loadingScene.nextScene);
	}
	
	private function loadAssets()
	{
		if(this.listPackageDependences == null || this.listPackageDependences.length == 0)
    	{
			var loadingScene:NDiLoadingScene = cast(NDiSceneManager.getInstance().currentScene, NDiLoadingScene);
			trace(loadingScene.nextScene);		
    		NDiSceneManager.getInstance().changeScene(loadingScene.nextScene);
    	}
    	else
    	{
    		for(pack in this.listPackageDependences)
    		{
    			if(NDiResourcesManager.getInstance().loadedAssetPacks.exists(pack))
    			{
    				this.numPackagesLoaded++;
    			}
    			else
    			{
    				NDiResourcesManager.getInstance().loadAssetPack(pack, this.progressEvent, this.onLoadAssetPack);
    			}
    		}
    	}
	}
	
	public function onLoadAssetPack(pack:AssetPack)
	{
		this.numPackagesLoaded++;
	}
}
