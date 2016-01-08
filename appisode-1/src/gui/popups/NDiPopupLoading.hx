package gui.popups;

import data.NDiLocalizationData;
import flambe.Component;
import flambe.display.Font.TextAlign;
import flambe.display.Sprite;
import flambe.display.TextSprite;
import flambe.display.Texture;
import flambe.Entity;
import globals.NDiGameConstants;
import managers.NDiLocalizationManager;
import managers.NDiResourcesManager;
import gui.components.NDiImage;

/**
 * ...
 * @author Edwin
 */
class NDiPopupLoading extends Component
{
	private var background:NDiImage;
	
	public var transform:Sprite;
	
	public function new() 
	{
		this.transform = new Sprite();
		this.transform.x._ = NDiGameConstants.GAME_WIDTH * 0.5;
		this.transform.y._ = NDiGameConstants.GAME_HEIGHT * 0.5;
		
		var backgroundTexture:Texture = NDiResourcesManager.loadImage(NDiGameConstants.ASSET_PACKAGE_GENERAL, "images/backgrounds/loading_bg");
		this.background = new NDiImage(backgroundTexture);
			
	}
	
	override public function onAdded():Void
    {
		super.onAdded();
		this.owner.add(this.transform);
		
		this.owner.addChild(new Entity().add(this.background));
	}
	
}