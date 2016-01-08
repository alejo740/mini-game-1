package gui.components;
import flambe.display.Font;
import flambe.display.TextSprite;
import flambe.Entity;
import globals.NDiGameConstants;
import managers.NDiResourcesManager;

/**
 * ...
 * @author Edwin
 */
class NDiButtonFillText extends NDiButtonFill
{
	public var text:TextSprite;
	public function new(color:Int, width:Float, height:Float )
	{
		super(color, width, height);
		var font:Font = NDiResourcesManager.loadFont(NDiGameConstants.ASSET_PACKAGE_GENERAL, "fonts/calibri/calibri");
		this.text = new TextSprite(font);
		this.text.align = TextAlign.Center;
		this.text.x._ = this.getNaturalWidth() * 0.5;
		this.text.y._ = this.getNaturalHeight() * 0.5;
		this.text.centerAnchor();
		this.text.disablePointer();
	}
	override public function onAdded():Void
    {
		super.onAdded();
		this.owner.addChild(new Entity().add(this.text));		
	}
	
}