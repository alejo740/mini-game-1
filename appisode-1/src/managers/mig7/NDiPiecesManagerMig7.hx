package managers.mig7;

import flambe.animation.Ease;
import flambe.Component;
import flambe.display.Sprite;
import flambe.Entity;
import flambe.input.PointerEvent;
import flambe.script.Script;
import globals.NDiGameConstants;
import gui.components.mig7.NDiPieceRobot;
import gui.components.NDiButton;
import gui.components.NDiButtonFill;
import gui.components.NDiImage;
import gui.scenes.NDiMig7Scene;
import managers.NDiResourcesManager;
import gui.components.NDiHighlightSignal;
import util.NDiRandomUtils;

/**
 * ...
 * @author Edwin
 */
class NDiPiecesManagerMig7 extends Component
{
	private var arrayPieces:Array <NDiPieceRobot>;
	private var arrayRobot:Array <NDiPieceRobot>;
	private var totalFootprints:Int;
	private var lineHeightSignal:NDiImage;
	private var linePieceSignal:NDiImage;
	private var lineHeightHighlight:NDiHighlightSignal;

	private var background:NDiButtonFill;
	private var totalSizeMeasure:Int;
	private var thereBad:Bool;	
	
	public var transform:Sprite;
	public var currentFootprint:Int;
	
	public function new() 
	{		
		this.transform = new Sprite();		
		this.arrayPieces = new Array <NDiPieceRobot>();
		this.arrayRobot = new Array <NDiPieceRobot>();
		this.initArrayPieces();				
		this.lineHeightSignal = new NDiImage(NDiResourcesManager.loadImage(NDiGameConstants.ASSET_PACKAGE_GENERAL, "images/shared/line_large2"));
		this.lineHeightSignal.transform.disablePointer();
		this.linePieceSignal = new NDiImage(NDiResourcesManager.loadImage(NDiGameConstants.ASSET_PACKAGE_GENERAL, "images/shared/line_short"));
		this.linePieceSignal.transform.disablePointer();
		this.lineHeightHighlight = new NDiHighlightSignal(NDiResourcesManager.loadImage(NDiGameConstants.ASSET_PACKAGE_GENERAL, "images/shared/line_largeHighlightWrong"), null, null);
		this.lineHeightHighlight.transform.visible = false;
		this.background = new NDiButtonFill(0xaeaeae, 340, 523);
		this.background.resetAnchor();
		this.background.x._ = 10;
		this.background.y._ = 10;
		this.background.alpha._ = 0.7;
		this.totalSizeMeasure = 4;
		this.thereBad = false;		
	}
	
	
	
