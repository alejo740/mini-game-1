package gui.components;

import flambe.Component;
import flambe.display.ImageSprite;
import flambe.display.Sprite;
import flambe.display.Texture;
import flambe.Entity;

/**
 * ...
 * @author Edwin
 */
class NDiImage extends Component
{
	public var image:ImageSprite;
	public var transform:Sprite;
	public function new(texture:Texture) 
	{
		this.image = new ImageSprite(texture);
		this.image.centerAnchor();
		this.transform = new Sprite();
	}
	
	public function resetAnchor()
	{
		this.image.setAnchor(0, 0);
	}
	public function bottomCenterAnchor()
	{
		this.image.setAnchor(this.image.getNaturalWidth() * 0.5, this.image.getNaturalHeight());
		
	}
	
	override public function onAdded()
	{
		this.owner.add(this.transform);
		this.owner.addChild(new Entity().add(this.image));
	}
	
	public function setOnTop()
	{
		var tmpEntity:Entity = this.owner.parent;
		tmpEntity.removeChild(this.owner);
		tmpEntity.addChild(this.owner);
	}
}