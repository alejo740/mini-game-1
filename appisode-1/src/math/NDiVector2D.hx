package math;
import globals.NDiGameConstants;

/**
 * ...
 * @author Edwin
 */
class NDiVector2D
{
	public var x:Float;
	public var y:Float;
	
	public function new( _x:Float, _y:Float):Void
	{
		x = _x;
		y = _y;
	}
	
	public static function getComponentDistance(startingPoint:NDiVector2D, endingPoint:NDiVector2D):NDiVector2D
	{
		return new NDiVector2D(endingPoint.x - startingPoint.x, endingPoint.y - startingPoint.y);
	}
	
	public static function getDistance(startingPoint:NDiVector2D, endingPoint:NDiVector2D):Float
	{
		var d:Float = Math.pow((endingPoint.x - startingPoint.x), 2) + Math.pow((endingPoint.y - startingPoint.y), 2);
		d = Math.pow(d, 0.5);
		return d;
	}
	
	public static function getAngle(startingPoint:NDiVector2D, endingPoint:NDiVector2D):Float
	{
		var x:Float = endingPoint.x - startingPoint.x;
		var y:Float = endingPoint.y - startingPoint.y;
		var angle:Float = Math.atan2(y, x);
		angle = angle*NDiMath.TO_DEGREE;
		return angle;
	}
	
}