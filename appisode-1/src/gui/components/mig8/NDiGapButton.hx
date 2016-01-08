package gui.components.mig8;

import gui.components.NDiButtonFill;

/**
 * ...
 * @author Edwin
 */
class NDiGapButton extends NDiButtonFill
{
	public var totalBridges:Int;
	public var indexGap:Int;
	
	public function new(numBridges:Int)
	{
		super(0xffffff, 27, 4);
		this.totalBridges = numBridges;
	}
	
}