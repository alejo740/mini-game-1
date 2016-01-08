package gui.components;

import flambe.animation.Ease;
import flambe.display.Font.TextAlign;
import flambe.display.TextSprite;
import flambe.Entity;
import flambe.swf.Library;
import globals.NDiGameConstants;
import managers.NDiResourcesManager;

/**
 * ...
 * @author Edwin Cobos
 */
class NDiUmi extends NDiAnimationMovie
{
	public var text:TextSprite;
	public function new() 
	{
		var lib:Library = NDiResourcesManager.loadSetAnimations(NDiGameConstants.ASSET_PACKAGE_GENERAL, "animations/mig8/UMIposses");
		super(lib, "UMI");
		this.animationIdle(true, 0, "_idle3");
		this.text = new TextSprite(NDiResourcesManager.loadFont(NDiGameConstants.ASSET_PACKAGE_GENERAL, "fonts/calibri/calibri"),
		"");
		this.text.align = TextAlign.Center;
		this.text.y._ += 25;
		this.text.disablePointer();
	}
	
	public function getOut()
	{
		this.animationIdle(true, 0, "_idle");
		var despX:Float = -NDiGameConstants.GAME_WIDTH * 0.5;
		despX += 55;
		this.transform.x.animateTo(despX, 0.6, Ease.sineOut);
	}
	
	public function toggleHideText(toHide:Bool = false)
	{
		if (toHide)
		{
			this.text.visible = false;
		}else {
			this.text.visible = true;
		}
	}
	
	public function jump()
	{
		this.animationCreate("_jump");
	}
	
	public function reset()
	{
		this.animationIdle(true, 0, "_idle3");
		this.transform.visible = true;
		this.transform.x._ = 0;
		this.toggleHideText();
	}
	
	override public function hide()
	{
		super.hide();
		this.toggleHideText(true);
	}
	
	override public function onAdded():Void
    {
		super.onAdded();
		this.owner.addChild(new Entity().add(this.text));
	}
}