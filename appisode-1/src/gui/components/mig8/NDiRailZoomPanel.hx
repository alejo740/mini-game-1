package gui.components.mig8;

import flambe.animation.Ease;
import flambe.Component;
import flambe.display.Sprite;
import flambe.display.Texture;
import flambe.Entity;
import flambe.input.PointerEvent;
import flambe.script.CallFunction;
import flambe.script.Delay;
import flambe.script.Script;
import flambe.script.Sequence;
import globals.NDiGameConstants;
import gui.components.NDiButton;
import gui.components.NDiImage;
import managers.NDiAudioManager;
import managers.NDiResourcesManager;

/**
 * ...
 * @author Edwin
 */
class NDiRailZoomPanel extends Component
{
	private var background:NDiImage;
	private var cleanButton:NDiButton;
	private var arrayBridges:Array<NDiBridge>;
	private var arrayNewBridges:Array<NDiBridge>;
	private var arrayRulers:Array<NDiRuler>;
	private var totalUnits:Int;
	private var totalBridges:Int;
	private var countBridges:Int;
	private var isFinishedMeasurement:Bool;
	private var errorSignal:NDiImage;
	private var isActiveErrorSignal:Bool;
	private var countGroups:Int;
	private var wrongSelection:Array<NDiBridge>;
	
	private var rulerTexture:Texture;
	private var bridgeTexture:Texture;
	
	public var transform:Sprite;

	public function new() 
	{
		this.loadInit();
	}
	
	
	private function loadInit():Void
	{
		this.isFinishedMeasurement = false;
		this.transform = new Sprite();
		this.arrayBridges = new Array<NDiBridge>();
		this.arrayNewBridges = new Array<NDiBridge>();
		this.arrayRulers = new Array<NDiRuler>();
		this.wrongSelection = new Array<NDiBridge>();
		this.totalUnits = 12;
		this.totalBridges = 0;
		this.countBridges = 0;
		this.countGroups = 0;
		
		this.errorSignal = new NDiImage(NDiResourcesManager.loadImage(NDiGameConstants.ASSET_PACKAGE_GENERAL, "images/mig8/error_x"));
		this.errorSignal.transform.y._ = -8;
		this.isActiveErrorSignal = false;
		
		this.rulerTexture = NDiResourcesManager.loadImage(NDiGameConstants.ASSET_PACKAGE_GENERAL, "images/mig8/ruler");
		this.bridgeTexture = NDiResourcesManager.loadImage(NDiGameConstants.ASSET_PACKAGE_GENERAL, "images/mig8/bridge_rail");
		this.background = new NDiImage(NDiResourcesManager.loadImage(NDiGameConstants.ASSET_PACKAGE_GENERAL, "images/mig8/rail_zoom_panel"));
		this.background.transform.x._ = 0;
		this.background.transform.y._ = 0;
		this.background.image.disablePointer();
		
		this.cleanButton = new NDiButton(NDiResourcesManager.loadImage(NDiGameConstants.ASSET_PACKAGE_GENERAL, "images/mig8/clean_button"));
		this.cleanButton.x._ = (this.background.image.getNaturalWidth()*0.5) - 73;
		this.cleanButton.y._ = - 59;
		this.cleanButton.nameButton = "UNDO_BUTTON";
		this.cleanButton.visible = false;
		this.cleanButton.pointerUp.connect(this.handlerPointerUp);
	}
	
	public function showSignalError()
	{
		if (this.isActiveErrorSignal)
			return;
			
		this.errorSignal.transform.scaleX.animate(0, 1, 0.1, Ease.sineOut);
		this.errorSignal.transform.scaleY.animate(0, 1, 0.1, Ease.sineOut);
		this.owner.addChild(new Entity().add(this.errorSignal));
		var f1:CallFunction = new CallFunction(function() {
			this.errorSignal.owner.dispose();
			this.isActiveErrorSignal = false;
		});
		var seq0:Sequence = new Sequence([new Delay(1.5), f1]);
		this.owner.get(Script).run(seq0);
		this.isActiveErrorSignal = true;
	}
	
