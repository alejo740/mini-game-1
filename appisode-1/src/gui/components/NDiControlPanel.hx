package gui.components;

import flambe.Component;
import flambe.display.Sprite;
import flambe.display.Texture;
import flambe.Entity;
import flambe.input.PointerEvent;
import flambe.script.Script;
import globals.NDiGameConstants;
import managers.NDiResourcesManager;
import managers.NDiScenesController;
import managers.NDiVideoManager;

/**
 * ...
 * @author Edwin
 */
class NDiControlPanel extends Component
{
	private var background:NDiImage;
	
	private var prevButton:NDiButton;
	private var nextButton:NDiButton;
	private var stopButton:NDiButton;
	private var pauseButton:NDiButton;
	private var backgroundAlpha:NDiImage;
	
	private var pauseButtonTexture:Texture;	
	private var playButtonTexture:Texture;	
	
	
	public var transform:Sprite;
	
	public function new() 
	{
		this.background = new NDiImage(NDiResourcesManager.loadImage(NDiGameConstants.ASSET_PACKAGE_GENERAL, "images/shared/controls/background"));
		this.background.transform.disablePointer();
		
		this.prevButton = new NDiButton(NDiResourcesManager.loadImage(NDiGameConstants.ASSET_PACKAGE_GENERAL, "images/shared/controls/prev_button"));
		this.prevButton.x._ = -97;
		this.prevButton.nameButton = "PREV_BUTTON";
		this.prevButton.pointerUp.connect(this.handlerPointerUp);
		
		this.nextButton = new NDiButton(NDiResourcesManager.loadImage(NDiGameConstants.ASSET_PACKAGE_GENERAL, "images/shared/controls/prev_button"));
		this.nextButton.scaleX._ = -1;
		this.nextButton.x._ = 98;
		this.nextButton.nameButton = "NEXT_BUTTON";
		this.nextButton.pointerUp.connect(this.handlerPointerUp);
		
		this.stopButton = new NDiButton(NDiResourcesManager.loadImage(NDiGameConstants.ASSET_PACKAGE_GENERAL, "images/shared/controls/stop_button"));
		this.stopButton.x._ = -31;
		this.stopButton.nameButton = "STOP_BUTTON";
		this.stopButton.pointerUp.connect(this.handlerPointerUp);
		
		this.pauseButtonTexture = NDiResourcesManager.loadImage(NDiGameConstants.ASSET_PACKAGE_GENERAL, "images/shared/controls/pause_button");
		this.pauseButton = new NDiButton(this.pauseButtonTexture);
		this.pauseButton.x._ = 33;
		this.pauseButton.nameButton = "PAUSE_BUTTON";
		this.pauseButton.pointerUp.connect(this.handlerPointerUp);
		
		this.playButtonTexture = NDiResourcesManager.loadImage(NDiGameConstants.ASSET_PACKAGE_GENERAL, "images/shared/controls/play_button");
		this.pauseButton.secondTexture = this.playButtonTexture;
		
		this.transform = new Sprite();
		this.transform.x._ = NDiGameConstants.GAME_WIDTH * 0.5;
		this.transform.y._ = NDiGameConstants.GAME_HEIGHT - this.background.image.getNaturalHeight() * 0.5;
		
		this.backgroundAlpha = new NDiImage(NDiResourcesManager.loadImage(NDiGameConstants.ASSET_PACKAGE_GENERAL, "images/shared/alpha_bg"));
		this.backgroundAlpha.transform.y._ = - ((this.backgroundAlpha.image.getNaturalHeight() * 0.5) - (this.background.image.getNaturalHeight() * 0.5));
		this.backgroundAlpha.transform.disablePointer();
	}
	
	private function handlerPointerUp(e:PointerEvent):Void
	{
		var tmpButton:NDiButton = cast(e.hit, NDiButton);
		//trace(tmpButton.nameButton);
		if (tmpButton.nameButton == "PREV_BUTTON")
		{
			NDiVideoManager.stopVideo();
			NDiScenesController.getInstance().previousScene();
		}else if (tmpButton.nameButton == "STOP_BUTTON")
		{
			NDiScenesController.getInstance().stopGame();
		}else if (tmpButton.nameButton == "PAUSE_BUTTON")
		{
			this.pauseGameButton();
		}else if (tmpButton.nameButton == "NEXT_BUTTON")
		{
			NDiVideoManager.stopVideo();
			NDiScenesController.getInstance().nextScene();
		}		
	}
	
	private function pauseGameButton()
	{
		if (NDiVideoManager.getInstance().playingVideo)
		{
			if (!NDiScenesController.getInstance().isGamePause)
			{
				NDiVideoManager.pauseVideo(true);
			}else {
				NDiVideoManager.pauseVideo(false);
			}
		}else {
			NDiScenesController.getInstance().pauseGame();
		}
		
	}
	
	override public function onAdded():Void
    {
		super.onAdded();
		this.owner.add(new Script());
		this.owner.add(this.transform);		
		
		this.owner.addChild(new Entity().add(this.backgroundAlpha));
		this.owner.addChild(new Entity().add(this.background));
		this.owner.addChild(new Entity().add(this.prevButton));
		this.owner.addChild(new Entity().add(this.stopButton));
		this.owner.addChild(new Entity().add(this.pauseButton));
		this.owner.addChild(new Entity().add(this.nextButton));		
		
		if (NDiScenesController.getInstance().isGamePause)
		{
			this.pauseButton.changeTexture(false);
		}else {
			this.pauseButton.changeTexture(true);
		}		
    }

	override public function onRemoved():Void
	{
	}

	override public function onUpdate(dt:Float):Void
	{
	}
	
}