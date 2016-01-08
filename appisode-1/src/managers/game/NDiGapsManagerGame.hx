package managers.game;
import flambe.animation.Ease;
import flambe.Component;
import flambe.display.FillSprite;
import flambe.display.Sprite;
import flambe.display.Texture;
import flambe.Entity;
import flambe.input.PointerEvent;
import flambe.script.CallFunction;
import flambe.script.Delay;
import flambe.script.Script;
import flambe.script.Sequence;
import flambe.swf.Library;
import globals.NDiGameConstants;
import gui.components.mig8.NDiGapButton;
import gui.components.NDiAnimationMovie;
import gui.components.NDiButtonFill;
import gui.components.NDiImage;
import gui.scenes.NDiGameScene;
import managers.NDiResourcesManager;

/**
 * ...
 * @author Edwin
 */
class NDiGapsManagerGame extends Component
{
	private var background:NDiImage;
	private var gapButtons:Array<NDiGapButton>;
	private var arrowSignal:NDiImage;	
	private var wagon:NDiAnimationMovie;
	private var getLevel:Void->Int;
	
	public var totalGaps:Int;	
	public var currentGap:Int;
	public var transform:Sprite;

	public function new(getLevelFunction:Void->Int)
	{
		this.getLevel = getLevelFunction;
		
		this.loadInit();
	}
	
	private function loadInit():Void
	{
		this.transform = new Sprite();
		var lib:Library = NDiResourcesManager.loadSetAnimations(NDiGameConstants.ASSET_PACKAGE_GENERAL, "animations/mig8/rollerCoasterAnimations");
		this.wagon = new NDiAnimationMovie(lib, "bigcart");
		this.wagon.animationIdle();
		this.wagon.transform.visible = false;
		
		//this.totalGaps = NDiGameConstants.ARRAY_CONFIG_POSITION_GAPS.length;		
		this.currentGap = -1;
		this.gapButtons = new Array<NDiGapButton>();
		this.initGapsButtons();
		
		
		this.background = new NDiImage(NDiResourcesManager.loadImage(NDiGameConstants.ASSET_PACKAGE_GENERAL, "images/mig8/background_gaps"));
		this.background.bottomCenterAnchor();
		this.background.transform.x._ = NDiGameConstants.GAME_WIDTH * 0.5;		
		this.background.transform.y._ = NDiGameConstants.GAME_HEIGHT;
		
		
		
		var arrowSignalTexture:Texture = NDiResourcesManager.loadImage(NDiGameConstants.ASSET_PACKAGE_GENERAL, "images/mig8/arrow_down");
		this.arrowSignal = new NDiImage(arrowSignalTexture);
		this.arrowSignal.transform.visible = false;
		this.arrowSignal.transform.x._ = -28;
		//this.arrowSignal.transform.x._ = this.gapButtons[this.currentGap].x._;
		//this.arrowSignal.transform.y._ = this.gapButtons[this.currentGap].y._ - 70;
	}
	
	public function isEndingGap():Bool
	{
		if (this.currentGap == (this.totalGaps-1))
		{
			return true;
		}else {
			return false;
		}
	}
	
	public function getParent():NDiGameScene
	{
		return this.owner.parent.parent.get(NDiGameScene);
	}
	
	public function initGapsButtons()
	{
		this.currentGap = -1;
		this.gapButtons.splice(0, this.gapButtons.length);
		var level:Int = this.getLevel();
		this.totalGaps = NDiGameConstants.ARRAY_LEVELS_CONFIG[level].get("TOTAL_GAPS");
		//trace(level);
		for (index in 0...NDiGameConstants.ARRAY_LEVELS_CONFIG[level].get("TOTAL_GAPS"))
		{			
			//this.gapButtons[index] = new NDiGapButton(NDiGameConstants.ARRAY_CONFIG_UNITS_GAPS[index]);
			this.gapButtons[index] = new NDiGapButton(NDiGameConstants.ARRAY_LEVELS_CONFIG[level].get("ARRAY_CONFIG_UNITS_GAPS")[index]);
			this.gapButtons[index].x._ = NDiGameConstants.ARRAY_LEVELS_CONFIG[level].get("ARRAY_CONFIG_POSITION_GAPS")[index].x;
			this.gapButtons[index].y._ = NDiGameConstants.ARRAY_LEVELS_CONFIG[level].get("ARRAY_CONFIG_POSITION_GAPS")[index].y;
			this.gapButtons[index].nameButton = "GAP_BUTTON_" + index;
			this.gapButtons[index].indexGap = index;
			this.gapButtons[index].visible = false;
			//this.gapButtons[index].pointerUp.connect(this.handlerPointerUp);
		}
	}
	private function addGapsButtons()
	{
		for (index in 0...this.gapButtons.length)
		{			
			this.owner.addChild(new Entity().add(this.gapButtons[index]));			
		}
	}
	
