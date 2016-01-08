package gui.scenes;
import flambe.animation.Ease;
import flambe.Entity;
import flambe.input.PointerEvent;
import flambe.script.CallFunction;
import flambe.script.Delay;
import flambe.script.Script;
import flambe.script.Sequence;
import globals.NDiGameConstants;
import gui.components.NDiButton;
import gui.components.NDiControlPanel;
import gui.components.NDiHighlightSignal;
import gui.components.NDiImage;
import gui.popups.mig8.NDiMessagePopup;
import managers.NDiAudioManager;
import managers.NDiResourcesManager;
import managers.NDiScenesController;
import managers.NDiVideoManager;

/**
 * ...
 * @author Edwin
 */
class NDiMig1Scene extends NDiAbstractScene
{
	
	private var background:NDiImage;	
	private var goButton:NDiButton;
	private var goButtonHighlight:NDiHighlightSignal;
	
	private var entityGamePlay:Entity;
	private var entityControls:Entity;
	//private var controlPanel:NDiControlPanel;

	public function new()
	{
		super();
		this.entityGamePlay = new Entity();
		this.entityControls = new Entity();
		//this.controlPanel = new NDiControlPanel();
		
		this.background = new NDiImage(NDiResourcesManager.loadImage(NDiGameConstants.ASSET_PACKAGE_GENERAL, "images/mig1/background"));
		this.background.transform.x._ = NDiGameConstants.GAME_WIDTH * 0.5;
		this.background.transform.y._ = NDiGameConstants.GAME_HEIGHT * 0.5;
		
		this.goButton = new NDiButton(NDiResourcesManager.loadImage(NDiGameConstants.ASSET_PACKAGE_GENERAL, "images/mig1/go_button"));
		this.goButton.x._ = NDiGameConstants.GAME_WIDTH * 0.5;
		this.goButton.y._ = NDiGameConstants.GAME_HEIGHT * 0.5;
		//this.goButton.setScale(0.4);
		this.goButton.pointerUp.connect(this.handlerPointerUp);
		
		this.goButtonHighlight = new NDiHighlightSignal(NDiResourcesManager.loadImage(NDiGameConstants.ASSET_PACKAGE_GENERAL, "images/mig1/go_buttonHighlight"), null, null);
		this.goButtonHighlight.transform.x._ = NDiGameConstants.GAME_WIDTH * 0.5;
		this.goButtonHighlight.transform.y._ = NDiGameConstants.GAME_HEIGHT * 0.5;
		this.goButtonHighlight.transform.disablePointer();
	}
	
	public function gameOver()
	{
		
		NDiVideoManager.loadVideo("", null, null);		
		var f1:CallFunction = new CallFunction(function() {
			NDiScenesController.getInstance().nextScene();			
		});
		
		var seq1:Sequence = new Sequence([new Delay(0), f1]);
		this.owner.get(Script).run(seq1);
	}
	
	private function handlerPointerUp(e:PointerEvent):Void
	{
		//var tmpButton:NDiButton = cast(e.hit, NDiButton);		
		this.gameOver();
	}
	
	override public function onAdded():Void
    {
		this.owner.add(new Script());
		//this.entityControls.addChild(new Entity().add(this.controlPanel));
		
		this.entityGamePlay.addChild(new Entity().add(this.background));		
		this.entityGamePlay.addChild(new Entity().add(this.goButtonHighlight));
		this.entityGamePlay.addChild(new Entity().add(this.goButton));
		
		
		
		
		this.owner.addChild(this.entityGamePlay);
		this.owner.addChild(this.entityControls);
		super.onAdded();		
		NDiAudioManager.getInstance().playSoundEffect(NDiGameConstants.ARRAY_SOUNDS.get("MIG1-Intro"));
		NDiAudioManager.getInstance().playSoundBackground(NDiGameConstants.ARRAY_SOUNDS.get("THEME_1"));
		
	}

	override public function onRemoved():Void
	{
	}

	override public function onUpdate(dt:Float):Void
	{
		super.onUpdate(dt);
	}
	
}