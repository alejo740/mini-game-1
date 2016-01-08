package gui.scenes;
import flambe.animation.Ease;
import flambe.display.TextSprite;
import flambe.Entity;
import flambe.script.CallFunction;
import flambe.script.Delay;
import flambe.script.Script;
import flambe.script.Sequence;
import globals.NDiGameConstants;
import gui.components.mig8.NDiPanelControllerMig8;
import gui.components.NDiControlPanel;
import gui.components.NDiImage;
import gui.popups.mig8.NDiMessagePopup;
import gui.popups.mig8.NDiResultsPopup;
import gui.popups.mig8.NDiVideoPopup;
import managers.mig8.NDiGapsManager;
import managers.NDiAudioManager;
import managers.NDiResourcesManager;
import managers.NDiScenesController;

/**
 * ...
 * @author Edwin
 */
class NDiMig8Scene extends NDiAbstractScene
{
	private var background:NDiImage;	
	
	private var gapsManager:NDiGapsManager;
	private var panelController:NDiPanelControllerMig8;
	
	private var controlPanel:NDiControlPanel;
	
	private var messagePopup:NDiMessagePopup;
	private var videoPopup:NDiVideoPopup;
	private var resultsPopup:NDiResultsPopup;
	
	private var entityGamePlay:Entity;
	private var entityControls:Entity;
	
	private var titleMig:TextSprite;
	
	public function new() 
	{
		super();
		this.loadInit();
	}
	
	private function loadInit():Void
	{
		this.titleMig = new TextSprite(NDiResourcesManager.loadFont(NDiGameConstants.ASSET_PACKAGE_GENERAL, "fonts/calibri/calibri"), 
		"Mig-07");
		
		this.entityGamePlay = new Entity();
		this.entityControls = new Entity();
		
		this.controlPanel = new NDiControlPanel();
		
		this.gapsManager = new NDiGapsManager();
		this.messagePopup = new NDiMessagePopup();
		this.resultsPopup = new NDiResultsPopup();		
		this.videoPopup = new NDiVideoPopup();
		
		this.background = new NDiImage(NDiResourcesManager.loadImage(NDiGameConstants.ASSET_PACKAGE_GENERAL, "images/mig8/background"));
		this.background.transform.x._ = NDiGameConstants.GAME_WIDTH * 0.5;
		this.background.transform.y._ = NDiGameConstants.GAME_HEIGHT * 0.5;
		
		this.panelController = new NDiPanelControllerMig8();
		//this.panelController.transform.y._ = 800;
		this.panelController.transform.visible = false;
	}
	
	/* FUNCTIONS TO PANEL CONTROLLER */
	public function getPanelController():NDiPanelControllerMig8
	{
		return this.panelController;
	}
	public function sendPanelControllerChange_(numberBridges:Int)
	{
		this.panelController.changeGap(numberBridges);
	}
	
	
	/* FUNCTIONS TO GAPS MANAGER */
	public function getGapsManager():NDiGapsManager
	{
		return this.gapsManager;
	}
	
	private function toggleTransparency()
	{
		if (this.background.transform.visible)
		{
			this.gapsManager.transform.visible = false;
			this.panelController.transform.visible = false;
			this.background.transform.visible = false;
		}else {
			this.gapsManager.transform.visible = true;
			//this.panelController.transform.visible = true;
			this.background.transform.visible = true;
		}		
	}
	
	private function endingVideo()
	{
		this.toggleTransparency();/// ON
		this.checkEndingGap();
	}
	
	private function endingGap()
	{		
		this.gapsManager.fillGap();
		this.panelController.hide();
		
		var f1:CallFunction = new CallFunction(function() {
			this.gapsManager.endingWagonAnimation();
			NDiAudioManager.getInstance().stopSoundEffect();
			NDiAudioManager.getInstance().playSoundEffect(NDiGameConstants.ARRAY_SOUNDS.get("MIG8-Way-Continue"));
		});
		var f2:CallFunction = new CallFunction(function() {
			this.gapsManager.hideWagon();
			this.showVideoPopup();
		});
		//var seq2:Sequence = new Sequence([new Delay(0.7), f2]);
		//this.owner.get(Script).run(seq2);
		
		var seq1:Sequence = new Sequence([new Delay(0.6), f1, new Delay(0.7), f2]);
		this.gapsManager.owner.get(Script).run(seq1);
	}
	
	private function checkEndingGap()
	{
		if (this.gapsManager.currentGap >= this.gapsManager.totalGaps-1)
		{
			//this.showResultsPopup();
			NDiScenesController.getInstance().nextScene();			
		}else {
			this.gapsManager.nextGap();
		}
	}
	
	public function showVideoPopup()
	{
		trace(this.gapsManager.currentGap );
		trace(this.gapsManager.totalGaps);
		if (this.gapsManager.currentGap < (this.gapsManager.totalGaps-1))
		{
			this.checkEndingGap();
			return;
		}
		this.toggleTransparency();/// OFF
		this.owner.addChild(new Entity().add(this.videoPopup));
		this.videoPopup.loadVideo(NDiGameConstants.VIDEO_MIG8_GAPS, null, this.endingVideo);
	}
	
	public function showResultsPopup()
	{
		this.resultsPopup.transform.scaleX.animate(0, 1, 0.4, Ease.sineOut);
		this.resultsPopup.transform.scaleY.animate(0, 1, 0.4, Ease.sineOut);
		this.owner.addChild(new Entity().add(this.resultsPopup));
	}
	
	public function showMessagePopup(message:String, video:Bool = true)
	{
		this.messagePopup.setup(message);
		this.messagePopup.transform.scaleX.animate(0, 1, 0.4, Ease.bounceOut);
		this.messagePopup.transform.scaleY.animate(0, 1, 0.4, Ease.bounceOut);
		
		this.owner.addChild(new Entity().add(this.messagePopup));
		
		if (video)
		{
			var f1:CallFunction = new CallFunction(function() {
				this.messagePopup.owner.dispose();				
				//this.showVideoPopup();
				this.endingGap();				
			});
			
			var seq1:Sequence = new Sequence([new Delay(2), f1]);
			this.owner.get(Script).run(seq1);
		}
	}
	
	
	override public function onAdded():Void
    {
		super.onAdded();
		this.owner.add(new Script());
		
		this.entityGamePlay.addChild(new Entity().add(this.background));
		
		this.entityGamePlay.addChild(new Entity().add(this.gapsManager));
		
		this.entityGamePlay.addChild(new Entity().add(this.panelController));
		
		
		
		this.entityControls.addChild(new Entity().add(this.controlPanel));
		this.entityControls.addChild(new Entity().add(this.titleMig));
		
		this.owner.addChild(this.entityGamePlay);
		this.owner.addChild(this.entityControls);
		
		NDiAudioManager.getInstance().playSoundEffect(NDiGameConstants.ARRAY_SOUNDS.get("MIG8-Intro"));
    }

	override public function onRemoved():Void
	{
	}

	override public function onUpdate(dt:Float):Void
	{
		super.onUpdate(dt);
	}
	
}