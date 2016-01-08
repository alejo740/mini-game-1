package gui.scenes;

import flambe.asset.AssetPack;
import flambe.asset.Manifest;
import flambe.display.ImageSprite;
import flambe.Entity;
import flambe.swf.MoviePlayer;
import flambe.System;
import globals.NDiGameConstants;
import gui.scenes.NDiAbstractScene;
import managers.NDiResourcesManager;

class NDiTestScene extends NDiAbstractScene
{
	private var rootEntity:Entity;
	
	public function new()
    {
    	super();
    }
    
    override public function onAdded():Void
    {
		super.onAdded();
		var background:ImageSprite = new ImageSprite(NDiResourcesManager.loadImage(NDiGameConstants.ASSET_PACKAGE_GENERAL, "images/backgrounds/test_background"));
		background.centerAnchor();
		background.x._ = NDiGameConstants.GAME_WIDTH * 0.5;
		background.y._ = NDiGameConstants.GAME_HEIGHT * 0.5;
		
		this.rootEntity = new Entity();
		this.rootEntity.add(background);
		this.owner.addChild(this.rootEntity);
    }

	override public function onRemoved():Void
	{
	}

	override public function onUpdate(dt:Float):Void
	{
		super.onUpdate(dt);
	}
}
