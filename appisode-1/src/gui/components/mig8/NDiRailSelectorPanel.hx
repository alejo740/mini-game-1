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
import gui.components.NDiImage;
import gui.components.NDiUmi;
import managers.NDiAudioManager;
import managers.NDiResourcesManager;
import util.NDiRandomUtils;

/**
 * ...
 * @author Edwin
 */
class NDiRailSelectorPanel extends Component
{
	public var background:NDiImage;
	private var arrayAnswersButtons:Array<NDiAnswerButton>;
	private var answerTexture:Texture;	
	private var totalAnswers:Int;
	private var correctAnswer:Int;
	private var isSelecting:Bool;
	
	
	public var isConfigured:Bool;
	public var transform:Sprite;

	public function new() 
	{
		this.loadInit();		
	}
	
	
	private function loadInit():Void
	{
		this.transform = new Sprite();
		this.isSelecting = false;
		this.isConfigured = false;
		this.totalAnswers = 5;
		this.arrayAnswersButtons = new Array<NDiAnswerButton>();
		
		//this.background = new NDiImage(NDiResourcesManager.loadImage(NDiGameConstants.ASSET_PACKAGE_GENERAL, "images/mig8/rail_selector_panel"));
		//this.background.image.disablePointer();	
		
		var tmpButton:NDiAnswerButton = new NDiAnswerButton(0);
		this.transform.y._ = (NDiGameConstants.GAME_HEIGHT * 0.5) - (tmpButton.getNaturalHeight() * 0.5);
		this.transform.y._ -= 40;
		
		//this.transform.x._ -= this.selectorPanel.background.image.getNaturalWidth() * 0.5;		
		//this.transform.x._ += NDiGameConstants.GAME_WIDTH * 0.5;
	}
	
	public function cleanAnswers()
	{
		for (index in 0...this.arrayAnswersButtons.length)
		{
			if (this.arrayAnswersButtons[index] != null)
			{
				this.arrayAnswersButtons[index].owner.dispose();
			}
		}		
		this.arrayAnswersButtons.splice(0, this.arrayAnswersButtons.length);		
		this.isConfigured = false;
	}
	
	private function createAnswers(totalBridges:Int)
	{
		var arrayAnswers:Array<Int> = new Array<Int>();
		this.correctAnswer = totalBridges;
		arrayAnswers.push(totalBridges);
		for (index in 0...totalAnswers-1)
		{
			var parent:NDiPanelControllerMig8 = this.getParent();
			var answerPredefined:Int = NDiGameConstants.ARRAY_ANSWERS[parent.getCurrentGap()][index];
			arrayAnswers.push(answerPredefined);
		}
		arrayAnswers = NDiRandomUtils.shuffle(arrayAnswers);
		
		for (index in 0...arrayAnswers.length)
		{
			var tmpButton:NDiAnswerButton = new NDiAnswerButton(arrayAnswers[index]);
			//tmpButton.x._ = (tmpButton.getNaturalWidth() * (index * 1.9)) + 75;
			var widthButton:Float = (tmpButton.getNaturalWidth() + 40);
			tmpButton.x._ = widthButton * index;
			tmpButton.x._ -= widthButton * ((arrayAnswers.length - 1)*0.5);
			
			tmpButton.y._ = 10;
			//tmpButton.y._ = 57;
			tmpButton.pointerUp.connect(this.handlerPointerUp);
			tmpButton.nameButton = "ANSWER_" + index;
			
			this.arrayAnswersButtons.push(tmpButton);
			this.owner.addChild(new Entity().add(tmpButton));
		}
	}
	
	public function getParent():NDiPanelControllerMig8
	{
		return this.owner.parent.get(NDiPanelControllerMig8);
	}
	
	private function showWrongPieces()
	{
		
	}
	
	private function validateAnswerButton(tmpButton:NDiAnswerButton):Void
	{
		if (this.isSelecting)
		{
			return;
		}		
		var parent:NDiPanelControllerMig8 = this.getParent();
		if (parent.getZoomPanel().checkAnswer(tmpButton.answer))
		{
			this.umiJump(tmpButton);
		}else {
			//trace("BAD - NO MATCH");
			this.umiJump(tmpButton, true);
			tmpButton.scaleX.animate(1.5, 1, 0.8, Ease.bounceOut);
			tmpButton.scaleY.animate(1.5, 1, 0.8, Ease.bounceOut);
			//parent.getZoomPanel().showSignalError();
		}		
	}
	
