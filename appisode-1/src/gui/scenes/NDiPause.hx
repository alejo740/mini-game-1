package gui.scenes;
import flambe.display.FillSprite;
import flambe.display.Font;
import flambe.display.TextSprite;
import flambe.Entity;
import flambe.script.Script;
import globals.NDiGameConstants;
import gui.components.NDiControlPanel;
import managers.NDiResourcesManager;

/**
 * ...
 * @author Edwin
 */
class NDiPause extends NDiAbstractScene
{
	private var background:FillSprite;
	private var controlPanel:NDiControlPanel;
	private var backgroundText:TextSprite;
	
	private var entityGamePlay:Entity;
	private var entityControls:Entity;

	public function new() 
	{
		super(false);
		
		this.entityGamePlay = new Entity();
		this.entityControls = new Entity();
		
		this.controlPanel = new NDiControlPanel();
		this.background = new FillSprite(0x000000, NDiGameConstants.GAME_WIDTH, NDiGameConstants.GAME_HEIGHT);
		this.background.alpha._ = 0.4;
		
		
		this.backgroundText = new TextSprite(NDiResourcesManager.loadFont(NDiGameConstants.ASSET_PACKAGE_GENERAL, "fonts/calibri/calibri"), "GAME PAUSE");
		this.backgroundText.x._ = NDiGameConstants.GAME_WIDTH * 0.5;
		this.backgroundText.y._ = NDiGameConstants.GAME_HEIGHT * 0.5;				
		this.backgroundText.align = TextAlign.Center;
	}
	
	
	override public function onAdded():Void
    {
		this.owner.add(new Script());
		this.entityGamePlay.addChild(new Entity().add(this.background));		
		this.entityGamePlay.addChild(new Entity().add(this.backgroundText));		
		
		this.entityControls.addChild(new Entity().add(this.controlPanel));
		
		this.owner.addChild(this.entityGamePlay);
		this.owner.addChild(this.entityControls);
		super.onAdded();
	}
	
	override public function onUpdate(dt:Float):Void
	{
		super.onUpdate(dt);
	}
}