	private function initArrayPieces()
	{
		var arrayFixed:Array<String> = new Array<String>();
		var copyArray1p:Array<String> = new Array<String>();
		for (index in 0...10)
		{
			copyArray1p.push(NDiGameConstants.ARRAY_ASSETS_ROBOT[index]);
		}
		copyArray1p = NDiRandomUtils.shuffle(copyArray1p);
		
		var copyArray2p:Array<String> = new Array<String>();
		for (index in 10...NDiGameConstants.ARRAY_ASSETS_ROBOT.length)
		{
			copyArray2p.push(NDiGameConstants.ARRAY_ASSETS_ROBOT[index]);
		}
		copyArray2p = NDiRandomUtils.shuffle(copyArray2p);
		
		for (indexIt in 0...6)
		{
			var index:Int = arrayFixed.length;
			arrayFixed[index] = copyArray1p[indexIt];
		}
		for (indexIt in 0...3)
		{
			var index:Int = arrayFixed.length;
			arrayFixed[index] = copyArray2p[indexIt];
		}		
		
		var gridWidth:Int = 3;
		var rndHighlight:Int = NDiRandomUtils.getRandomInt(0, (gridWidth * 3));
		
		for (j in 0...gridWidth)
		{
			for (i in 0...gridWidth)
			{
				var index:Int = (j * gridWidth) + i;
				trace(index );
				this.arrayRobot[index] = null;			
				this.arrayPieces[index] = this.createFootPrint(arrayFixed[index]);			
				
				var incX:Float = 110 * i;
				incX += 60;
				
				var incY:Float = 185 * j;
				incY += 100;
				
				if (index == rndHighlight)
				{
					this.arrayPieces[index].highlight.transform.visible = true;
				}
				this.arrayPieces[index].transform.y._ = incY;
				this.arrayPieces[index].transform.x._ = incX;
				this.arrayPieces[index].piece.setOriginalPosition(this.arrayPieces[index].transform.x._,this.arrayPieces[index].transform.y._);
				this.arrayPieces[index].piece.pointerUp.connect(this.handlerPointerUp);
			}
		}
		/*
		for (indexIt in 0...6)
		{
			var index:Int = this.arrayPieces.length;
			this.arrayRobot[index] = null;			
			this.arrayPieces[index] = this.createFootPrint(copyArray1p[indexIt]);			
			var incY:Float = 0;
			if (index > 0)
			{
				incY = this.arrayPieces[index - 1].y._;
				incY -= (80 * 0.5);				
			}
			this.arrayPieces[index].y._ = incY;
			
			this.arrayPieces[index].x._ = NDiRandomUtils.float( -50, 115);
			this.arrayPieces[index].setOriginalPosition(this.arrayPieces[index].x._,this.arrayPieces[index].y._);
			this.arrayPieces[index].pointerUp.connect(this.handlerPointerUp);
		}
		
		for (indexIt in 0...3)
		{
			var index:Int = this.arrayPieces.length;
			this.arrayRobot[index] = null;			
			this.arrayPieces[index] = this.createFootPrint(copyArray2p[indexIt]);			
			var incY:Float = 0;
			if (index > 0)
			{
				incY = this.arrayPieces[index - 1].y._;
				incY -= (80 * 0.5);				
			}
			this.arrayPieces[index].y._ = incY;
			
			this.arrayPieces[index].x._ = NDiRandomUtils.float( -50, 115);
			this.arrayPieces[index].setOriginalPosition(this.arrayPieces[index].x._,this.arrayPieces[index].y._);
			this.arrayPieces[index].pointerUp.connect(this.handlerPointerUp);
		}
		*/
		
		/*
		for (index in 0...9)
		{
			this.arrayRobot[index] = null;			
			this.arrayPieces[index] = this.createFootPrint(copyArray[index]);			
			var incY:Float = 0;
			if (index > 0)
			{
				incY = this.arrayPieces[index - 1].y._;
				incY -= (80 * 0.5);				
			}
			this.arrayPieces[index].y._ = incY;
			
			this.arrayPieces[index].x._ = NDiRandomUtils.float( -50, 115);
			this.arrayPieces[index].setOriginalPosition(this.arrayPieces[index].x._,this.arrayPieces[index].y._);
			this.arrayPieces[index].pointerUp.connect(this.handlerPointerUp);
		}
		*/
	}
	
	private function createFootPrint(imgName:String):NDiPieceRobot
	{
		var imgPath:String = "images/mig7/pieces/" + imgName;
		var idPiece:Int = cast imgName.split("r")[1];
		var tmp:NDiPieceRobot = null;
		if (idPiece > 10)
		{
			//tmp.size = 2;
			tmp = new NDiPieceRobot(NDiResourcesManager.loadImage(NDiGameConstants.ASSET_PACKAGE_GENERAL, imgPath), 2);
		}else {
			tmp = new NDiPieceRobot(NDiResourcesManager.loadImage(NDiGameConstants.ASSET_PACKAGE_GENERAL, imgPath), 1);
		}
		tmp.piece.nameButton = imgName;
		tmp.piece.bottomCenterAnchor();
		
		return tmp;
	}
	
	private function addPieceArrayRobot(piece:NDiPieceRobot):Int
	{
		//this.arrayRobot.push(tmpButton);
		for (index in 0...this.arrayRobot.length)
		{
			if (this.arrayRobot[index] == null)
			{
				this.arrayRobot[index] = piece;
				return index;
			}
		}
		return 0;
	}
	
	private function removePieceArrayRobot(piece:NDiPieceRobot):Int
	{
		//this.arrayRobot.push(tmpButton);
		for (index in 0...this.arrayRobot.length)
		{
			if (this.arrayRobot[index] == piece)
			{
				this.arrayRobot[index] = null;
				return index;
			}
		}
		return 0;
	}
	
	private function isEmptyPieceArrayRobot():Bool
	{
		//this.arrayRobot.push(tmpButton);
		for (index in 0...this.arrayRobot.length)
		{
			if (this.arrayRobot[index] != null)
			{
				//this.arrayRobot[index] = null;
				return false;
			}
		}
		return true;
	}
	
	private function getFirstNullPieceArrayRobot():Int
	{
		//trace(this.arrayRobot);
		var index:Int = 0;
		while (index < this.arrayRobot.length)		
		{
			if (this.arrayRobot[index] == null)
			{				
				return index;				
			}
			index++;
		}
		return -1;
	}
	/*
	private function validateRobot()
	{
		var latestIndex:Int = this.getFirstNullPieceArrayRobot();
		if (latestIndex == -1)
		{
			var isValid:Bool = true;
			for (index in 0...this.arrayRobot.length)
			{
				//var nameStr:String = 
				if (this.arrayRobot[index].nameButton != NDiGameConstants.ARRAY_CORRECT_ORDER_ROBOT[index])
				{
					isValid = false;
					break;
				}
			}
			
			if (isValid)
			{
				this.owner.parent.parent.get(NDiMig7Scene).gameOver();
			}
			
		}
	}*/
	
