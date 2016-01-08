package globals;

import managers.NDiResourcesManager;
import globals.NDiGameConstants;
import haxe.xml.Fast;

class NDiGameGlobals
{
    // Debug variables.

    // Activators.

	public var currentScaleGame:Float;
	
	private static var instance:NDiGameGlobals;
	
    private function new()
    {
		this.currentScaleGame = 1;
    }
    
    public function initGlobalConfigData():Void
    {
        var sXML:String = NDiResourcesManager.loadXML(NDiGameConstants.ASSET_PACKAGE_CONFIG, 
                                                                    NDiGameConstants.CONFIG_ASSET_CONFIG_XML);
        
        var oXML = new Fast(Xml.parse(sXML).firstElement());

        // Fill debug variables.
        for(debugNode in oXML.nodes.debug)
        {
        }

        // Fill activators variables.
        for(debugNode in oXML.nodes.activators)
        {
        }
    }

    public static function initInstance():Void
    {
    	if(NDiGameGlobals.instance == null)
    	{
    		NDiGameGlobals.instance = new NDiGameGlobals();
    	}
    }
    
    public static function getInstance():NDiGameGlobals
    {
    	return NDiGameGlobals.instance;
    }
}
