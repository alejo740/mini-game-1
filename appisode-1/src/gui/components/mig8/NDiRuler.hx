package gui.components.mig8;

import flambe.display.Font.TextAlign;
import flambe.display.TextSprite;
import flambe.display.Texture;
import flambe.Entity;
import globals.NDiGameConstants;
import gui.components.NDiImage;
import managers.NDiResourcesManager;

/**
 * ...
 * @author Edwin
 */
class NDiRuler extends NDiImage
{
	public var indexBridge:Int;
	public var number:TextSprite;
	public function new(texture:Texture, indexRail:Int, indexRule:Int) 
	{
		super(texture);
		this.indexBridge = indexRail;
		var valueStr:String = "" + (indexRule + 1);
		this.number = new TextSprite(NDiResourcesManager.loadFont(NDiGameConstants.ASSET_PACKAGE_GENERAL, "fonts/calibri/calibri"), valueStr);
		this.number.centerAnchor();
		this.number.align = TextAlign.Center;
		this.number.x._ = this.image.getNaturalWidth() * 0.5;
		this.number.y._ = -25;
	}
	
	override public function onAdded():Void
    {
		super.onAdded();		
		//this.owner.addChild(new Entity().add(this.number));
    }
	
}