	private function getCurrentSizePieces():Int
	{
		var sum:Int = 0;
		for (index in 0...this.arrayRobot.length)
		{
			if (this.arrayRobot[index] != null)
			{
				sum += this.arrayRobot[index].size;
			}
		}
		return sum;
	}
	
	
	
	private function validateOverloadPieces(tmpButton:NDiPieceRobot):Bool
	{
		var currentSize:Int = this.getCurrentSizePieces();
		currentSize += tmpButton.size;
		
		if (currentSize > this.totalSizeMeasure)
		{
			return true;
		}
		return false;
	}
	
	private function isLatestObject(tmpButton:NDiPieceRobot):Bool
	{
		if (this.arrayRobot.length > 0)
		{
			if (tmpButton == this.arrayRobot[this.getFirstNullPieceArrayRobot() - 1])
			{
				return true;
			}
		}
		return false;
	}
	
	private function isFinished(tmpButton:NDiPieceRobot)
	{
		var currentSize:Int = this.getCurrentSizePieces();
		if (currentSize == this.totalSizeMeasure)
		{			
			this.owner.parent.parent.get(NDiMig7Scene).gameOver();
		}
		
		if ( currentSize <= this.totalSizeMeasure)
		{
			NDiAudioManager.getInstance().playSoundEffect(NDiGameConstants.ARRAY_SOUNDS.get("ANY_MIG-PositiveReaction"));
			tmpButton.showCorrectHighlight();
		}else {
			NDiAudioManager.getInstance().playSoundEffect(NDiGameConstants.ARRAY_SOUNDS.get("ANY_MIG-NegativeReaction"));
			tmpButton.showIncorrectHighlight();
		}
		
	}
	
	private function showError()
	{
		var tmp:NDiPieceRobot = this.arrayRobot[this.getFirstNullPieceArrayRobot() - 1];
		tmp.transform.x.animate(tmp.transform.x._ +10, tmp.transform.x._, 0.3, Ease.bounceOut);
		tmp.transform.y.animate(tmp.transform.y._ -10, tmp.transform.y._, 0.3, Ease.bounceOut);
	}
	