	public function showCleanButton(hide:Bool = false)
	{
		//var parent:NDiPanelControllerMig8 = this.owner.parent.get(NDiPanelControllerMig8);
		
		if (hide)
		{
			if (this.cleanButton.visible == true)
			{
				this.cleanButton.visible = false;
			}			
		}else {
			if (this.cleanButton.visible == false)
			{
				this.cleanButton.visible = true;
			}
		}
	}
	
	public function getParent():NDiPanelControllerMig8
	{
		return this.owner.parent.get(NDiPanelControllerMig8);
	}
	
	private function timeOutFinished()
	{
		if (this.arrayRulers.length == this.countBridges)
		{			
			var f1:CallFunction = new CallFunction(function() { 				
				//this.cleanRulers();
				this.getParent().getSelectorPanel().loadAnswers(this.totalBridges);
				isFinishedMeasurement = false;
			});
			var seq0:Sequence = new Sequence([new Delay(1.5), f1]);
			this.owner.get(Script).run(seq0);
			isFinishedMeasurement = true;
		}
	}
	
	private function createRuler(indexRail:Int)
	{		
		var tmp:NDiRuler = new NDiRuler(this.rulerTexture, indexRail, this.arrayRulers.length);
		tmp.transform.y._ = -30;
		tmp.image.setAnchor(0, tmp.image.anchorY._);
		var fromPosY:Float = this.getParent().getUmiCharacter().transform.y._;
		var fromPosX:Float = this.getParent().getUmiCharacter().transform.x._;
		
		tmp.transform.x._ = -(this.background.image.getNaturalWidth() * 0.5) + ((tmp.image.getNaturalWidth() * indexRail));
		tmp.transform.x.animate(fromPosX ,tmp.transform.x._, 0.3, Ease.sineOut);
		tmp.transform.y.animate(fromPosY, tmp.transform.y._, 0.3, Ease.sineOut);
		
		//tmp.indexBridge = indexRail;
		//= -(this.background.image.getNaturalWidth() * 0.5) + ((this.arrayBridges[index].image.getNaturalWidth() * index));
		this.arrayRulers.push(tmp);
		this.owner.addChild(new Entity().add(tmp));
		
		
		this.getParent().getUmiCharacter().animationCreate("_handsUP");
		this.timeOutFinished();
	}
	
	public function addRulerUnit()
	{
		if (isFinishedMeasurement)
			return;
		
		for (index in 0...this.arrayBridges.length)
		{
			if (this.arrayBridges[index] == null)
			{
				if (this.arrayRulers.length > 0)
				{
					var isMeasured:Bool = false;
					for (i in 0...this.arrayRulers.length)
					{
						if (this.arrayRulers[i].indexBridge == index)
						{
							isMeasured = true;
							break;
						}
					}
					if (!isMeasured)
					{
						this.createRuler(index);
						return;
					}
				}else {
					this.createRuler(index);
					return;
				}
			}
		}
	}
	
	public function isRepaired():Bool
	{
		return this.arrayNewBridges.length == this.totalBridges ? true : false;
	}
	
	public function cleanWrongPieces()
	{
		for (index in 0...this.wrongSelection.length)
		{
			this.wrongSelection[index].y.animateTo(this.wrongSelection[index].y._ + 250, 0.4, Ease.sineOut);
			this.wrongSelection[index].alpha.animateTo(0, 0.4);
		}
		
		var f1:CallFunction = new CallFunction(function() { 
			for (index in 0...this.wrongSelection.length)
			{
				this.wrongSelection[index].owner.dispose();
				this.wrongSelection[index] = null;
			}
			this.wrongSelection.splice(0, this.wrongSelection.length);
		} );
		var seq1:Sequence = new Sequence([new Delay(0.4), f1]);
		this.owner.get(Script).run(seq1);
	}
	
