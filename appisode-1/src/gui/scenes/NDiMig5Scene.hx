package gui.scenes;
import flambe.animation.Ease;
import flambe.display.TextSprite;
import flambe.Entity;
import flambe.script.CallFunction;
import flambe.script.Delay;
import flambe.script.Script;
import flambe.script.Sequence;
import globals.NDiGameConstants;
import gui.components.NDiControlPanel;
import gui.components.NDiImage;
import gui.popups.mig8.NDiMessagePopup;
import managers.mig5.NDiCharacterManagerMig5;
import managers.mig5.NDiFootprintManagerMig5;
import managers.NDiAudioManager;
import managers.NDiResourcesManager;
import managers.NDiScenesController;

/**
 * ...
 * @author Edwin
 */
class NDiMig5Scene extends NDiAbstractScene
{
	
	private var background:NDiImage;
	private var characterManager:NDiCharacterManagerMig5;
	private var footprintManager:NDiFootprintManagerMig5;	
	private var messagePopup:NDiMessagePopup;
	private var controlPanel:NDiControlPanel;
	
	private var entityGamePlay:Entity;
	private var entityControls:Entity;

	private var titleMig:TextSprite;
	
	public var isCharacterOnTop:Bool;
	
	public function new()
	{
		super();
		
		this.isCharacterOnTop = true;
		
		this.titleMig = new TextSprite(NDiResourcesManager.loadFont(NDiGameConstants.ASSET_PACKAGE_GENERAL, "fonts/calibri/calibri"), 
		"Mig-04");
		
		this.entityGamePlay = new Entity();
		this.entityControls = new Entity();
		
		this.controlPanel = new NDiControlPanel();
		
		this.background = new NDiImage(NDiResourcesManager.loadImage(NDiGameConstants.ASSET_PACKAGE_GENERAL, "images/mig5/background"));
		this.background.transform.x._ = NDiGameConstants.GAME_WIDTH * 0.5;
		this.background.transform.y._ = NDiGameConstants.GAME_HEIGHT * 0.5;
		
		this.characterManager = new NDiCharacterManagerMig5();
		this.footprintManager = new NDiFootprintManagerMig5();
		//this.footprintManager.transform.x._ = 400.0;
		//this.footprintManager.transform.y._ = 390.0;
		
		this.messagePopup = new NDiMessagePopup();
	}
	
	public function gameOver()
	{
		NDiAudioManager.getInstance().playSoundEffect(NDiGameConstants.ARRAY_SOUNDS.get("ANY_MIG-GoodJob"));
		var f1:CallFunction = new CallFunction(function() {
			this.showMessagePopup("");
		});
		
		var seq1:Sequence = new Sequence([new Delay(0.5), f1]);
		this.owner.get(Script).run(seq1);
	}
	
	public function showMessagePopup(message:String)
	{
		this.messagePopup.setup(message);
		//this.messagePopup.transform.scaleX.animate(0, 1, 0.4, Ease.bounceOut);
		//this.messagePopup.transform.scaleY.animate(0, 1, 0.4, Ease.bounceOut);
		this.messagePopup.transform.alpha.animate(0, 1, 0.2, Ease.linear);
		
		this.owner.addChild(new Entity().add(this.messagePopup));
		
		var f1:CallFunction = new CallFunction(function() {
			this.messagePopup.owner.dispose();
			NDiScenesController.getInstance().nextScene();			
		});
		
		var seq1:Sequence = new Sequence([new Delay(2), f1]);
		this.owner.get(Script).run(seq1);
	}
	
	public function getFootsprintManager():NDiFootprintManagerMig5
	{
		return this.footprintManager;
	}
	
	
	public function sendBackDepthCharacter()
	{
		if (!this.isCharacterOnTop)
			return;
		
		var tmpEntity:Entity = null;
		var managerEntity:Entity = null;		
		
		managerEntity = this.footprintManager.owner;
		tmpEntity = this.footprintManager.owner.parent;
		tmpEntity.removeChild(managerEntity);
		tmpEntity.addChild(managerEntity);
		this.isCharacterOnTop = false;
	}
	
	public function sendFrontDepthCharacter()
	{
		if (this.isCharacterOnTop)
			return;
		
		var tmpEntity:Entity = null;
		var managerEntity:Entity = null;		
		
		managerEntity = this.characterManager.owner;
		tmpEntity = this.characterManager.owner.parent;		
		tmpEntity.removeChild(managerEntity);
		tmpEntity.addChild(managerEntity);
		this.isCharacterOnTop = true;
	}
	
	override public function onAdded():Void
    {		
		this.owner.add(new Script());
		this.entityGamePlay.addChild(new Entity().add(this.background));		
		this.entityGamePlay.addChild(new Entity().add(this.footprintManager));
		this.entityGamePlay.addChild(new Entity().add(this.characterManager));
		
		this.entityControls.addChild(new Entity().add(this.controlPanel));
		
		this.entityControls.addChild(new Entity().add(this.titleMig));
		
		this.owner.addChild(this.entityGamePlay);
		this.owner.addChild(this.entityControls);
		super.onAdded();
		NDiAudioManager.getInstance().playSoundEffect(NDiGameConstants.ARRAY_SOUNDS.get("MIG5-Intro"));
	}

	override public function onRemoved():Void
	{
	}

	override public function onUpdate(dt:Float):Void
	{
		super.onUpdate(dt);
	}
	
}