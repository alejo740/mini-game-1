package managers.mig4;

import flambe.Component;
import flambe.display.Sprite;
import flambe.display.Texture;
import flambe.Entity;
import flambe.input.PointerEvent;
import flambe.script.Script;
import flambe.System;
import globals.NDiGameConstants;
import globals.NDiGameGlobals;
import gui.components.mig4.NDiItemMig4;
import gui.components.mig4.NDiHandMig4;
import gui.components.NDiButtonFill;
import gui.components.NDiButton;
import gui.scenes.NDiMig4Scene;
import managers.NDiResourcesManager;
import math.NDiVector2D;
import util.NDiRandomUtils;
import managers.NDiAudioManager;

/**
 * ...
 * @author Edwin
 */
class NDiPiecesManagerMig4 extends Component
{
	public var isObjectSelectedFirtsTime:Bool;

	public var transform:Sprite;
	private var arrayItem:Array<NDiItemMig4>;
	private var handItem:NDiHandMig4;
	private var isClicking:Bool;
	private var currentItemSelected:NDiItemMig4;	
	
	public function new() 
	{
		this.isObjectSelectedFirtsTime = false;

		this.transform = new Sprite();
		//this.transform.x._ = NDiGameConstants.GAME_WIDTH * 0.5;
		//this.transform.y._ = NDiGameConstants.GAME_HEIGHT * 0.5;
		this.isClicking = false;
		this.currentItemSelected = null;
		
		this.arrayItem = new Array<NDiItemMig4>();
		this.initArrayItem();
		
		// Stop ruler glow.
		this.arrayItem[0].stopHighlight();

		this.handItem = new NDiHandMig4();
		this.handItem.normalState.nameButton = "HAND_ITEM";
		this.handItem.correctState.nameButton = "HAND_ITEM";
		this.handItem.transform.x._ = NDiGameConstants.GAME_WIDTH * 1;
		this.handItem.transform.y._ = 0;
		
		this.handItem.transform.x._ -= this.handItem.normalState.getNaturalWidth() * 0.5;
		this.handItem.transform.y._ += this.handItem.normalState.getNaturalHeight() * 0.5;
		// this.handItem.transform.rotation._ = 35;

		this.handItem.setInitialState();
	}
	
	private function initArrayItem()
	{
		for (index in 0...NDiGameConstants.ARRAY_PATH_TEXTURE_ITEMS.length)
		{
			var highlightTexture:Texture = null;

			if(index == 0)
			{
				highlightTexture = NDiResourcesManager.loadImage(NDiGameConstants.ASSET_PACKAGE_GENERAL, "images/mig4/objFinalHihglight");
			}
			else if(index == NDiGameConstants.ARRAY_PATH_TEXTURE_ITEMS.length - 1)
			{
				highlightTexture = NDiResourcesManager.loadImage(NDiGameConstants.ASSET_PACKAGE_GENERAL, "images/mig4/obj5_highlight");
			}

			this.arrayItem[index] = new NDiItemMig4(NDiResourcesManager.loadImage(NDiGameConstants.ASSET_PACKAGE_GENERAL, NDiGameConstants.ARRAY_PATH_TEXTURE_ITEMS[index]), highlightTexture);
			this.arrayItem[index].transform.rotation._ = NDiRandomUtils.getRandomFloat(-45, 45);
			this.arrayItem[index].object.nameButton = NDiGameConstants.ARRAY_PATH_TEXTURE_ITEMS[index];
			this.arrayItem[index].transform.x._ = NDiGameConstants.GAME_WIDTH * 0.5 + NDiRandomUtils.getRandomFloat(-50, 50);
			this.arrayItem[index].transform.y._ = NDiGameConstants.GAME_HEIGHT * 0.5 + NDiRandomUtils.getRandomFloat(-50, 50);
			//this.arrayItem[index].object.pointerUp.connect(this.handlerPointerUp);
			this.arrayItem[index].object.pointerDown.connect(this.handlerPointerDown);
			//this.arrayItem[index].object.pointerMove.connect(this.handlerPointerMove);
		}
		this.arrayItem[0].isValid = true;
		System.pointer.move.connect(this.handlerPointerMove);
		System.pointer.up.connect(this.handlerPointerUp);		
	}
	
	private function addItems()
	{
		for (index in 0...this.arrayItem.length)
		{
			//this.arrayItem[index] = new NDiItemMig4(NDiResourcesManager.loadImage(NDiGameConstants.ASSET_PACKAGE_GENERAL, NDiGameConstants.ARRAY_PATH_TEXTURE_ITEMS[index]));
			this.owner.addChild(new Entity().add(this.arrayItem[index]));
		}
	}
	