	public function createWrongSelectedPiece(answer:Int)
	{
		NDiAudioManager.getInstance().playSoundEffect(NDiGameConstants.ARRAY_SOUNDS.get("ANY_MIG-NegativeReaction"));
		for (index in 0...answer)
		{
			//trace(index);
			this.wrongSelection[index] = new NDiBridge(this.bridgeTexture);
			this.wrongSelection[index].setAnchor(0, this.wrongSelection[index].anchorY._);
			//this.wrongSelection[index].x._ = -(this.background.image.getNaturalWidth() * 0.5) + ((this.wrongSelection[index].getNaturalWidth() * index));			
			this.wrongSelection[index].railIndex = index;
			this.owner.addChild(new Entity().add(this.wrongSelection[index]));		
			//this.addNewBridge( arrayEmptyIndex[index] );
			this.wrongSelection[index].alpha.animate(0, 1, 0.8, Ease.quartOut);
			
			var fromPosX:Float = this.getParent().getUmiCharacter().transform.x._;
			var fromPosY:Float = this.getParent().getUmiCharacter().transform.y._;
			
			this.wrongSelection[index].highlight.transform.visible = true;
			this.wrongSelection[index].highlight.showWrongTexture();
			
			var toPosX:Float = 0;// this.wrongSelection[arrayEmptyIndex[index]].x._;
			var toPosY:Float = 30;//this.wrongSelection[arrayEmptyIndex[index]].y._;
			if (index > 0)
			{
				toPosX = this.wrongSelection[index - 1].getNaturalWidth() * index;				
			}
			var descX:Float = (this.wrongSelection[index].getNaturalWidth() * answer) * 0.5;
			toPosX -= descX;
			
			this.wrongSelection[index].y.animate(fromPosY, 
			toPosY, 0.3, Ease.sineOut);
			
			this.wrongSelection[index].x.animate(fromPosX, 
			toPosX, 0.3, Ease.sineOut);
			
		}
		
	}
	
	public function createSelectedPiece(answer:Int):Bool
	{
		var countEmptys:Int = 0;
		var arrayEmptyIndex:Array<Int> = new Array<Int>();
		//trace(this.arrayBridges);
		for (index in 0...this.arrayBridges.length)
		{
			if (this.arrayBridges[index] == null)
			{
				countEmptys++;
				arrayEmptyIndex.push(index);
			}
		}
		if (answer <= countEmptys)
		{
			this.countGroups++;
			for (index in 0...answer)
			{
				this.showCleanButton();
				this.addNewBridge( arrayEmptyIndex[index] );				
				this.countBridges--;
				this.arrayBridges[arrayEmptyIndex[index]].pointerUp.connect(this.handlerPointerUp);
				this.arrayBridges[arrayEmptyIndex[index]].nameButton = "BRIDGE";
				this.arrayBridges[arrayEmptyIndex[index]].alpha.animate(0, 1, 0.8, Ease.quartOut);
				this.arrayBridges[arrayEmptyIndex[index]].groupIndex = this.countGroups;
				
				this.arrayBridges[arrayEmptyIndex[index]].highlight.transform.visible = true;
				this.arrayBridges[arrayEmptyIndex[index]].highlight.showCorrectTexture();
				
				var fromPosX:Float = this.getParent().getUmiCharacter().transform.x._;
				var fromPosY:Float = this.getParent().getUmiCharacter().transform.y._;
				
				this.arrayBridges[arrayEmptyIndex[index]].y.animate(fromPosY, 
				this.arrayBridges[arrayEmptyIndex[index]].y._, 0.3, Ease.sineOut);
				
				this.arrayBridges[arrayEmptyIndex[index]].x.animate(fromPosX, 
				this.arrayBridges[arrayEmptyIndex[index]].x._, 0.3, Ease.sineOut);
				
				this.arrayNewBridges.push( this.arrayBridges[arrayEmptyIndex[index]] );
			}
			NDiAudioManager.getInstance().playSoundEffect(NDiGameConstants.ARRAY_SOUNDS.get("ANY_MIG-PositiveReaction"));
			return true;
		}else {
			return false;
		}
	}
	
