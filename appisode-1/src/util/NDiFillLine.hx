package util;
import math.NDiVector2D;
import flambe.display.FillSprite;
import flambe.Entity;

/**
 * ...
 * @author ...
 */
class NDiFillLine extends NDiLine
{
	public function new(point0:NDiVector2D, point1:NDiVector2D, thickness:Float):Void
	{
		super(point0, point1);
		this.line = new FillSprite(0xFFFFFF, this.distance, thickness);
		this.line.setAnchor(0, this.getLine().height._ * 0.5);
	}
	
	override public function getLine():FillSprite
	{
		return cast this.line;
	}
	
	override private function updateLine()
	{
		super.updateLine();
		this.getLine().width._ = this.distance;
	}
	
	override public function onAdded():Void
    {
		this.entity.addChild(new Entity().add(this.line));
		this.entity.add(this.transform);
		this.updateLine();
	}
	
}