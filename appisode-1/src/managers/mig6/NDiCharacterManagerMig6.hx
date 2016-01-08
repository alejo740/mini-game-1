package managers.mig6;

import flambe.Component;
import flambe.Entity;
import flambe.input.PointerEvent;
import flambe.script.Script;
import globals.NDiGameConstants;
import gui.components.NDiButtonFill;
import gui.components.NDiButtonFillText;
import gui.components.NDiImage;
import gui.scenes.NDiMig6Scene;
import managers.NDiResourcesManager;

/**
 * ...
 * @author Edwin
 */
class NDiCharacterManagerMig6 extends Component
{
	private var bean:NDiImage;
	private var dizzy:NDiImage;
	private var bit:NDiImage;
	private var lineHeightSignal:NDiImage;
	
	private var footBitArea:NDiButtonFillText;
	
	public function new() 
	{
		/*
		this.bean = new NDiImage(NDiResourcesManager.loadImage(NDiGameConstants.ASSET_PACKAGE_GENERAL, "images/mig2/bean"));
		this.bean.transform.visible = false;
		this.bean.transform.x._ = 900;
		this.bean.transform.y._ = 400;
		
		this.dizzy = new NDiImage(NDiResourcesManager.loadImage(NDiGameConstants.ASSET_PACKAGE_GENERAL, "images/mig2/dizzy"));
		this.dizzy.transform.visible = false;
		this.dizzy.transform.x._ = 60;
		this.dizzy.transform.y._ = 400;
		*/
		
		this.bit = new NDiImage(NDiResourcesManager.loadImage(NDiGameConstants.ASSET_PACKAGE_GENERAL, "images/mig6/bit"));		
		this.bit.transform.x._ = (NDiGameConstants.GAME_WIDTH * 0.5) - 90;
		this.bit.transform.y._ = (NDiGameConstants.GAME_HEIGHT * 0.5) + 29;
		this.bit.transform.disablePointer();
		/*
		this.footBitArea = new NDiButtonFillText(0x000000, 100, 145);
		this.footBitArea.text.text = "Click here";
		this.footBitArea.x._ = 480 - 185;
		this.footBitArea.y._ = 280 - 65;
		this.footBitArea.alpha._ = 0.15;
		this.footBitArea.pointerUp.connect(this.handlerPointerUp);
		*/
		
		this.lineHeightSignal = new NDiImage(NDiResourcesManager.loadImage(NDiGameConstants.ASSET_PACKAGE_GENERAL, "images/shared/line_large3"));
		this.lineHeightSignal.transform.disablePointer();
		this.lineHeightSignal.image.disablePointer();
	}
	
	private function addHeightLineSignal()
	{
		this.lineHeightSignal.transform.x._ = this.bit.transform.x._ + 110;
		this.lineHeightSignal.transform.y._ = this.bit.transform.y._ + 5;
		this.lineHeightSignal.transform.y._ -= this.bit.image.getNaturalHeight() * 0.5;
		//this.lineHeightSignal.transform.y._ += 45;
		//this.lineHeightSignal.transform.y._ += 22;
		this.owner.addChild(new Entity().add(this.lineHeightSignal));
	}
	
	private function handlerPointerUp(e:PointerEvent):Void
	{
		//var tmpButton:NDiButtonFill = cast(e.hit, NDiButtonFill);
		//tmpButton.nameButton
		this.owner.parent.parent.get(NDiMig6Scene).getFootsprintManager().addFootPrint();
	}
	
	override public function onAdded():Void
    {
		super.onAdded();
		this.owner.add(new Script());
		
		this.addHeightLineSignal();
		this.owner.addChild(new Entity().add(this.bit));
		//this.owner.addChild(new Entity().add(this.footBitArea));
		//this.owner.addChild(new Entity().add(this.bean));
		//this.owner.addChild(new Entity().add(this.dizzy));		
	}
}