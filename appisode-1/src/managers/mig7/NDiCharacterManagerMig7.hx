package managers.mig7;

import flambe.Component;
import flambe.Entity;
import flambe.input.PointerEvent;
import flambe.script.Script;
import globals.NDiGameConstants;
import gui.components.NDiButtonFill;
import gui.components.NDiImage;
import gui.scenes.NDiMig7Scene;
import managers.NDiResourcesManager;

/**
 * ...
 * @author Edwin
 */
class NDiCharacterManagerMig7 extends Component
{
	private var bit:NDiImage;
	
	private var footBitArea:NDiButtonFill;
	
	public function new() 
	{
		this.bit = new NDiImage(NDiResourcesManager.loadImage(NDiGameConstants.ASSET_PACKAGE_GENERAL, "images/mig2/bit"));
		this.bit.transform.visible = false;
		this.bit.transform.x._ = (NDiGameConstants.GAME_WIDTH * 0.5) + 290;
		this.bit.transform.y._ = (NDiGameConstants.GAME_HEIGHT * 0.5) ;
		
	}
	
	private function handlerPointerUp(e:PointerEvent):Void
	{
		//var tmpButton:NDiButtonFill = cast(e.hit, NDiButtonFill);
		//tmpButton.nameButton
		//this.owner.parent.parent.get(NDiMig7Scene).getFootprintManager().addFootPrint();
	}
	
	override public function onAdded():Void
    {
		super.onAdded();
		this.owner.add(new Script());
		this.owner.addChild(new Entity().add(this.bit));		
	}
}