	public function checkAnswer(answer:Int):Bool
	{
		var countEmptys:Int = 0;		
		for (index in 0...this.arrayBridges.length)
		{
			if (this.arrayBridges[index] == null)
			{
				countEmptys++;				
			}
		}
		if (answer <= countEmptys)
		{
			return true;
		}else {
			return false;
		}
	}
	
	private function realignBridges(numberNewGaps:Int, clickedIndex:Int)
	{
		if (this.arrayNewBridges.length > 0)
		{
			//var limit1:Int = railIndex+1;
			//var limit2:Int = (limit1 + this.arrayNewBridges.length);
			
			//trace(limit1);
			//trace(limit2);
			for (index in clickedIndex...this.arrayNewBridges.length)
			{
				var despX:Float = this.arrayNewBridges[index].x._ - (this.arrayNewBridges[index].getNaturalWidth() * numberNewGaps);
				this.arrayNewBridges[index].x.animateTo(despX, 0.3, Ease.sineOut);
				
				var railIndex:Int = this.arrayNewBridges[index].railIndex;
				this.arrayBridges[railIndex - numberNewGaps] = this.arrayBridges[railIndex];
				this.arrayBridges[railIndex - numberNewGaps].railIndex -= numberNewGaps;
				this.arrayBridges[railIndex - numberNewGaps].groupIndex--;
				this.arrayBridges[railIndex] = null;
			}
		}
	}
	
	private function deleteBridge(tmpButton:NDiBridge)
	{
		/*
		trace(this.arrayBridges);
		trace(this.arrayNewBridges);
		*/
		var index:Int = 0;
		var countBridgeGroup:Int = 0;
		var clickedIndex:Int = 0;
		while (index < this.arrayNewBridges.length)
		{
			if (this.arrayNewBridges[index].groupIndex == tmpButton.groupIndex)
			{
				if (tmpButton == this.arrayNewBridges[index])
				{
					clickedIndex = index;
				}
				this.arrayNewBridges[index].dispose();
				var railIndex:Int = this.arrayNewBridges[index].railIndex;
				this.arrayBridges[railIndex] = null;
				this.arrayNewBridges.remove(this.arrayNewBridges[index]);
				index--;
				countBridgeGroup++;				
			}
			index++;
		}
		this.countGroups--;
		this.countBridges += countBridgeGroup;
		this.realignBridges(countBridgeGroup, clickedIndex);
		/*
		this.arrayBridges[tmpButton.railIndex] = null;
		this.arrayNewBridges.remove(tmpButton);
		tmpButton.owner.dispose();
		this.realignBridges(tmpButton.railIndex);
		*/
		
		/*
		trace("--###--");
		trace(this.arrayBridges);
		trace(this.arrayNewBridges);
		*/
	}
	
	private function handlerPointerUp(e:PointerEvent):Void
	{
		var tmpButton:NDiButton = cast(e.hit, NDiButton);
		trace(tmpButton.nameButton );
		if (tmpButton.nameButton == "UNDO_BUTTON")
		{
			//this.cleanRulers();
			this.undoNewBridges();
			//this.showCleanButton(true);
		}else if (tmpButton.nameButton == "BRIDGE")
		{
			this.deleteBridge(cast(tmpButton, NDiBridge));
		}
	}
	
	public function cleanRulers()
	{
		for (index in 0...this.arrayRulers.length)
		{
			if (this.arrayRulers[index] != null)
			{
				this.arrayRulers[index].owner.dispose();
			}
		}
		this.arrayRulers.splice(0, this.arrayRulers.length);
	}
	
