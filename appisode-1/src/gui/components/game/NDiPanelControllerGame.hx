package gui.components.game;

import flambe.animation.Ease;
import flambe.Component;
import flambe.display.Sprite;
import flambe.Entity;
import flambe.input.PointerEvent;
import flambe.script.CallFunction;
import flambe.script.Delay;
import flambe.script.Script;
import flambe.script.Sequence;
import flambe.swf.BitmapSprite;
import globals.NDiGameConstants;
import gui.components.NDiButton;
import gui.components.NDiImage;
import gui.components.NDiUmi;
import gui.scenes.NDiGameScene;
import managers.NDiAudioManager;
import managers.NDiResourcesManager;

/**
 * ...
 * @author Edwin
 */
class NDiPanelControllerGame extends Component
{
	private var zoomPanel:NDiRailZoomPanelGame;
	private var selectorPanel:NDiRailSelectorPanelGame;
	private var umiCharacter:NDiUmi;
	
	private var totalBridges:Int;
	
	
	public var transform:Sprite;
	
	
	
	public function new() 
	{		
		this.loadInit();		
	}
	
	private function loadInit():Void
	{
		this.transform = new Sprite();
		this.transform.x._ = NDiGameConstants.GAME_WIDTH * 0.5;
		this.transform.y._ = (NDiGameConstants.GAME_HEIGHT * 0.5);
		
		this.zoomPanel = new NDiRailZoomPanelGame();
		//this.zoomPanel.transform.x._ = NDiGameConstants.GAME_WIDTH * 0.5;
		//this.zoomPanel.transform.y._ = (NDiGameConstants.GAME_HEIGHT * 0.5);
		//this.zoomPanel.transform.y._ -= 37;
		
		
		this.selectorPanel = new NDiRailSelectorPanelGame();
		
		
		//this.selectorPanel.transform.y._ -= 37;
		//this.background.transform.y._ = NDiGameConstants.GAME_HEIGHT - (this.background.image.getNaturalHeight());
		
		this.umiCharacter = new NDiUmi();				
		//this.umiCharacter.setAnchor(this.umiCharacter.getNaturalWidth(), this.umiCharacter.getNaturalHeight());
		//this.umiCharacter.transform.x._ = NDiGameConstants.GAME_WIDTH * 0.5;
		this.umiCharacter.transform.y._ = (NDiGameConstants.GAME_HEIGHT * 0.25) - 16;
		this.umiCharacter.transform.pointerUp.connect(this.handlerPointerUp);
	}
	
	public function getUmiCharacter():NDiUmi
	{
		return this.umiCharacter;
	}
	
	public function getTotalBridges():Int
	{
		return this.totalBridges;
	}
	
	public function getSelectorPanel():NDiRailSelectorPanelGame
	{
		return this.selectorPanel;
	}
	
	public function getZoomPanel():NDiRailZoomPanelGame
	{
		return this.zoomPanel;
	}
	
	public function getParent():NDiGameScene
	{
		var parent:NDiGameScene = this.owner.parent.parent.get(NDiGameScene);
		return parent;
	}
	
	public function hide()
	{
		//var parent:NDiMig8Scene = this.owner.parent.parent.get(NDiMig8Scene);
		//parent.getGapsManager().hideWagon();
		this.selectorPanel.cleanAnswers();
		this.zoomPanel.cleanBrokenRails();
		this.umiCharacter.reset();
		this.transform.visible = false;
	}
	
	public function changeGap(numberBridges:Int)
	{
		this.totalBridges = numberBridges;
		this.zoomPanel.loadZoomBrokenRail(numberBridges);
		this.selectorPanel.cleanAnswers();
		this.selectorPanel.transform.visible = false;
		
		this.transform.visible = true;
		//this.transform.y.animate(this.transform.y._ +400, this.transform.y._, 0.6, Ease.cubeOut);
		this.transform.scaleX.animate(0, 1, 0.6, Ease.cubeOut);
		this.transform.scaleY.animate(0, 1, 0.6, Ease.cubeOut);
		var f1:CallFunction = new CallFunction(function() {
			//NDiAudioManager.getInstance().playSoundEffect(NDiGameConstants.ARRAY_SOUNDS.get("MIG8-UMI-Appear"));
		});
		var seq:Sequence = new Sequence([new Delay(0.64), f1]);
		this.owner.get(Script).run(seq);
	}
	
	public function getCurrentGap():Int
	{
		var parent:NDiGameScene = this.owner.parent.parent.get(NDiGameScene);
		return parent.getGapsManager().currentGap;
	}
	
	private function handlerPointerUp(e:PointerEvent):Void
	{
		//var tmpButton:NDiButton = cast(e.hit, NDiButton);
		var selectedBitmap:BitmapSprite = cast(e.hit, BitmapSprite);
		var umi:NDiUmi = cast selectedBitmap.owner.parent.parent.firstComponent;
		if (umi.animationName == "UMI" && !this.selectorPanel.isConfigured)
		{
			this.zoomPanel.addRulerUnit();
		}		
	}
	
	override public function onAdded():Void
    {
		super.onAdded();
		this.owner.add(new Script());
		this.owner.add(this.transform);
		this.owner.addChild(new Entity().add(this.zoomPanel));
		this.owner.addChild(new Entity().add(this.selectorPanel));
		this.owner.addChild(new Entity().add(this.umiCharacter));
    }

	override public function onRemoved():Void
	{
	}

	override public function onUpdate(dt:Float):Void
	{		
	}
}