	private function validateItem()
	{
		//this.currentItemSelected
		var sp:Sprite = Sprite.hitTest(this.handItem.owner, this.currentItemSelected.transform.x._, this.currentItemSelected.transform.y._);
		if (sp != null)
		{			
			if (this.currentItemSelected.isValid)
			{
				trace("GameOver");
				this.owner.parent.parent.get(NDiMig4Scene).gameOver();

				this.handItem.setRightState();

				// Hide ruler.
				this.currentItemSelected.transform.visible = false;

				NDiAudioManager.getInstance().playSoundEffect(NDiGameConstants.ARRAY_SOUNDS.get("ANY_MIG-PositiveReaction"));
			}else {
				// Move to blank area if objest is not correct.
				this.currentItemSelected.transform.x._ = NDiGameConstants.GAME_WIDTH * 0.8  + NDiRandomUtils.getRandomFloat(-50, 50);
				this.currentItemSelected.transform.y._ = NDiGameConstants.GAME_HEIGHT * 0.8  + NDiRandomUtils.getRandomFloat(-50, 50);

				NDiAudioManager.getInstance().playSoundEffect(NDiGameConstants.ARRAY_SOUNDS.get("ANY_MIG-NegativeReaction"));
			}
		}
		else
		{
			// If ruler is dropped in wrong area.
			if (this.currentItemSelected.isValid)
			{
				this.arrayItem[0].resumeHighlight();
				this.handItem.setWrongState();
			}
		}
	}
	
	private function moveCurrentItem(newPosition:NDiVector2D)
	{
		if (this.currentItemSelected != null)
		{
			this.currentItemSelected.transform.x._ = newPosition.x * (1 / NDiGameGlobals.getInstance().currentScaleGame);
			this.currentItemSelected.transform.x._ += this.currentItemSelected.object.getOriginalDelta().x;
			
			this.currentItemSelected.transform.y._ = newPosition.y * (1 / NDiGameGlobals.getInstance().currentScaleGame);
			this.currentItemSelected.transform.y._ += this.currentItemSelected.object.getOriginalDelta().y;
			
			
			//this.currentItemSelected.transform.y._ = newPosition.y * (1 / NDiGameGlobals.getInstance().currentScaleGame);			
			//this.currentItemSelected.transform.y._ += this.currentItemSelected.object.getOriginalDelta().y;
		}
	}
	
	private function handlerPointerDown(e:PointerEvent):Void
	{
		if(!this.isObjectSelectedFirtsTime)
		{
			this.arrayItem[NDiGameConstants.ARRAY_PATH_TEXTURE_ITEMS.length - 1].stopHighlight();
		}

		this.isClicking = false;
		this.currentItemSelected = null;

		var tmpObject:NDiButton = cast(e.hit, NDiButton);
		var tmpButton:NDiItemMig4 = tmpObject.owner.parent.get(NDiItemMig4);

		tmpButton.setOnTop();
		
		//trace(tmpButton.nameButton + " - DOWN");
		var factor:Float = (1 / NDiGameGlobals.getInstance().currentScaleGame);
		var delta:NDiVector2D = NDiVector2D.getComponentDistance(new NDiVector2D(e.viewX * factor, e.viewY * factor), new NDiVector2D(tmpButton.transform.x._, tmpButton.transform.y._));
		tmpButton.object.setOriginalDelta(delta.x, delta.y);
		this.currentItemSelected = tmpButton;
		this.moveCurrentItem(new NDiVector2D(e.viewX, e.viewY));
		this.isClicking = true;		
	}
	
	private function handlerPointerUp(e:PointerEvent):Void
	{
		if (!this.isClicking)
			return;
		
		//var tmpButton:NDiItemMig4 = cast(e.hit, NDiItemMig4);		
		//trace(tmpButton.nameButton + " - UP");
		this.validateItem();
		this.currentItemSelected = null;
		this.isClicking = false;		
	}
	
	private function handlerPointerMove(e:PointerEvent):Void
	{
		if (!this.isClicking)
			return;
			
		//var tmpButton:NDiItemMig4 = cast(e.hit, NDiItemMig4);
		///trace(" - MOVE - "+this.isClicking);
		this.moveCurrentItem(new NDiVector2D(e.viewX, e.viewY));		
	}
	
	override public function onAdded():Void
    {
		this.owner.add(new Script());
		this.owner.add(this.transform);
		
		this.owner.addChild(new Entity().add(this.handItem));		
		this.addItems();
		
		super.onAdded();
	}
}