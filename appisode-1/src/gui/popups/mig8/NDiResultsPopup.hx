package gui.popups.mig8;

import flambe.Component;
import flambe.display.FillSprite;
import flambe.display.Font;
import flambe.display.Font.TextAlign;
import flambe.display.Sprite;
import flambe.display.TextSprite;
import flambe.Entity;
import flambe.input.PointerEvent;
import flambe.script.Script;
import globals.NDiGameConstants;
import gui.components.NDiButtonFill;
import managers.NDiResourcesManager;
import managers.NDiSceneManager;
import managers.NDiScenesController;

/**
 * ...
 * @author Edwin
 */
class NDiResultsPopup extends Component
{
	private var background:FillSprite;
	private var message:TextSprite;
	private var replayButton:NDiButtonFill;
	private var replayButtonText:TextSprite;
	
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
		
		this.replayButton = new NDiButtonFill(0x3b9300, 130, 30);
		this.replayButton.x._ = (NDiGameConstants.GAME_WIDTH * 0.5) * 0.8;
		this.replayButton.y._ = 220;
		this.replayButton.pointerUp.connect(this.handlerPointerUp);
		
		var font:Font = NDiResourcesManager.loadFont(NDiGameConstants.ASSET_PACKAGE_GENERAL, "fonts/calibri/calibri");
		this.replayButtonText = new TextSprite(font, "End Game");
		this.replayButtonText.centerAnchor();
		this.replayButtonText.x._ = this.replayButton.getNaturalWidth() * 0.5;
		this.replayButtonText.y._ = this.replayButton.getNaturalHeight() * 0.5;
		this.replayButtonText.disablePointer();
		
		this.background = new FillSprite(0x333333, NDiGameConstants.GAME_WIDTH, NDiGameConstants.GAME_HEIGHT);
		this.background.centerAnchor();
		
		this.message = new TextSprite(NDiResourcesManager.loadFont(NDiGameConstants.ASSET_PACKAGE_GENERAL, "fonts/calibri/calibri"), "...RESULTS...\nPLACEHOLDER");		
		this.message.align = TextAlign.Center;		
	}
	
	private function handlerPointerUp(e:PointerEvent):Void
	{
		var tmpButton:NDiButtonFill = cast(e.hit, NDiButtonFill);		
		NDiSceneManager.getInstance().changeScene(NDI_TYPE_SCENE_END_STORY);
		//NDiScenesController.getInstance().nextScene();		
	}
	
	private function addTextReplayButton()
	{		
		this.owner.addChild(new Entity().add(this.replayButton));
		this.replayButton.owner.addChild(new Entity().add(this.replayButtonText));
	}
	
	override public function onAdded():Void
    {
		super.onAdded();		
		this.transform.centerAnchor();
		this.owner.add(this.transform);
		this.owner.add(new Script());
		
		this.owner.addChild(new Entity().add(this.background));
		this.owner.addChild(new Entity().add(this.message));
		this.addTextReplayButton();
    }
	
}