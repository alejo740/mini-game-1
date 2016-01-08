package gui.components.mig8;

import flambe.display.Font;
import flambe.display.TextSprite;
import flambe.display.Texture;
import flambe.Entity;
import globals.NDiGameConstants;
import gui.components.NDiButton;
import managers.NDiResourcesManager;

/**
 * ...
 * @author Edwin
 */
class NDiAnswerButton extends NDiButton
{
	public var numberSprite:TextSprite;
	public var answer:Int;

	public function new(value:Int) 
	{
		super(NDiResourcesManager.loadImage(NDiGameConstants.ASSET_PACKAGE_GENERAL, "images/mig8/rail_selector"));
		this.answer = value;
		
		var font:Font = NDiResourcesManager.loadFont(NDiGameConstants.ASSET_PACKAGE_GENERAL, "fonts/calibri/calibri");
		var valueStr:String = "" + value;
		this.numberSprite = new TextSprite(font, valueStr);
		this.numberSprite.x._ = this.getNaturalWidth() * 0.5;
		this.numberSprite.y._ = this.getNaturalHeight() * 0.5;
		this.numberSprite.centerAnchor();
		this.numberSprite.disablePointer();
		this.centerAnchor();
	}
	
	override public function onAdded():Void
	{
		super.onAdded();		
		this.owner.addChild(new Entity().add(this.numberSprite));
	}
	
}