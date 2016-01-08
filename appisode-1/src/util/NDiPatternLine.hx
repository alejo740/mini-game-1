package util;
import math.NDiVector2D;
import flambe.display.PatternSprite;
import flambe.display.Texture;
import flambe.Entity;

/**
 * ...
 * @author ...
 */
class NDiPatternLine extends NDiLine
{
	//public var line:PatternSprite;

	public function new(point0:NDiVector2D, point1:NDiVector2D, thickness:Float, texture:Texture):Void
	{
		super(point0, point1);		
		this.line = new PatternSprite(texture, this.distance, thickness);
		this.line.setAnchor(0, this.getLine().height._ * 0.5);
		//this.line.centerAnchor
	}
	
	
	override public function getLine():PatternSprite
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