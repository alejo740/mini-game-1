package gui.popups.mig8;

import flambe.Component;
import flambe.display.FillSprite;
import flambe.display.Font.TextAlign;
import flambe.display.Sprite;
import flambe.display.TextSprite;
import flambe.Entity;
import flambe.script.Script;
import globals.NDiGameConstants;
import gui.components.NDiImage;
import managers.NDiResourcesManager;

/**
 * ...
 * @author Edwin
 */
class NDiMessagePopup extends Component
{
	private var background:FillSprite;
	private var message:TextSprite;
	
	public var transform:Sprite;
	
	public function new() 
	{
		this.loadInit();
	}
	
	private function loadInit():Void
	{
		this.transform = new Sprite();
		this.transform.x._ = NDiGameConstants.GAME_WIDTH * 0.5;
		this.transform.y._ = NDiGameConstants.GAME_HEIGHT * 0.5;
		//this.transform.visible = false;
		this.background = new FillSprite(0x222222, NDiGameConstants.GAME_WIDTH, NDiGameConstants.GAME_HEIGHT);		
		this.background.centerAnchor();		
		
		this.message = new TextSprite(NDiResourcesManager.loadFont(NDiGameConstants.ASSET_PACKAGE_GENERAL, "fonts/calibri/calibri"));
		this.message.align = TextAlign.Center;
		//this.message.setScale(3);
	}
	
	public function setup(msg:String, alphaBackground:Float = 0.0)
	{
		this.message.text = msg;
		this.background.alpha._ = alphaBackground;
	}
	
	override public function onAdded():Void
    {
		super.onAdded();		
		this.transform.centerAnchor();
		this.owner.add(this.transform);
		this.owner.add(new Script());
		
		this.owner.addChild(new Entity().add(this.background));
		this.owner.addChild(new Entity().add(this.message));
    }
	
}