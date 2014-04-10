// Flag for preventing making duplicate gameobject
private static var created : boolean = false;

// This is the Unity-Android interface
private var curActivity : AndroidJavaObject;

private static var strLog : String;
private static var heartRate : String;
private static var respirationRate : String = "20";
private static var skinTemperature : String;
private static var posture : String;
private static var peakAcceleration : String;

function Start(){
	var jc : AndroidJavaClass = new AndroidJavaClass("com.unity3d.player.UnityPlayer");
	
	// What's differnent from C#: add '.' between GetStatic and <>.
	curActivity = jc.GetStatic.<AndroidJavaObject>("currentActivity");		
	strLog = "Initialized";
}

function Awake(){
	if(!created) {
	 	DontDestroyOnLoad (this);
	 	created = true;
 	} else {
 		Destroy(this.gameObject);
 	}
}

function SetLog(str : String) {
	this.strLog = str;
}

function SetHeartRate(str : String) {
	this.heartRate = str;
}

function SetRespirationRate(str : String) {
	this.respirationRate = str;
}

function SetSkinTemperature(str : String) {
	this.skinTemperature = str;
}

function SetPosture(str : String) {
	this.posture = str;
}

function SetPeakAcceleration(str : String) {
	this.peakAcceleration = str;
}

function GetLog() : String {
	return strLog;
}

function GetHeartRate() : String {
	return heartRate;
}

function GetRespirationRate() : String {
	return respirationRate;
}

function GetSkinTemperature() : String {
	return skinTemperature;
}

function GetPosture() : String {
	return posture;
}

function GetPeakAcceleration() : String {
	return peakAcceleration;
}

function connect(){
		curActivity.Call("connect");
}

function disconnect(){
		curActivity.Call("disconnect");
}

/*
// Note that we need to explicitly extends MonoBehavior. It's not default anymore.
class BioHarnessController extends MonoBehaviour {
    // This is the singleton instance that is shared with everyone.
    private static var Instance : BioHarnessController;
 
 	// This is the Unity-Android interface
// 	private var curActivity : AndroidJavaObject;

	// These are the variables for storing data from BioHarness
	private static var strLog : String;
	private static var heartRate : String;
	private static var respirationRate : String = "20";
	private static var skinTemperature : String;
	private static var posture : String;
	private static var peakAcceleration : String;

	// For testing
    var state : boolean ;
 
    // Everything that needs to get the singleton
    // instance, calls this function to get it.
    public static function GetInstance() : BioHarnessController {
        if (Instance == null)
        	Debug.Log("create instance");
            // This is the first time the function was called.  Need to
            // construct the shared instance.
            Instance = new BioHarnessController();
        return Instance;
    }
 
     // Private constructor.  This is what forces the class
     // to be a singleton since the only way to construct it
     // is via GetInstance().
     // NOTE:  Private constructors are not normally allowed
     // in JavaScript.  But it is OK in Unity.
     private function BioHarnessController() {
     	var jc : AndroidJavaClass = new AndroidJavaClass("com.unity3d.player.UnityPlayer");
		// What's differnent from C#: add '.' between GetStatic and <>.
		curActivity = jc.GetStatic.<AndroidJavaObject>("currentActivity");
		
		strLog = "Initialized";
     }
 
	function GetState() : boolean {
		return state;
	}

	function SetLog(str : String) {
		this.strLog = str;
 	}

	function SetHeartRate(str : String) {
		this.heartRate = str;
 	}

	function SetRespirationRate(str : String) {
		this.respirationRate = str;
	}

	function SetSkinTemperature(str : String) {
		this.skinTemperature = str;
	}

	function SetPosture(str : String) {
		this.posture = str;
	}

	function SetPeakAcceleration(str : String) {
		this.peakAcceleration = str;
	}
	
	function GetLog() : String {
		return strLog;
 	}

	function GetHeartRate() : String {
		return heartRate;
 	}

	function GetRespirationRate() : String {
		return respirationRate;
	}

	function GetSkinTemperature() : String {
		return skinTemperature;
	}

	function GetPosture() : String {
		return posture;
	}

	function GetPeakAcceleration() : String {
		return peakAcceleration;
	}
	
	function connect(){
//		curActivity.Call("connect");
	}
	
	function disconnect(){
//		curActivity.Call("disconnect");
	}
}
*/