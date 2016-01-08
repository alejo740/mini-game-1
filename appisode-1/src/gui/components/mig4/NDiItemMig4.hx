package gui.components.mig4;

import flambe.Component;
import flambe.display.Texture;
import flambe.display.Sprite;
import flambe.Entity;
import flambe.script.Script;
import gui.components.NDiButton;
import gui.components.NDiHighlightSignal;
import math.NDiVector2D;

/**
 * ...
 * @author Edwin
 */
class NDiItemMig4 extends Component
{
	public var isValid:Bool;

	public var object:NDiButton;
	public var highlight:NDiHighlightSignal;
	
	public var transform:Sprite;

	public function new(texture:Texture, highlightTexture:Texture)
	{
		this.isValid = false;

		this.transform = new Sprite();

		this.object = new NDiButton(texture);
		this.object.centerAnchor();		
		
		if(highlightTexture != null)
		{
			this.highlight = new NDiHighlightSignal(highlightTexture, null, null);
			this.highlight.image.centerAnchor();
			this.highlight.transform.disablePointer();
		}
	}

	override public function onAdded():Void
    {
		super.onAdded();

		this.owner.add(new Script());
		this.owner.add(this.transform);
		
		if(this.highlight != null)
		{
			this.owner.addChild(new Entity().add(this.highlight));
		}
		
		this.owner.addChild(new Entity().add(this.object));
	}

	public function resumeHighlight()
	{
		if(this.highlight != null)
		{
			this.highlight.transform.visible = true;
		}
	}

	public function stopHighlight()
	{
		if(this.highlight != null)
		{
			this.highlight.transform.visible = false;
		}
	}

	public function setOnTop()
	{
		var tmpEntity:Entity = this.owner.parent;
		tmpEntity.removeChild(this.owner);
		tmpEntity.addChild(this.owner);
	}
}