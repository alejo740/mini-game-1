package gui.popups.mig8;

import flambe.animation.Ease;
import flambe.Component;
import flambe.display.FillSprite;
import flambe.display.Font.TextAlign;
import flambe.display.Sprite;
import flambe.display.TextSprite;
import flambe.Entity;
import flambe.script.CallFunction;
import flambe.script.Delay;
import flambe.script.Script;
import flambe.script.Sequence;
import globals.NDiGameConstants;
import gui.components.NDiAnimationMovie;
import gui.components.NDiImage;
import managers.NDiAudioManager;
import managers.NDiResourcesManager;
import managers.NDiScenesController;
import managers.NDiVideoManager;

/**
 * ...
 * @author Edwin Cobos
 */
class NDiVideoPopup extends Component
{
	
	private var background:FillSprite;
	private var preloader:NDiAnimationMovie;
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
		
		this.background = new FillSprite(0x000000, NDiGameConstants.GAME_WIDTH, NDiGameConstants.GAME_HEIGHT);
		this.background.centerAnchor();
		
		
		this.preloader = new NDiAnimationMovie(NDiResourcesManager.loadSetAnimations(NDiGameConstants.ASSET_PACKAGE_GENERAL, "animations/preloader"), "preloader");// new NDiImage(NDiResourcesManager.loadImage(NDiGameConstants.ASSET_PACKAGE_GENERAL, NDiGameConstants.PRELOADING));		
		this.preloader.animationIdle();
		
		this.message = new TextSprite(NDiResourcesManager.loadFont(NDiGameConstants.ASSET_PACKAGE_GENERAL, "fonts/calibri/calibri"), "");
		this.message.align = TextAlign.Center;
		
	}
	
	public function loadVideo(url:String, startingFunction:Void->Void = null, endingFunction:Void->Void = null)
	{
		this.setup(url);
		this.transform.scaleX.animate(0, 1, 0.4, Ease.sineOut);
		this.transform.scaleY.animate(0, 1, 0.4, Ease.sineOut);
		
		if (startingFunction == null)
		{
			startingFunction = this.startingVideo;
		}
		
		if (endingFunction == null)
		{
			endingFunction = this.endingVideo;
		}
		
		var f1:CallFunction = new CallFunction(function()
		{
			NDiVideoManager.loadVideo(url, endingFunction, startingFunction);
		});
		var seq1:Sequence = new Sequence([new Delay(0.4), f1]);
		this.owner.get(Script).run(seq1);
	}
	
	private function endingVideo():Void
	{
		trace("DISPOSEEEE endingVideo");
		NDiVideoManager.stopVideo();
		NDiScenesController.getInstance().nextScene();		
	}
	
	private function startingVideo():Void
	{
		if (this.owner != null)
		{
			trace("DISPOSEEEE startingVideo");
			this.owner.dispose();
		}
	}
	
	public function setup(msg:String, alphaBackground:Float = 1)
	{
		this.message.text = "";
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
		this.owner.addChild(new Entity().add(this.preloader));
    }
	
}