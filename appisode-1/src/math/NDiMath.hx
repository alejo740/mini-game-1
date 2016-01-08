package math;

/**
 * NDiTeravision
 * @author Edwin Cobos
 */
class NDiMath
{
	public static var TO_DEGREE:Float = 180 / Math.PI;
	
	public static function getPercent(value:Float, total:Float):Float
	{
		return ((value * 100) / total)/100;
	}
}