	public function fillGap()
	{
		this.gapButtons[this.currentGap].visible = true;
	}
	
	public function endingWagonAnimation()
	{
		this.wagon.animationCreate("_exit");
	}
	
	public function nextGap()
	{
		trace("NEXT GAPPPPPPPPPPP");
		this.wagon.animationCreate("_entry");
		this.currentGap++;
		
		this.arrowSignal.transform.visible = true;
		//this.arrowSignal.transform.x._ = this.gapButtons[this.currentGap].x._;
		this.arrowSignal.transform.x.animateTo(this.gapButtons[this.currentGap].x._, 0.8, Ease.backInOut);
		this.arrowSignal.transform.y._ = this.gapButtons[this.currentGap].y._ - 50;
		
		var f1:CallFunction = new CallFunction(function() {
			var parent:NDiGameScene = this.owner.parent.parent.get(NDiGameScene);
			////////parent.sendPanelControllerChange(NDiGameConstants.ARRAY_CONFIG_UNITS_GAPS[this.currentGap]);
			parent.getPanelController().changeGap(NDiGameConstants.ARRAY_LEVELS_CONFIG[this.getLevel()].get("ARRAY_CONFIG_UNITS_GAPS")[this.currentGap]);
		});
		var seq1:Sequence = new Sequence([new Delay(1.5), f1]);
		this.owner.get(Script).run(seq1);
		
	}
	
	public function changeGapClick(tmpButton:NDiGapButton)
	{
		var parent:NDiGameScene = this.owner.parent.get(NDiGameScene);
		//parent.sendPanelControllerChange(tmpButton.totalBridges);
		parent.getPanelController().changeGap(tmpButton.totalBridges);
		
		this.currentGap = tmpButton.indexGap;
		this.arrowSignal.transform.visible = true;
		//this.arrowSignal.transform.x._ = this.gapButtons[this.currentGap].x._;
		this.arrowSignal.transform.x.animateTo(this.gapButtons[this.currentGap].x._, 0.8, Ease.backInOut);
		this.arrowSignal.transform.y._ = this.gapButtons[this.currentGap].y._ - 70;
	}
	
	
	private function handlerPointerUp(e:PointerEvent):Void
	{
		var tmpButton:NDiGapButton = cast(e.hit, NDiGapButton);
		
		if (this.currentGap != tmpButton.indexGap)
		{
			this.changeGapClick(tmpButton);
		}
	}
	
	public function hideWagon()
	{
		this.wagon.transform.visible = false;
	}
	
	override public function onAdded():Void
    {
		super.onAdded();
		this.owner.add(new Script());
		this.owner.add(this.transform);
		
		//this.initGapsButtons();
		
		this.owner.addChild(new Entity().add(this.wagon));
		this.owner.addChild(new Entity().add(this.background));
		this.addGapsButtons();		
		this.owner.addChild(new Entity().add(this.arrowSignal));
		
		var f1:CallFunction = new CallFunction(function() {
			//this.owner.parent.get(NDiMig8Scene).showResultsPopup();
			//this.wagon.loop(this.wagon.animationName+"_entry");
			this.nextGap();
		});
		var seq1:Sequence = new Sequence([new Delay(0.9), f1]);
		this.owner.get(Script).run(seq1);
    }

	override public function onRemoved():Void
	{
	}

	override public function onUpdate(dt:Float):Void
	{		
	}
	
}