	public function cleanNewBridges()
	{
		this.countBridges = this.totalBridges;
		for (index in 0...this.arrayNewBridges.length)
		{
			if (this.arrayNewBridges[index] != null)
			{
				this.arrayNewBridges[index].owner.dispose();
				this.arrayBridges[this.arrayNewBridges[index].railIndex] = null;
			}
		}
		this.arrayNewBridges.splice(0, this.arrayNewBridges.length);
	}
	public function undoNewBridges()
	{
		if (this.arrayNewBridges.length <= 0)
			return;
		
		//this.countBridges++;
		var index:Int = this.arrayNewBridges.length - 1;
		var indexGroup:Int = this.arrayNewBridges[index].groupIndex;
		
		while (index >= 0)
		{
			if (this.arrayNewBridges[index].groupIndex == indexGroup &&
			this.arrayNewBridges[index].owner != null)
			{				
				this.arrayNewBridges[index].owner.dispose();
				this.arrayBridges[this.arrayNewBridges[index].railIndex] = null;
				this.arrayNewBridges.pop();
			}else {
				break;
			}
			index--;
		}
		
		if (this.arrayNewBridges.length == 0)
		{
			this.showCleanButton(true);
		}
	}
	
	public function cleanBrokenRails()
	{
		this.cleanRulers();
		this.cleanNewBridges();
		this.showCleanButton(true);
		
		for (index in 0...this.arrayBridges.length)
		{
			if (this.arrayBridges[index] != null)
			{
				this.arrayBridges[index].owner.dispose();
			}
		}
		this.arrayBridges.splice(0, this.arrayBridges.length);
		isFinishedMeasurement = false;
	}
	
	private function addNewBridge(index:Int)
	{
		this.arrayBridges[index] = new NDiBridge(this.bridgeTexture);
		this.arrayBridges[index].setAnchor(0, this.arrayBridges[index].anchorY._);
		this.arrayBridges[index].x._ = -(this.background.image.getNaturalWidth() * 0.5) + ((this.arrayBridges[index].getNaturalWidth() * index));
		//this.arrayBridges[index].x._ += 28;
		this.arrayBridges[index].y._ = 0;
		this.arrayBridges[index].railIndex = index;
		this.owner.addChild(new Entity().add(this.arrayBridges[index]));		
	}
	
	public function loadZoomBrokenRail(numberGaps:Int)
	{
		
		/*
		 this.arrayBridges = new Array<NDiBridge>();
		this.arrayNewBridges = new Array<NDiBridge>();
		this.arrayRulers = new Array<NDiRuler>();
		this.wrongSelection = new Array<NDiBridge>();
		 */
		this.cleanBrokenRails();
		this.totalBridges = numberGaps;
		this.countBridges = numberGaps;		
		var indexGaps:Int = Math.floor(this.totalUnits / this.totalBridges);
		if (this.totalBridges == 1)
		{
			indexGaps = Math.floor(this.totalUnits * 0.5);
		}
		var countGaps:Int = 0;		
		for (index in 0...this.totalUnits)
		{
			if (index == indexGaps && countGaps < numberGaps)
			{
				indexGaps++;
				countGaps++;
				this.arrayBridges[index] = null;
				//trace("Null - GAP------___ ");
			}else {
				//trace("addGAP------___ ");
				this.addNewBridge(index);
			}
		}		
	}
	
	override public function onAdded():Void
    {
		super.onAdded();		
		
		this.owner.add(this.transform);
		this.owner.add(new Script());
		this.owner.addChild(new Entity().add(this.background));		
		this.owner.addChild(new Entity().add(this.cleanButton));
		
		//this.loadZoomBrokenRail(2);
    }	

	override public function onRemoved():Void
	{
	}

	override public function onUpdate(dt:Float):Void
	{		
	}
	
}