	public function movePieceRobot(tmpButton:NDiPieceRobot)
	{
		if (!tmpButton.isPlaced)
		{	
			if (this.validateOverloadPieces(tmpButton))
			{
				if (!this.thereBad)
				{
					this.thereBad = true;
				}else {
					this.showError();
					return;
				}
			}
			
			tmpButton.hideHiglight();
			
			var latestIndex:Int = this.getFirstNullPieceArrayRobot();
			latestIndex -= 1;
			var incX:Float = 550;
			var incY:Float = NDiGameConstants.GAME_HEIGHT - 150;
			if (!this.isEmptyPieceArrayRobot() && latestIndex >= 0)
			{
				incY = this.arrayRobot[latestIndex].transform.y._;
				incY -= (this.arrayRobot[latestIndex].piece.getNaturalHeight());
			}
			tmpButton.transform.y.animateTo(incY, 0.2, Ease.sineOut);
			tmpButton.transform.x.animateTo(incX, 0.2, Ease.sineOut);
			this.arrayPieces.remove(tmpButton);
			this.addPieceArrayRobot(tmpButton);
			tmpButton.isPlaced = true;
			this.isFinished(tmpButton);
		}else {
			if (!this.isLatestObject(tmpButton))
			{
				this.showError();
				return;
			}
				
			if (this.thereBad)
				this.thereBad = false;
				
			tmpButton.transform.x.animateTo(tmpButton.piece.getOriginalPosition().x, 0.2, Ease.sineOut);
			tmpButton.transform.y.animateTo(tmpButton.piece.getOriginalPosition().y, 0.2, Ease.sineOut);			
			this.removePieceArrayRobot(tmpButton);
			this.arrayPieces.push(tmpButton);
			tmpButton.isPlaced = false;
		}

		// Play right or wrong audio and effects.
		if(this.getCurrentSizePieces() <= this.totalSizeMeasure)
		{
			this.lineHeightHighlight.transform.visible = false;
		}
		else
		{
			this.lineHeightHighlight.transform.visible = true;
		}

		// Config piece line.
		if (this.getCurrentSizePieces() == this.totalSizeMeasure)
		{
			this.linePieceSignal.transform.visible = false;
		}
		else
		{
			var pieceLineY:Float = NDiGameConstants.GAME_HEIGHT - 150;

			for (index in 0...this.arrayRobot.length)
			{
				if (this.arrayRobot[index] != null)
				{
					pieceLineY -= this.arrayRobot[index].piece.getNaturalHeight();
				}
				else
				{
					break;
				}
			}

			this.linePieceSignal.transform.y._ = pieceLineY;
		}
	}
	/*
	public function addFootPrint_(tmpButton:NDiPieceRobot = null)
	{
		if (this.arrayPieces.length >= this.totalFootprints)
			return;
		
		if (tmpButton == null)
		{
			tmpButton = this.createFootPrint();
		}
		//var tmpButton:NDiButton = this.createFootPrint();
		//trace(tmpButton.getNaturalHeight() );
		//tmpButton.y._ = -(tmpButton.getNaturalHeight() * this.arrayPieces.length) + (tmpButton.getNaturalHeight() * 0.5);		
		
		tmpButton.alpha.animate(0, 1, 0.5, Ease.linear);
		tmpButton.x.animate(-10, 0, 
		0.2, Ease.sineOut);
		
		var inc:Float = 0;
		if (this.arrayPieces.length > 0)
		{
			inc = this.arrayPieces[this.arrayPieces.length - 1].y._;
			inc -= this.arrayPieces[this.arrayPieces.length - 1].getNaturalHeight();
		}
		tmpButton.y._ = inc;
		
		
		this.owner.addChild(new Entity().add(tmpButton));
		this.arrayPieces.push(tmpButton);
		
		
		if (this.arrayPieces.length == 1)
		{
			this.addHeightLineSignal();
		}else {
			this.lineHeightSignal.transform.y._ -= this.arrayPieces[this.arrayPieces.length - 1].getNaturalHeight();		
			if (this.arrayPieces.length == this.totalFootprints)
			{
				//this.lineHeightSignal.transform.visible = false;
				//this.owner.parent.parent.get(NDiMig7Scene).gameOver();
			}
		}
	}*/
	
	private function addHeightLineSignal2()
	{
		this.lineHeightSignal.transform.x._ = this.arrayPieces[this.arrayPieces.length - 1].transform.x._ + 70;		
		this.lineHeightSignal.transform.y._ = this.arrayPieces[this.arrayPieces.length - 1].transform.y._;
		this.lineHeightSignal.transform.y._ -= this.arrayPieces[this.arrayPieces.length - 1].piece.getNaturalHeight();
		this.owner.addChild(new Entity().add(this.lineHeightSignal));
	}
	
	private function addHeightLineSignal()
	{
		this.lineHeightSignal.transform.x._ = 670;// NDiGameConstants.GAME_WIDTH * 0.5;
		this.lineHeightSignal.transform.y._ = 205;// NDiGameConstants.GAME_HEIGHT * 0.5;
		this.owner.addChild(new Entity().add(this.lineHeightSignal));

		this.lineHeightHighlight.transform.x._ = 670;// NDiGameConstants.GAME_WIDTH * 0.5;
		this.lineHeightHighlight.transform.y._ = 205;// NDiGameConstants.GAME_HEIGHT * 0.5;
		this.owner.addChild(new Entity().add(this.lineHeightHighlight));		
	}

	private function addPieceLineSignal()
	{
		this.linePieceSignal.transform.x._ = 575;
		this.linePieceSignal.transform.y._ = (NDiGameConstants.GAME_HEIGHT - 150);
		this.owner.addChild(new Entity().add(this.linePieceSignal));
	}
	
	private function addArrayPieces()
	{
		for (index in 0...this.arrayPieces.length)
		{
			this.owner.addChild(new Entity().add(this.arrayPieces[index]));
		}		
	}
	
	private function handlerPointerUp(e:PointerEvent):Void
	{
		var tmpButton:NDiButton = cast(e.hit, NDiButton);
		this.movePieceRobot(tmpButton.owner.parent.get(NDiPieceRobot));
		//tmpButton.nameButton
		//this.owner.parent.parent.get(NDiMig7Scene).getFootprintManager().addFootPrint();
	}
	
	override public function onAdded():Void
    {
    	super.onAdded();		
		this.owner.add(new Script());
		this.owner.add(this.transform);
		this.owner.addChild(new Entity().add(this.background));
		this.addArrayPieces();
		this.addHeightLineSignal();
		this.addPieceLineSignal();
		//this.addHeightLineSignal();
	}
}