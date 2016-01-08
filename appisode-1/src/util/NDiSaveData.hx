package util;

import flambe.subsystem.StorageSystem;
import flambe.System;
import globals.NDiGameConstants;

/**
 * NDiTeravision
 * @author Edwin Cobos
 */
class NDiSaveData
{
	private var data:StorageSystem;
	private static var instance:NDiSaveData;
	
	private function new() 
	{
		this.data = System.storage;		
		
		this.initData();
	}
	
	private function initData()
	{
		for (index in 0...NDiGameConstants.ARRAY_VARS_TO_SAVE.length)
		{
			if (this.getData(NDiGameConstants.ARRAY_VARS_TO_SAVE[index].getName()) == null)
			{
				this.setData(NDiGameConstants.ARRAY_VARS_TO_SAVE[index].getName(), NDiGameConstants.ARRAY_VARS_INIT_VALUES[index]);
			}
			//trace("MEMORYYY: "+NDiGameConstants.ARRAY_VARS_TO_SAVE[index].getName()+": -> "+this.getData(NDiGameConstants.ARRAY_VARS_TO_SAVE[index].getName()) );
		}
		//trace("MEMORYYYY: "+this.data);
	}
	
	public function resetData()
	{
		trace("RESET DATA");
		this.data.clear();
		for (index in 0...NDiGameConstants.ARRAY_VARS_TO_SAVE.length)
		{
			//this.setData(key.getName(), 0);
			this.setData(NDiGameConstants.ARRAY_VARS_TO_SAVE[index].getName(), NDiGameConstants.ARRAY_VARS_INIT_VALUES[index]);
		}
	}
	
	public function clearData()
	{
		this.data.clear();
	}
	
	public function setData(key:String, value:Dynamic)
	{
		this.data.set(key, value);
	}
	
	public function getData(key:String):Dynamic
	{
		return this.data.get(key);
	}
	
	
	public static function initInstance():Void
    {
    	if(NDiSaveData.instance == null)
    	{
    		NDiSaveData.instance = new NDiSaveData();
    	}
    }
    
    public static function getInstance():NDiSaveData
    {
    	return NDiSaveData.instance;
    }
}