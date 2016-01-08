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
class NDiEndStoryScene extends NDiAbstractScene
{
	private var background:NDiImage;
	private var replayGameButton:NDiButtonFillText;
	private var replayAppisodeButton:NDiButtonFillText;
	private var musicVideoButton:NDiButtonFillText;
	private var videoPopup:NDiVideoPopup;
	
	private var entityGamePlay:Entity;
	private var entityControls:Entity;
	private var controlPanel:NDiControlPanel;

	public function new() 
	{		
		super();
		this.entityGamePlay = new Entity();
		this.entityControls = new Entity();
		this.controlPanel = new NDiControlPanel();
		
		this.videoPopup = new NDiVideoPopup();
		
		this.background = new NDiImage(NDiResourcesManager.loadImage(NDiGameConstants.ASSET_PACKAGE_GENERAL, "images/mig1/background"));
		this.background.transform.x._ = NDiGameConstants.GAME_WIDTH * 0.5;
		this.background.transform.y._ = NDiGameConstants.GAME_HEIGHT * 0.5;
		
		this.replayGameButton = new NDiButtonFillText(0x000000, 150, 40);
		this.replayGameButton.text.text = "Play Game";
		this.replayGameButton.nameButton = "PLAY_GAME_BUTTON";
		this.replayGameButton.x._ = NDiGameConstants.GAME_WIDTH * 0.5;
		this.replayGameButton.y._ = NDiGameConstants.GAME_HEIGHT * 0.5;
		this.replayGameButton.pointerUp.connect(this.handlerPointerUp);
		
		this.replayAppisodeButton = new NDiButtonFillText(0x000000, 190, 40);
		this.replayAppisodeButton.text.text = "Replay Appisode";
		this.replayAppisodeButton.nameButton = "REPLAY_APPISODE_BUTTON";
		this.replayAppisodeButton.x._ = NDiGameConstants.GAME_WIDTH * 0.5;
		this.replayAppisodeButton.y._ = (NDiGameConstants.GAME_HEIGHT * 0.5) + 50;
		this.replayAppisodeButton.pointerUp.connect(this.handlerPointerUp);
		
		this.musicVideoButton = new NDiButtonFillText(0x000000, 190, 40);
		this.musicVideoButton.text.text = "Music Video";
		this.musicVideoButton.nameButton = "MUSIC_VIDEO_BUTTON";
		this.musicVideoButton.x._ = NDiGameConstants.GAME_WIDTH * 0.5;
		this.musicVideoButton.y._ = (NDiGameConstants.GAME_HEIGHT * 0.5) - 50;
		this.musicVideoButton.pointerUp.connect(this.handlerPointerUp);
	}
	
	private function startingVideo()
	{
		this.videoPopup.owner.dispose();
		this.toggleTransparency();/// OFF
	}
	
	private function endingVideo()
	{		
		this.toggleTransparency();
	}
	
	private function toggleTransparency()
	{
		if (this.transform.visible)
		{
			this.transform.visible = false;			
		}else {
			this.transform.visible = true;			
		}		
	}
	
	public function showVideoPopup()
	{		
		this.owner.addChild(new Entity().add(this.videoPopup));
		this.videoPopup.loadVideo(NDiGameConstants.VIDEO_MUSIC, this.startingVideo, this.endingVideo);
	}
	
	private function handlerPointerUp(e:PointerEvent):Void
	{
		var tmpButton:NDiButtonFillText = cast(e.hit, NDiButtonFillText);
		if (tmpButton.nameButton == "PLAY_GAME_BUTTON")
		{
			//NDiScenesController.getInstance().goBackToMig();
			NDiSceneManager.getInstance().changeScene(NDiTypeScene.NDI_TYPE_SCENE_GAME);
		}else if (tmpButton.nameButton == "REPLAY_APPISODE_BUTTON")
		{
			NDiScenesController.getInstance().initialScene();
		}else if (tmpButton.nameButton == "MUSIC_VIDEO_BUTTON")
		{
			//this.showVideoPopup();
		}
	}
	
	override public function onAdded():Void
    {
		this.owner.add(new Script());
		this.entityControls.addChild(new Entity().add(this.controlPanel));
		
		this.entityGamePlay.addChild(new Entity().add(this.background));		
		this.entityGamePlay.addChild(new Entity().add(this.replayGameButton));
		this.entityGamePlay.addChild(new Entity().add(this.replayAppisodeButton));
		this.entityGamePlay.addChild(new Entity().add(this.musicVideoButton));
		
		this.owner.addChild(this.entityGamePlay);
		this.owner.addChild(this.entityControls);
		super.onAdded();
	}

	override public function onRemoved():Void
	{
	}

	override public function onUpdate(dt:Float):Void
	{
	}
	
}