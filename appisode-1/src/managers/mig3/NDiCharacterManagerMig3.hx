package managers.mig3;

import flambe.Component;
import flambe.Entity;
import flambe.input.PointerEvent;
import flambe.script.Script;
import globals.NDiGameConstants;
import gui.components.NDiButtonFill;
import gui.components.NDiImage;
import gui.scenes.NDiMig3Scene;
import managers.NDiResourcesManager;

/**
 * ...
 * @author Edwin
 */
class NDiCharacterManagerMig3 extends Component
{
	private var bean:NDiImage;
	private var dizzy:NDiImage;
	private var lineHeightSignal:NDiImage;
	
	private var footBitArea:NDiButtonFill;
	
	public function new() 
	{
		this.bean = new NDiImage(NDiResourcesManager.loadImage(NDiGameConstants.ASSET_PACKAGE_GENERAL, "images/mig2/bean"));
		this.bean.transform.visible = false;
		this.bean.transform.x._ = 340.5;
		this.bean.transform.y._ = 256;
		
		this.dizzy = new NDiImage(NDiResourcesManager.loadImage(NDiGameConstants.ASSET_PACKAGE_GENERAL, "images/mig2/dizzy"));
		this.dizzy.transform.visible = false;
		this.dizzy.transform.x._ = 211.5;
		this.dizzy.transform.y._ = 313.5;
		
		
		this.lineHeightSignal = new NDiImage(NDiResourcesManager.loadImage(NDiGameConstants.ASSET_PACKAGE_GENERAL, "images/shared/line_large2"));
	}
	
	private function addHeightLineSignal()
	{
		this.lineHeightSignal.transform.x._ = this.bean.transform.x._ + 17;
		this.lineHeightSignal.transform.y._ = this.bean.transform.y._;
		this.lineHeightSignal.transform.y._ -= this.bean.image.getNaturalHeight() * 0.5;
		this.lineHeightSignal.transform.y._ -= 9;
		this.owner.addChild(new Entity().add(this.lineHeightSignal));
	}
	
	private function handlerPointerUp(e:PointerEvent):Void
	{
		//var tmpButton:NDiButtonFill = cast(e.hit, NDiButtonFill);
		//tmpButton.nameButton
		//this.owner.parent.parent.get(NDiMig3Scene).getFootsprintManager().addFootPrint();
	}
	
	override public function onAdded():Void
    {
		super.onAdded();
		this.owner.add(new Script());
		this.owner.addChild(new Entity().add(this.bean));
		this.owner.addChild(new Entity().add(this.dizzy));		
		this.addHeightLineSignal();
	}
}