	private function umiJump(tmpButton:NDiAnswerButton, isWrong:Bool = false)
	{
		this.isSelecting = true;
		
		var umi:NDiUmi = this.getParent().getUmiCharacter();
		umi.transform.x._ = tmpButton.x._;
		umi.jump();
		var f1:CallFunction = new CallFunction(function() {
			umi.animationCreate("_handsUP");
			if (isWrong == true)
			{	
				this.getParent().getZoomPanel().createWrongSelectedPiece(tmpButton.answer);
				var f2:CallFunction = new CallFunction(function() { 
					this.getParent().getZoomPanel().cleanWrongPieces();
				} );
				var seq2:Sequence = new Sequence([new Delay(0.9), f2]);
				this.owner.get(Script).run(seq2);
				
			}else {
				this.getParent().getZoomPanel().createSelectedPiece(tmpButton.answer);
			}
			this.checkIsRepaired();
		});
		var seq1:Sequence = new Sequence([new Delay(0.6), f1]);
		this.owner.get(Script).run(seq1);
	}
	
	private function checkIsRepaired()
	{
		var parent:NDiPanelControllerMig8 = this.getParent();
		if (parent.getZoomPanel().isRepaired())
		{
			//trace("GOOD - WINNER - GAME OVER 1");			
			var f1:CallFunction = new CallFunction(function() {
				parent.getUmiCharacter().animationCreate("_thumbsUP");
				NDiAudioManager.getInstance().stopSoundEffect();
				
				if (this.getParent().getParent().getGapsManager().isEndingGap())
				{
					NDiAudioManager.getInstance().playSoundEffect(NDiGameConstants.ARRAY_SOUNDS.get("ANY_MIG-GoodJob"));
				}else {
					NDiAudioManager.getInstance().playSoundEffect(NDiGameConstants.ARRAY_SOUNDS.get("MIG8-Finish-Gap"));
				}
				parent.getZoomPanel().cleanRulers();
			});
			
			var f2:CallFunction = new CallFunction(function() {
				this.isSelecting = false;
				parent.getParent().showMessagePopup("");
			});
			var seq1:Sequence = new Sequence([new Delay(1.1), f1, new Delay(1), f2]);
			this.owner.get(Script).run(seq1);
		}else {
			var f1:CallFunction = new CallFunction(function() {
				//this.getParent().getUmiCharacter().hide();
				this.getParent().getUmiCharacter().getOut();
				this.isSelecting = false;
			});
			var seq:Sequence = new Sequence([new Delay(1.1), f1]);
			this.owner.get(Script).run(seq);
		}
	}

	
	
	private function handlerPointerUp(e:PointerEvent):Void
	{
		var tmpButton:NDiAnswerButton = cast(e.hit, NDiAnswerButton);
		this.validateAnswerButton(tmpButton);
	}
	
	public function loadAnswers(totalBridges:Int)
	{
		if (this.isConfigured)
			return;
		
		if (this.getParent().getParent().getGapsManager().currentGap == 0)
		{
			NDiAudioManager.getInstance().stopSoundEffect();
			NDiAudioManager.getInstance().playSoundEffect(NDiGameConstants.ARRAY_SOUNDS.get("MIG8-Finish-Measure"));
		}
		
		this.cleanAnswers();
		
		this.createAnswers(totalBridges);
		
		this.transform.y.animate(this.transform.y._ + 200, this.transform.y._, 0.5, Ease.circOut);
		this.transform.visible = true;
		
		this.getParent().getUmiCharacter().toggleHideText(true);
		this.getParent().getUmiCharacter().getOut();
		
		this.isConfigured = true;
	}
	
	override public function onAdded():Void
    {
		super.onAdded();
		this.owner.add(this.transform);
		this.owner.add(new Script());
		//this.owner.addChild(new Entity().add(this.background));		
    }

	override public function onRemoved():Void
	{
	}

	override public function onUpdate(dt:Float):Void
	{		
	}
	
}