package gui.components;

import flambe.Component;
import flambe.display.ImageSprite;
import flambe.display.Sprite;
import flambe.display.Texture;
import flambe.Entity;
import globals.NDiGameConstants;
import managers.NDiResourcesManager;

/**
 * ...
 * @author Edwin
 */
class NDiBarLoading extends Component
{
	private var bar:ImageSprite;	
	public var transform:Sprite;
	private var icon:ImageSprite;

	public function new() 
	{
		this.transform = new Sprite();
	}
	
	public function updateBar(value:Float)
	{
		//this.bar.setScaleXY(value, this.bar.scaleY._);
		if (value > 1)
		{
			value = 1;
		}else if (value < 0)
		{
			value = 0;
		}
		this.bar.scaleX.animateTo(value, 0.3);
	}
	
	private function addBar() 
	{
		/*MAIN BAR*/
		var barLifeTexture:Texture = NDiResourcesManager.loadImage(NDiGameConstants.ASSET_PACKAGE_LOADING, NDiGameConstants.BAR_LOADING);
		this.bar = new ImageSprite(barLifeTexture);		
		this.owner.addChild(new Entity().add(this.bar));
		this.bar.scaleX._ = 0;
		/*ICON*/
		var lifeIconTexture:Texture = NDiResourcesManager.loadImage(NDiGameConstants.ASSET_PACKAGE_LOADING, NDiGameConstants.ICON_BAR_LOADING);
		var lifeIcon:ImageSprite = new ImageSprite(lifeIconTexture);
		 lifeIcon.centerAnchor();		 
		 lifeIcon.y._ = 15;		 
		 lifeIcon.x._ = -40;
		 this.owner.addChild(new Entity().add(lifeIcon));
		
	}
	
	override public function onAdded():Void
    {
		this.owner.add(transform);
		this.addBar();
	}
	
	public function addToEntity():Entity
	{
		new Entity().add(this);		
		return this.owner;
	}
	
}