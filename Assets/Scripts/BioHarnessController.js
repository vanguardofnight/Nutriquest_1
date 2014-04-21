// Flag for preventing making duplicate gameobject
private static var created : boolean = false;

// This is the Unity-Android interface
private var curActivity : AndroidJavaObject;

private static var strLog : String;
private static var heartRate : String;
private static var respirationRate : String;
private static var skinTemperature : String;
private static var posture : String;
private static var peakAcceleration : String;

private static var normalRate : float = 16.0;
private static var rates = new Array();
private static var std: float;
private static var avg: float;

function Start(){
	/* Uncomment this before extracting Unity Android Project 
	var jc : AndroidJavaClass = new AndroidJavaClass("com.unity3d.player.UnityPlayer");
	
	// What's differnent from C#: add '.' between GetStatic and <>.
	curActivity = jc.GetStatic.<AndroidJavaObject>("currentActivity");		
	*/
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

function InitRecord() {
	rates.clear();
}

function Record(str : String){
	rates.Push(parseFloat(str));
}

function calcAvg(){
	var sum : float = 0;
	for (var v : float in rates){
		sum += parseFloat(v);
	}
	
	avg = sum / rates.length;
} 

function calcStd() {
	var variance : float = 0;
	
	for (var v: float in rates) {
		variance += Mathf.Pow( (v-avg), 2.0);
	}
	
	std = Mathf.Pow((variance/rates.length),0.5);
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

function GetAvg() : float {
	return avg;
}

function GetStd() : float {
	return std;
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
