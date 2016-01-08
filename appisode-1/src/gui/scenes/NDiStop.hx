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
import gui.components.NDiButtonFillText;
import gui.components.NDiControlPanel;
import gui.components.NDiImage;
import gui.popups.mig8.NDiVideoPopup;
import managers.NDiResourcesManager;
import managers.NDiSceneManager;
import managers.NDiScenesController;

/**
 * ...
 * @author Edwin
 */
class NDiStop extends NDiAbstractScene
{
	private var background:NDiImage;
	private var umigoHomeButton:NDiButtonFillText;
	private var keepPlayingButton:NDiButtonFillText;
	private var videoPopup:NDiVideoPopup;
	
	private var entityGamePlay:Entity;
	private var entityControls:Entity;	

	public function new() 
	{		
		super(false);
		this.entityGamePlay = new Entity();
		this.entityControls = new Entity();		
		
		this.videoPopup = new NDiVideoPopup();
		
		this.background = new NDiImage(NDiResourcesManager.loadImage(NDiGameConstants.ASSET_PACKAGE_GENERAL, "images/mig1/background"));
		this.background.transform.x._ = NDiGameConstants.GAME_WIDTH * 0.5;
		this.background.transform.y._ = NDiGameConstants.GAME_HEIGHT * 0.5;
		//this.background.transform.alpha._ = 0.7;
		
		this.umigoHomeButton = new NDiButtonFillText(0x000000, 150, 40);
		this.umigoHomeButton.text.text = "UMIGO HOME";
		this.umigoHomeButton.nameButton = "UMIGO_HOME_BUTTON";
		this.umigoHomeButton.x._ = NDiGameConstants.GAME_WIDTH * 0.5;
		this.umigoHomeButton.y._ = NDiGameConstants.GAME_HEIGHT * 0.5;
		this.umigoHomeButton.pointerUp.connect(this.handlerPointerUp);
		
		this.keepPlayingButton = new NDiButtonFillText(0x000000, 190, 40);
		this.keepPlayingButton.text.text = "KEEP PLAYING";
		this.keepPlayingButton.nameButton = "KEEP_PLAYING_BUTTON";
		this.keepPlayingButton.x._ = NDiGameConstants.GAME_WIDTH * 0.5;
		this.keepPlayingButton.y._ = (NDiGameConstants.GAME_HEIGHT * 0.5) + 50;
		this.keepPlayingButton.pointerUp.connect(this.handlerPointerUp);
		
	}
	
	private function endingVideo()
	{
	}
	
	public function showVideoPopup()
	{
		this.videoPopup.transform.scaleX.animate(0, 1, 0.4, Ease.sineOut);
		this.videoPopup.transform.scaleY.animate(0, 1, 0.4, Ease.sineOut);
		this.owner.addChild(new Entity().add(this.videoPopup));
		
		var f1:CallFunction = new CallFunction(function() {
			
			this.endingVideo();
			this.videoPopup.owner.dispose();
		});
		var seq1:Sequence = new Sequence([new Delay(2), f1]);
		this.owner.get(Script).run(seq1);
	}
	
	private function handlerPointerUp(e:PointerEvent):Void
	{
		var tmpButton:NDiButtonFillText = cast(e.hit, NDiButtonFillText);
		if (tmpButton.nameButton == "UMIGO_HOME_BUTTON")
		{
			NDiSceneManager.getInstance().director.popScene();			
			NDiScenesController.getInstance().initialScene();
		}else if (tmpButton.nameButton == "KEEP_PLAYING_BUTTON")
		{
			NDiSceneManager.getInstance().director.popScene();
		}
	}
	
	override public function onAdded():Void
    {
		if (NDiScenesController.getInstance().isGamePause)
			NDiScenesController.getInstance().pauseGame(true);
			
		this.owner.add(new Script());		
		
		this.entityGamePlay.addChild(new Entity().add(this.background));		
		this.entityGamePlay.addChild(new Entity().add(this.umigoHomeButton));
		//this.entityGamePlay.addChild(new Entity().add(this.keepPlayingButton));
		
		
		this.owner.addChild(this.entityGamePlay);
		this.owner.addChild(this.entityControls);		
		super.onAdded();
	}

	override public function onRemoved():Void
	{
	}

	override public function onUpdate(dt:Float):Void
	{
		super.onUpdate(dt);
	}
	
}