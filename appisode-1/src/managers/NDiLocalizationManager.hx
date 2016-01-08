package managers;

import haxe.xml.Fast;
import globals.NDiGameConstants;
import data.NDiLocalizationData;

class NDiLocalizationManager
{
    private var localizationData:Map<String, NDiLocalizationData>;

	private static var instance:NDiLocalizationManager;
	
	private function new()
    {
        this.localizationData = new Map<String, NDiLocalizationData>();
    }
    
    public function initLocalizationData():Void
    {
        var sXML:String = NDiResourcesManager.loadXML(NDiGameConstants.ASSET_PACKAGE_CONFIG, 
                                                                    NDiGameConstants.CONFIG_ASSET_LOCALIZATION_XML);

        var r1:EReg = ~/>\s+<!/g;
        var r2:EReg = ~/]>\s+</g;
        sXML = r1.replace(sXML, "><!");
        sXML = r2.replace(sXML, "]><");

        var oXML = new Fast(Xml.parse(sXML).firstElement());

        for(stringNode in oXML.nodes.string)
        {
            var id:String = stringNode.att.id;
            var fontScale:String = stringNode.att.fontScale;
            var offsetX:String = stringNode.att.offsetX;
            var offsetY:String = stringNode.att.offsetY;
            var fontName:String = stringNode.att.fontName;
			var content:String = stringNode.innerData;
			var description:String = stringNode.att.description;

            var data:NDiLocalizationData = new NDiLocalizationData();
            data.id = id;
            data.fontScale = Std.parseFloat(fontScale); // 1;
            data.offsetX = Std.parseFloat(offsetX);
            data.offsetY = Std.parseFloat(offsetY);
            data.fontName = fontName;//"fonts/Original/30px/TMNToriginalFont_30"; // "fonts/Arial/28/Arial_28";
			data.content = content;
			data.description = description;

            this.localizationData.set(id, data);
        }
    }

    public function getLocalizationData(id:String):NDiLocalizationData
    {
        return this.localizationData.get(id);
    }

    public static function initInstance():Void
    {
        if(NDiLocalizationManager.instance == null)
        {
            NDiLocalizationManager.instance = new NDiLocalizationManager();
        }
    }

    public static function getInstance():NDiLocalizationManager
    {
    	return NDiLocalizationManager.instance;
    }
}
